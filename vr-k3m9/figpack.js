// Compact files for the virtual exhibition: one gzipped container per model.
// Layout: "LYM1", u32 json length, json (meta, with bufs:[{o,n}]), then the binary buffers (4-byte aligned).
// Meshes are stored with the meshoptimizer codecs (positions 16-bit over the bounding box).

const ab = s => { const t = atob(s), u = new Uint8Array(t.length); for (let i = 0; i < t.length; i++) u[i] = t.charCodeAt(i); return u.buffer; };

export function binPack(meta, bufs) {
  meta = { ...meta, bufs: [] }; let off = 0;
  for (const u of bufs) { meta.bufs.push({ o: off, n: u.byteLength }); off += u.byteLength + ((4 - u.byteLength % 4) % 4); }
  let js = new TextEncoder().encode(JSON.stringify(meta)); const jl = js.length + ((4 - js.length % 4) % 4);
  const out = new Uint8Array(8 + jl + off); out.set([76, 89, 77, 49]); new DataView(out.buffer).setUint32(4, jl, true);
  out.fill(32, 8, 8 + jl); out.set(js, 8);
  let p = 8 + jl; for (const u of bufs) { out.set(new Uint8Array(u.buffer, u.byteOffset, u.byteLength), p); p += u.byteLength + ((4 - u.byteLength % 4) % 4); }
  return out;
}
export async function gzip(u8) { return new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer()); }
export async function binRead(buf) {
  let b = new Uint8Array(buf);
  if (b[0] === 0x1f && b[1] === 0x8b) b = new Uint8Array(await new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
  if (b[0] !== 76 || b[1] !== 89 || b[2] !== 77) throw new Error('not a LYM file');
  const jl = new DataView(b.buffer, b.byteOffset).getUint32(4, true), meta = JSON.parse(new TextDecoder().decode(b.subarray(8, 8 + jl)));
  const base = 8 + jl; return { meta, buf: meta.bufs.map(x => b.subarray(base + x.o, base + x.o + x.n)) };
}

// box quantization of float positions
function q16(F) {
  const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < F.length; i++) { const c = i % 3; if (F[i] < mn[c]) mn[c] = F[i]; if (F[i] > mx[c]) mx[c] = F[i]; }
  const sc = mn.map((v, c) => (mx[c] - v) / 65535 || 1e-6), Q = new Uint16Array(F.length);
  for (let i = 0; i < F.length; i++) { const c = i % 3; Q[i] = Math.round((F[i] - mn[c]) / sc[c]); }
  return { min: mn, scale: sc, Q };
}
// reorder for the cache, interleave, encode. extra(i, view, byteOffset) writes the per-vertex extras after the position.
function encode(E, Q, idx, stride, extra) {
  const n = Q.length / 3, I = Uint32Array.from(idx);
  const [remap, unique] = E.reorderMesh(I, true, false);
  const V = new Uint8Array(unique * stride), dv = new DataView(V.buffer);
  for (let i = 0; i < n; i++) { const j = remap[i]; if (j === 0xffffffff) continue; const o = j * stride;
    dv.setUint16(o, Q[i * 3], true); dv.setUint16(o + 2, Q[i * 3 + 1], true); dv.setUint16(o + 4, Q[i * 3 + 2], true); if (extra) extra(i, V, o); }
  return { count: unique, tris: I.length, vb: E.encodeVertexBuffer(V, unique, stride), ib: E.encodeIndexBuffer(new Uint8Array(I.buffer), I.length, 4) };
}
const roundClip = c => ({ ...c, tracks: c.tracks.map(t => ({ ...t, times: t.times.map(v => +(+v).toFixed(4)), values: t.values.map(v => +(+v).toFixed(5)) })) });

// figure.json (base64 fields, as the figure page exports it) -> compact figure.bin (gzipped)
export async function figToBin(F, E) {
  await E.ready; const bufs = [], chunks = [];
  for (const c of F.chunks) {
    const P = new Float32Array(ab(c.pos)), idx = c.i32 ? new Uint32Array(ab(c.idx)) : new Uint16Array(ab(c.idx));
    const si = new Uint8Array(ab(c.si)), sw = new Uint8Array(ab(c.sw)), q = q16(P);
    const e = encode(E, q.Q, idx, 16, (i, V, o) => { for (let k = 0; k < 4; k++) { V[o + 8 + k] = si[i * 4 + k]; V[o + 12 + k] = sw[i * 4 + k]; } });
    chunks.push({ count: e.count, tris: e.tris, min: q.min, scale: q.scale }); bufs.push(e.vb, e.ib);
  }
  let head = null;
  if (F.head) { const P = new Float32Array(ab(F.head.pos)), idx = new Uint16Array(ab(F.head.idx)), q = q16(P), e = encode(E, q.Q, idx, 8, null);
    head = { bone: F.head.bone, p: F.head.p, q: F.head.q, s: F.head.s, count: e.count, tris: e.tris, min: q.min, scale: q.scale }; bufs.push(e.vb, e.ib); }
  const meta = { v: 2, credit: F.credit, bones: F.bones, bonePos: F.bonePos, scale: F.scale, y: F.y, chunks, head, walk: roundClip(F.walk), idle: roundClip(F.idle), look: F.look, P: F.P };
  return gzip(binPack(meta, bufs));
}

// decode helpers for the gallery (D = MeshoptDecoder, ready)
export function decodeVerts(D, m, stride, src) { const V = new Uint8Array(m.count * stride); D.decodeVertexBuffer(V, m.count, stride, src); return V; }
export function decodeIdx(D, m, src) { const I = new Uint32Array(m.tris); D.decodeIndexBuffer(new Uint8Array(I.buffer), m.tris, 4, src); return I; }
export function positions(V, m, stride) { const dv = new DataView(V.buffer), P = new Float32Array(m.count * 3);
  for (let i = 0; i < m.count; i++) for (let c = 0; c < 3; c++) P[i * 3 + c] = m.min[c] + dv.getUint16(i * stride + c * 2, true) * m.scale[c]; return P; }
