// Guestbook for the virtual exhibition: a blank linen book, one thick ink pen, every stroke kept for good.
// Opens zooming out of the book on the pedestal; tap outside the book, walk, or press Esc to close.
const INK = '#1d1b18', PEN_W = 2.4, PAGE_AR = 0.74, MAXLEN = 190000;
const PEN_CUR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Cpath d='M3 25l2.2-6.6L19.6 4a2.4 2.4 0 013.4 0l1 1a2.4 2.4 0 010 3.4L9.6 22.8z' fill='%23fffdf7' stroke='%231d1b18' stroke-width='1.6' stroke-linejoin='round'/%3E%3Cpath d='M5.2 18.4l4.4 4.4M3 25l2.2-.7-1.5-1.5z' fill='%231d1b18' stroke='%231d1b18' stroke-width='1.2'/%3E%3C/svg%3E") 3 25,crosshair`;
const CSS = `
.gbx{position:absolute;inset:0;z-index:20;cursor:default;display:grid;place-items:center;padding:clamp(12px,4vw,40px);background:rgba(14,13,11,0);transition:background .55s ease;touch-action:none}
.gbx.on{background:rgba(14,13,11,.72)}
.gbx.inline,.gbx.inline.on{position:relative;inset:auto;min-height:100%;background:transparent}
.gbx .book{position:relative;width:min(100%,920px);background:repeating-linear-gradient(0deg,rgba(0,0,0,.025) 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,rgba(255,255,255,.18) 0 1px,transparent 1px 3px),#e6dfcf;
  border-radius:6px 6px 8px 8px;padding:1.2%;box-shadow:0 24px 60px rgba(0,0,0,.45),0 2px 0 #d9d0bc inset;user-select:none;-webkit-user-select:none;transform-origin:50% 50%;
  transition:transform .6s cubic-bezier(.2,.75,.25,1),opacity .45s ease}
.gbx .spread{position:relative;display:grid;grid-template-columns:1fr 1fr;perspective:2400px;aspect-ratio:var(--ar)}
.gbx .book.single .spread{grid-template-columns:1fr}
.gbx .page{position:relative;background:#faf6ec;overflow:hidden}
.gbx .page.l{border-radius:3px 0 0 3px;box-shadow:inset -18px 0 22px -16px rgba(60,40,10,.28)}
.gbx .page.r{border-radius:0 3px 3px 0;box-shadow:inset 18px 0 22px -16px rgba(60,40,10,.28)}
.gbx .book.single .page.r{border-radius:3px;box-shadow:inset 14px 0 18px -14px rgba(60,40,10,.25)}
.gbx .page canvas{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:inherit}
.gbx .page canvas:active{cursor:inherit}
.gbx .page.mine{cursor:${PEN_CUR}}
.gbx .leaf{position:absolute;top:0;bottom:0;transform-style:preserve-3d;z-index:5;pointer-events:none}
.gbx .leaf .side{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;background:#faf6ec;overflow:hidden}
.gbx .leaf .side.back{transform:rotateY(180deg)}
.gbx .leaf .shade{position:absolute;inset:0;pointer-events:none}
.gbx .rm{position:absolute;right:4%;top:3%;z-index:7;font:12px system-ui,sans-serif;border:1px solid #d8cfba;background:#fffdf7;color:#7a5a3a;border-radius:999px;padding:2px 10px;cursor:pointer}
.gbx .corner{position:absolute;top:-2%;bottom:-2%;width:15%;z-index:6;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:none}
.gbx .corner.next{right:-4%}.gbx .corner.prev{left:-4%}
.gbx .book.single .corner{width:24%}`;

const b64e = u => { let s = ''; const b = new Uint8Array(u.buffer); for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000)); return btoa(s); };
const b64d = s => { const t = atob(s), u = new Uint8Array(t.length); for (let i = 0; i < t.length; i++) u[i] = t.charCodeAt(i); return new Uint16Array(u.buffer); };
const cl = v => Math.min(1, Math.max(0, v));
const packStroke = s => ({ p: b64e(Uint16Array.from(s.pts.flatMap(([x, y]) => [Math.round(cl(x) * 65535), Math.round(cl(y) * 65535)]))) });
const unpack = arr => (arr || []).map(s => { const q = b64d(s.p), pts = []; for (let i = 0; i < q.length; i += 2) pts.push([q[i] / 65535, q[i + 1] / 65535]); return { pts, p: s.p }; });
const MAXP = 10, BOOK = 100; // pages one visitor can fill; pages in a fresh book
function strokePath(g, s, W) { const p = s.pts, H = g.canvas.height; if (!p.length) return; g.strokeStyle = g.fillStyle = INK; g.lineWidth = Math.max(1, PEN_W * W * 0.0042); g.lineCap = 'round'; g.lineJoin = 'round';
  if (p.length < 3) { g.beginPath(); g.arc(p[0][0] * W, p[0][1] * H, g.lineWidth / 2, 0, 7); g.fill(); return; }
  g.beginPath(); g.moveTo(p[0][0] * W, p[0][1] * H);
  for (let i = 1; i < p.length - 1; i++) g.quadraticCurveTo(p[i][0] * W, p[i][1] * H, (p[i][0] + p[i + 1][0]) / 2 * W, (p[i][1] + p[i + 1][1]) / 2 * H);
  const l = p[p.length - 1]; g.lineTo(l[0] * W, l[1] * H); g.stroke(); }
function paint(cv, strokes) { const r = cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1); const W = Math.max(1, Math.round(r.width * dpr)), H = Math.max(1, Math.round(r.height * dpr));
  if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; } const g = cv.getContext('2d'); g.clearRect(0, 0, W, H); for (const s of strokes) strokePath(g, s, W); }
const rnd = (n, abc) => { const a = new Uint8Array(n); crypto.getRandomValues(a); return [...a].map(v => abc[v % abc.length]).join(''); };

// store (default: the exhibition server at api):
//   index() -> [{id, g, at}] every visible page, light;  pages(keys) -> {"id:g": [strokes]};  save(g, strokes) -> 'ok'|'conflict'|'fail'
//   hide(id, g) -> owner only;  canHide() -> true when the owner is looking
export function createGuestbook({ host, api, store, me: meIn, inline, onOpen, onClose }) {
  if (!document.getElementById('gb-css')) { const st = document.createElement('style'); st.id = 'gb-css'; st.textContent = CSS; document.head.appendChild(st); }
  let me = meIn || null; if (!me) try { me = JSON.parse(localStorage.getItem('gb-me') || 'null'); } catch (e) {}
  if (!me || !me.id) { me = { id: rnd(24, 'abcdefghijklmnopqrstuvwxyz0123456789'), key: rnd(40, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') }; try { localStorage.setItem('gb-me', JSON.stringify(me)); } catch (e) {} }
  let others = [], mine = { strokes: [] }, single = false, cur = 0, busy = false, full = false, drawing = false, pendingRender = false, isOpen = false, loaded = false, owner = false;
  let wrap = null, book = null, spreadEl = null, ro = null;
  const cache = new Map(), asked = new Set(), writing = new Set(), queued = new Set();
  const masterPass = () => { try { const t = JSON.parse(localStorage.getItem('lysSnsPass') || 'null'); return t && t.t && t.exp > Date.now() ? t.t : ''; } catch (e) { return ''; } };
  store = store || {
    index: async () => ((await (await fetch(api, { cache: 'no-store' })).json()).idx || []),
    pages: async keys => ((await (await fetch(api + '/p?k=' + encodeURIComponent(keys.join(',')), { cache: 'no-store' })).json()).pages || {}),
    save: async (g, strokes) => { const r = await fetch(api, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: me.id, key: me.key, g, strokes }) }); return r.ok ? 'ok' : (r.status === 409 || r.status === 403) ? 'conflict' : 'fail'; },
    hide: async (id, g) => { const r = await fetch(api + '/hide', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ t: masterPass(), id, g }) }); return r.ok; },
    canHide: async () => !!masterPass() };
  // pages: everyone's (in the order they came), then yours (one blank page always ahead, up to MAXP), then the rest of the book
  let mineStart = 0;
  const myCount = () => MAXP; // all ten of your pages are open to write on, in any order
  const pages = () => { const list = [];
    for (const o of others) list.push({ kind: 'entry', key: o.id + ':' + o.g, id: o.id, g: o.g });
    if (list.length % 2) list.push({ kind: 'blank' }); // your writing starts on a left-hand page
    mineStart = list.length; const n = myCount(); for (let g = 0; g < n; g++) list.push({ kind: 'mine', g });
    while (list.length < BOOK || list.length % 2) list.push({ kind: 'blank' });
    return list; };
  const per = () => single ? 1 : 2;
  const lastStart = () => { const n = pages().length; return single ? n - 1 : Math.floor((n - 1) / 2) * 2; };
  const clampCur = () => { cur = Math.max(0, Math.min(lastStart(), cur - (single ? 0 : cur % 2))); };
  // fetch only the pages around where you are
  async function fetchNear() { const P = pages(), want = [];
    for (let i = Math.max(0, cur - 4); i < Math.min(P.length, cur + 6); i++) { const p = P[i]; if (p && p.kind === 'entry' && !cache.has(p.key) && !asked.has(p.key)) want.push(p.key); }
    if (!want.length) return; want.forEach(k => asked.add(k));
    try { const got = await store.pages(want.slice(0, 12)); for (const [k, v] of Object.entries(got)) cache.set(k, unpack(v)); } catch (e) { want.forEach(k => asked.delete(k)); return; }
    if (drawing) pendingRender = true; else if (!busy) render(); }

  function pageEl(pg, side, live) {
    const d = document.createElement('div'); d.className = 'page ' + side;
    if (!pg || pg.kind === 'blank') return d;
    const cv = document.createElement('canvas'); d.appendChild(cv);
    if (pg.kind === 'entry') { const st = cache.get(pg.key); if (st) requestAnimationFrame(() => paint(cv, st));
      if (live && owner) { const b = document.createElement('button'); b.className = 'rm'; b.textContent = '지우기'; let armed = false;
        b.onpointerdown = e => e.stopPropagation();
        b.onclick = async e => { e.stopPropagation(); if (!armed) { armed = true; b.textContent = '정말 지울까요?'; setTimeout(() => { armed = false; b.textContent = '지우기'; }, 3000); return; }
          if (await store.hide(pg.id, pg.g)) { others = others.filter(o => !(o.id === pg.id && o.g === pg.g)); render(); } else b.textContent = '못 지웠어요'; };
        d.appendChild(b); } }
    else { const g = pg.g, mineG = () => mine.strokes.filter(s => (s.g | 0) === g); requestAnimationFrame(() => paint(cv, mineG())); if (live) { d.classList.add('mine'); attachPen(d, cv, g, mineG); } }
    return d;
  }
  // fit the book inside the room view (not the window)
  function fit() { if (!book) return; const cs = getComputedStyle(wrap), pw = host.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), ph = host.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const ar = (single ? PAGE_AR : PAGE_AR * 2), w = Math.min(pw, (ph * 0.975) * ar, single ? 560 : 980); book.style.width = Math.max(120, w) + 'px'; }
  let cPrev = null, cNext = null;
  function render() {
    if (!spreadEl) return; fit(); clampCur(); const P = pages();
    spreadEl.querySelectorAll('.page,.leaf').forEach(n => n.remove());
    book.classList.toggle('single', single); spreadEl.style.setProperty('--ar', String(single ? PAGE_AR : PAGE_AR * 2));
    const first = spreadEl.firstChild;
    if (single) spreadEl.insertBefore(pageEl(P[cur], 'r', true), first);
    else { spreadEl.insertBefore(pageEl(P[cur], 'l', true), first); spreadEl.insertBefore(pageEl(P[cur + 1], 'r', true), first); }
    if (!cPrev) { cPrev = document.createElement('div'); cPrev.className = 'corner prev'; cPrev.onpointerdown = e => dragFlip(e, -1); cNext = document.createElement('div'); cNext.className = 'corner next'; cNext.onpointerdown = e => dragFlip(e, 1); spreadEl.append(cPrev, cNext); }
    cPrev.hidden = !(cur > 0); cNext.hidden = !(cur < lastStart());
    if (loaded) fetchNear();
  }
  function makeLeaf(dir) {
    const P = pages(), r = spreadEl.getBoundingClientRect(), half = single ? r.width : r.width / 2;
    const leaf = document.createElement('div'); leaf.className = 'leaf'; leaf.style.width = half + 'px';
    const front = document.createElement('div'), back = document.createElement('div'); front.className = 'side front'; back.className = 'side back';
    let fIdx, bIdx;
    if (dir > 0) { fIdx = single ? cur : cur + 1; bIdx = single ? null : cur + 2; leaf.style.left = (single ? 0 : half) + 'px'; leaf.style.transformOrigin = 'left center'; }
    else { fIdx = single ? cur - 1 : cur; bIdx = single ? null : cur - 1; leaf.style.left = '0px'; leaf.style.transformOrigin = single ? 'left center' : 'right center'; }
    const fe = pageEl(P[fIdx], single ? 'r' : (dir > 0 ? 'r' : 'l'), false), be = pageEl(bIdx == null ? null : P[bIdx], dir > 0 ? 'l' : 'r', false);
    for (const x of [fe, be]) { x.style.position = 'absolute'; x.style.inset = '0'; }
    front.appendChild(fe); back.appendChild(be);
    const s1 = document.createElement('div'), s2 = document.createElement('div'); s1.className = 'shade'; s2.className = 'shade'; front.appendChild(s1); back.appendChild(s2);
    leaf.append(front, back);
    if (!(single && dir < 0)) {
      const under = pageEl(dir > 0 ? P[single ? cur + 1 : cur + 3] : P[cur - 2], dir > 0 ? 'r' : 'l', false);
      Object.assign(under.style, { position: 'absolute', top: '0', bottom: '0', width: half + 'px', left: (dir > 0 ? (single ? 0 : half) : 0) + 'px', zIndex: 4 });
      spreadEl.appendChild(under);
    }
    spreadEl.appendChild(leaf); return { leaf, s1, s2, dir };
  }
  function setAngle(L, t) {
    const a = L.dir > 0 ? -180 * t : (single ? -180 * (1 - t) : 180 * t); L.leaf.style.transform = `rotateY(${a}deg)`;
    const k = Math.sin(Math.PI * t), g = x => `linear-gradient(${x}, rgba(40,25,5,${(0.28 * k).toFixed(3)}) 0%, rgba(255,255,255,${(0.18 * k).toFixed(3)}) 35%, rgba(0,0,0,0) 70%)`;
    L.s1.style.background = g(L.dir > 0 ? '90deg' : '270deg'); L.s2.style.background = g(L.dir > 0 ? '270deg' : '90deg');
    L.leaf.firstChild.style.boxShadow = L.leaf.lastChild.style.boxShadow = `0 6px ${14 * k}px rgba(30,20,5,${(0.22 * k).toFixed(3)})`;
  }
  function finish(L, done, from) {
    const t0 = performance.now(), dur = 520 * (done ? 1 - from : from) + 140;
    const step = now => { const u = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - u, 3), t = done ? from + (1 - from) * e : from * (1 - e); setAngle(L, t);
      if (u < 1) requestAnimationFrame(step); else { if (done) cur += L.dir * per(); busy = false; render(); } };
    requestAnimationFrame(step);
  }
  function flip(dir) { if (busy) return; if ((dir > 0 && cur >= lastStart()) || (dir < 0 && cur <= 0)) return; busy = true; const L = makeLeaf(dir); setAngle(L, 0); finish(L, true, 0); }
  function dragFlip(e, dir) { if (busy) return; e.preventDefault(); e.stopPropagation(); busy = true; const L = makeLeaf(dir), r = spreadEl.getBoundingClientRect(); let t = 0, moved = 0; const x0 = e.clientX; setAngle(L, 0);
    const mv = ev => { moved = Math.max(moved, Math.abs(ev.clientX - x0)); t = cl((dir > 0 ? (x0 - ev.clientX) : (ev.clientX - x0)) / r.width); setAngle(L, t); };
    const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); finish(L, moved < 8 ? true : t > 0.3, t); };
    addEventListener('pointermove', mv); addEventListener('pointerup', up); addEventListener('pointercancel', up); }

  function attachPen(d, cv, g, mineG) {
    let st = null; const pos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]; };
    d.addEventListener('pointerdown', e => { e.stopPropagation(); if (busy || full || !loaded) return; e.preventDefault(); d.setPointerCapture(e.pointerId); st = { pts: [pos(e)], g }; drawing = true; mine.strokes.push(st); paint(cv, mineG()); });
    d.addEventListener('pointermove', e => { if (!st) return; const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      for (const ev of evs) { const p = pos(ev), q = st.pts[st.pts.length - 1]; if (Math.hypot(p[0] - q[0], p[1] - q[1]) > 0.0025) st.pts.push(p); } paint(cv, mineG()); });
    const end = () => { if (st) { st.p = packStroke(st).p; const g0 = st.g; st = null; drawing = false; keep(g0); pendingRender = false; render(); } };
    d.addEventListener('pointerup', end); d.addEventListener('pointercancel', end);
  }
  async function keep(g) {
    if (writing.has(g)) { queued.add(g); return; } writing.add(g);
    try { const strokes = mine.strokes.filter(x => (x.g | 0) === g).map(x => ({ p: x.p }));
      if (JSON.stringify(strokes).length > MAXLEN) full = true;
      else if ((await store.save(g, strokes)) === 'conflict') await load(true);
    } catch (e) {}
    writing.delete(g); if (queued.has(g)) { queued.delete(g); keep(g); }
  }
  async function load(force) {
    try { const idx = await store.index(); owner = await (store.canHide ? store.canHide() : false);
      // people in the order they first wrote, each person's pages in order
      const first = new Map(); for (const r of idx) first.set(r.id, Math.min(first.get(r.id) ?? Infinity, r.at || 0));
      others = idx.filter(r => r.id !== me.id).sort((a, b) => (first.get(a.id) - first.get(b.id)) || a.id.localeCompare(b.id) || a.g - b.g).map(r => ({ id: r.id, g: r.g | 0 }));
      const myKeys = idx.filter(r => r.id === me.id).map(r => me.id + ':' + (r.g | 0));
      if (myKeys.length && (force || !mine.strokes.length)) { const got = await store.pages(myKeys); const all = [];
        for (const [k, v] of Object.entries(got)) { const g = +k.split(':')[1] | 0; for (const st of unpack(v)) all.push({ ...st, g }); } mine.strokes = all; }
      const was = loaded; loaded = true; if (!was) { pages(); cur = mineStart - (single ? 0 : mineStart % 2); }
      if (drawing) pendingRender = true; else if (!busy) render();
      fetchNear();
    } catch (e) { loaded = true; render(); }
  }

  function layout() { if (!book || busy) return; const s = host.clientWidth < 620; if (s !== single) { single = s; if (!single) cur -= cur % 2; } render(); }
  function open(fromRect) {
    if (isOpen) return; isOpen = true; onOpen && onOpen();
    wrap = document.createElement('div'); wrap.className = 'gbx'; wrap.innerHTML = '<div class="book"><div class="spread"></div></div>';
    book = wrap.firstChild; spreadEl = book.firstChild; cPrev = cNext = null; host.appendChild(wrap);
    single = host.clientWidth < 620; pages(); cur = mineStart - (single ? 0 : mineStart % 2); render();
    // grow out of the book on the pedestal
    const hb = host.getBoundingClientRect(), bb = book.getBoundingClientRect();
    if (fromRect && bb.width) { const sx = Math.max(0.04, fromRect.width / bb.width), cx = fromRect.left + fromRect.width / 2 - (bb.left + bb.width / 2), cy = fromRect.top + fromRect.height / 2 - (bb.top + bb.height / 2);
      book.style.transition = 'none'; book.style.transform = `translate(${cx}px,${cy}px) scale(${sx})`; book.style.opacity = '0.2'; book.getBoundingClientRect(); book.style.transition = ''; }
    requestAnimationFrame(() => { wrap.classList.add('on'); book.style.transform = ''; book.style.opacity = '1'; });
    if (inline) wrap.classList.add('inline'); else wrap.addEventListener('pointerdown', e => { if (!book.contains(e.target)) { e.preventDefault(); close(); } });
    ro = new ResizeObserver(layout); ro.observe(host);
    load(false);
    void hb;
  }
  function close() {
    if (!isOpen || !wrap) return; isOpen = false; const w = wrap, b = book; wrap = book = spreadEl = null; if (ro) { ro.disconnect(); ro = null; }
    w.classList.remove('on'); b.style.transform = 'scale(.12)'; b.style.opacity = '0';
    setTimeout(() => w.remove(), 560); onClose && onClose();
  }
  addEventListener('keydown', e => { if (!isOpen) return; if (e.key === 'Escape') { if (!inline) close(); return; }
    if (e.key === 'ArrowRight') { flip(1); e.preventDefault(); e.stopPropagation(); } else if (e.key === 'ArrowLeft') { flip(-1); e.preventDefault(); e.stopPropagation(); }
    else if (!inline && /^(w|a|s|d|arrowup|arrowdown)$/i.test(e.key)) close(); }, true);
  return { open, close, get isOpen() { return isOpen; } };
}
