"""SHOP 상품(포스터·원화)의 AR 파일을 자동으로 만든다 — 관리자 "발행"으로 data.json이 바뀌면 GitHub Actions가 실행.
- 포스터(edition): 기존 포스터와 같은 액자·매트, 액자 폭은 그대로 두고 크기만 맞춤
- 원화(original): 크기가 가장 비슷한 기존 원화의 캔버스(두께 포함)를 실제 크기로 맞춤
- 조각(sculpture)·도록은 건드리지 않음 (조각은 3D 모델을 따로 만듦)
- 표지 이미지나 크기(spec1)가 바뀌면 다시 만들고, 제목·공개 여부·주소는 매번 맞춤
"""
import json, os, re, struct, sys, io, shutil, tempfile, zipfile, hashlib
from PIL import Image
from pxr import Usd, Vt, Gf, Sdf

R = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else '.') + '/'
A = R + 'ar-q7w2/'
STATE = R + '.github/ar/state.json'
POSTER_TPL = 's-1792489302614-f6t8c'   # Danae Blue 포스터 (67 × 50 cm, 액자)
MAXPX = 3000

def num(s):
    m = re.findall(r'(\d+(?:\.\d+)?)', str(s or ''))
    return [float(x) for x in m[:2]] if len(m) >= 2 else None

def sig(it):
    return hashlib.sha1((str(it.get('cover')) + '|' + str(it.get('spec1'))).encode()).hexdigest()[:12]

def tex_bytes(path):
    im = Image.open(path)
    raw = open(path, 'rb').read()
    if max(im.size) <= MAXPX and im.format == 'JPEG' and im.mode == 'RGB':
        return raw, im.size
    im = im.convert('RGB'); im.thumbnail((MAXPX, MAXPX), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=90); return b.getvalue(), im.size

def glb_read(p):
    b = open(p, 'rb').read(); l = struct.unpack('<I', b[12:16])[0]
    j = json.loads(b[20:20 + l]); s = 20 + l + 8
    return j, bytearray(b[s:s + j['buffers'][0]['byteLength']])

def transform(x, y, mode, a, b):
    # mode 'shift': 액자처럼 폭이 일정한 것 — 가장자리를 a,b만큼 밀어냄 / 'scale': 캔버스 — 비율로 늘림
    if mode == 'shift':
        return x + (a if x > 0 else -a), y + (b if y > 0 else -b)
    return x * a, y * b

def build(tid, oid, img, mode, a, b):
    j, binb = glb_read(A + f'glb/{tid}.glb')
    pos = {p['attributes']['POSITION'] for m in j['meshes'] for p in m['primitives']}
    for ai in pos:
        acc = j['accessors'][ai]; o = j['bufferViews'][acc['bufferView']]['byteOffset']
        xs, ys = [], []
        for k in range(acc['count']):
            p = o + k * 12
            x, y = struct.unpack_from('<ff', binb, p)
            x, y = transform(x, y, mode, a, b)
            struct.pack_into('<ff', binb, p, x, y); xs.append(x); ys.append(y)
        acc['min'][0], acc['max'][0] = round(min(xs), 6), round(max(xs), 6)
        acc['min'][1], acc['max'][1] = round(min(ys), 6), round(max(ys), 6)
    iv = j['images'][0]['bufferView']; bv = j['bufferViews'][iv]
    assert bv['byteOffset'] + bv['byteLength'] == len(binb.rstrip(b'\0')) or iv == len(j['bufferViews']) - 1
    nb = bytes(binb[:bv['byteOffset']]) + img; nb += b'\0' * ((-len(nb)) % 4)
    bv['byteLength'] = len(img); j['buffers'][0]['byteLength'] = len(nb)
    js = json.dumps(j, separators=(',', ':')).encode(); js += b' ' * ((-len(js)) % 4)
    out = struct.pack('<III', 0x46546C67, 2, 28 + len(js) + len(nb)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(nb), 0x004E4942) + nb
    open(A + f'glb/{oid}.glb', 'wb').write(out)
    t = tempfile.mkdtemp()
    try:
        zipfile.ZipFile(A + f'usdz/{tid}.usdz').extractall(t)
        st = Usd.Stage.Open(t + '/work.usdc')
        for prim in st.Traverse():
            if prim.GetTypeName() == 'Mesh':
                at = prim.GetAttribute('points')
                at.Set(Vt.Vec3fArray([Gf.Vec3f(*transform(p[0], p[1], mode, a, b), p[2]) for p in at.Get()]))
        st.GetRootLayer().Save(); del st
        jp = [n for n in zipfile.ZipFile(A + f'usdz/{tid}.usdz').namelist() if n.endswith('.jpg')][0]
        open(os.path.join(t, jp), 'wb').write(img)
        outp = A + f'usdz/{oid}.usdz'
        if os.path.exists(outp): os.remove(outp)
        cwd = os.getcwd(); os.chdir(t)
        w = Sdf.ZipFileWriter.CreateNew(outp); w.AddFile('work.usdc'); w.AddFile(jp); w.Save(); del w
        os.chdir(cwd)
    finally:
        shutil.rmtree(t, ignore_errors=True)

def main():
    data = json.load(open(R + 'data.json'))
    raw = open(A + 'works.json').read(); wj = json.loads(raw); items = wj['items']
    byid = {x['id']: x for x in items}
    state = json.load(open(STATE)) if os.path.exists(STATE) else {}
    canv = [x for x in items if x['kind'] == 'original' and os.path.exists(A + x['glb'])]
    changed = []
    for it in data.get('shop', []):
        cat = it.get('category') or ''
        if cat not in ('edition', 'original') or it['id'] == 's-shared-poster-examples':
            continue
        cover = it.get('cover') or ''
        cp = os.path.normpath(R + cover.lstrip('./')) if cover else ''
        hw = num(it.get('spec1'))
        if not cover or not os.path.exists(cp) or not hw:
            continue
        oid = it['id']; cur = byid.get(oid); s = sig(it)
        title = ' '.join((it.get('titleEn') or it.get('title') or '').split())
        meta = dict(title=title, hidden=bool(it.get('hidden')), url='/shop/' + it['slug'] + '/' if it.get('slug') else '')
        if cur and os.path.exists(A + cur['glb']) and (state.get(oid) in (None, s)):
            if state.get(oid) is None: state[oid] = s          # 기존 파일은 그대로 두고 기준값만 기록
            for k, v in meta.items():
                if v and cur.get(k) != v and not (k == 'title' and False):
                    cur[k] = v; changed.append(f'{oid} {k}')
            continue
        img, (iw, ih) = tex_bytes(cp)
        h, w = hw
        if (iw > ih) != (w > h) and abs(iw - ih) > 0.03 * max(iw, ih): h, w = w, h   # 크기 순서가 그림 방향과 다르면 맞춤
        H, W = h / 100, w / 100
        if cat == 'edition':
            build(POSTER_TPL, oid, img, 'shift', (W - 0.5) / 2, (H - 0.67) / 2)
        else:
            tpl = min(canv, key=lambda x: abs(max(x['h'], x['w']) - max(H, W)))
            build(tpl['id'], oid, img, 'scale', W / tpl['w'], H / tpl['h'])
        th = Image.open(io.BytesIO(img)).convert('RGB'); th.thumbnail((360, 360), Image.LANCZOS)
        os.makedirs(A + 'tex/t', exist_ok=True); th.save(A + f'tex/t/{oid}.jpg', quality=85)
        fmt = lambda v: ('%g' % v)
        entry = dict(id=oid, title=title, year=str(it.get('year') or ''), kind=cat, h=round(H, 4), w=round(W, 4),
                     medium=(it.get('spec2') or '').strip(), size=f'{fmt(h)} × {fmt(w)} cm', tex=f'tex/{oid}.jpg', url=meta['url'],
                     hidden=meta['hidden'], glb=f'glb/{oid}.glb', thumb=f'tex/t/{oid}.jpg', usdz=f'usdz/{oid}.usdz')
        if cur: cur.update(entry)
        else: items.append(entry); byid[oid] = entry
        state[oid] = s; changed.append(f'{oid} built')
    if changed:
        json.dump(wj, open(A + 'works.json', 'w'), ensure_ascii=False, indent=1 if '\n' in raw.strip() else None)
    json.dump(state, open(STATE, 'w'), indent=1, sort_keys=True)
    print('\n'.join(changed) or 'no changes')

main()
