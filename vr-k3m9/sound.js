// Room tone for the gallery: air, a soft drone, a high "light" shimmer, far metal touches near the mobile,
// your own footsteps while you walk and other visitors' footsteps placed where they are.
// Values come from the "전시장 울림" sound demo (윤성's chosen setting); each room swaps its own reverb.

const BASE = {master:0.7,stV:0.45,stH:0.55,otV:0.35,lgV:0.22,lgH:0.5,lgS:0.25,
  on_air:true,on_drone:true,on_steps:true,on_others:true,on_shim:true,on_light:true};
const ROOM = {
  room1:{rev:2.8,wet:0.45,damp:0.45,airV:0.35,airT:0.35,airB:0.4,airK:0,drV:0.32,drF:62,drT:0.3,drS:0.35,drM:0,shV:0.25,shD:0.15,shH:0.5},
  room2:{rev:3.4,wet:0.52,damp:0.5,airV:0.32,airT:0.4,airB:0.4,airK:0,drV:0.3,drF:70,drT:0.38,drS:0.4,drM:0,shV:0.35,shD:0.35,shH:0.5},
  guestbook:{rev:1.1,wet:0.3,damp:0.25,airV:0.22,airT:0.2,airB:0.25,airK:0,drV:0.18,drF:52,drT:0.18,drS:0.25,drM:0,shV:0.2,shD:0.1,shH:0.5}
};
const STRIDE = 0.75; // metres per step

export function createRoomTone() {
  let ac = null, N = {}, S = Object.assign({}, BASE, ROOM.room1), room = 'room1', on = false, muted = false;
  try { muted = localStorage.getItem('lysMute') === '1'; } catch (e) {}
  const rnd = (a, b) => a + Math.random() * (b - a);

  function noiseBuf(sec, kind) {
    const n = ac.sampleRate * sec, b = ac.createBuffer(2, n, ac.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c); let l = 0, b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < n; i++) {
        const w = Math.random() * 2 - 1;
        if (kind === 'brown') { l = (l + 0.02 * w) / 1.02; d[i] = l * 3.2; }
        else if (kind === 'pink') { b0 = 0.99765 * b0 + w * 0.0990460; b1 = 0.96300 * b1 + w * 0.2965164; b2 = 0.57000 * b2 + w * 1.0526913; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.11; }
        else d[i] = w;
      }
    }
    return b;
  }
  function impulse(sec, damp) {
    const n = Math.max(1, Math.floor(ac.sampleRate * sec)), b = ac.createBuffer(2, n, ac.sampleRate), pre = Math.floor(ac.sampleRate * 0.018);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c); let lp = 0;
      for (let i = 0; i < n; i++) {
        if (i < pre) { d[i] = 0; continue; }
        const t = (i - pre) / (n - pre), env = Math.pow(1 - t, 2.2) * Math.exp(-t * 3.2), k = 0.92 - 0.85 * t * (1 - damp) - 0.05;
        lp = lp + (Math.random() * 2 - 1 - lp) * Math.max(0.03, k); d[i] = lp * env;
      }
      for (const [ms, g] of [[11, 0.5], [23, 0.35], [37, 0.28], [52, 0.2]]) { const j = pre + Math.floor(ac.sampleRate * ms / 1000 * (sec / 2.8)); if (j < n) d[j] += g * (c ? 0.9 : 1); }
    }
    return b;
  }

  function build() {
    ac = new (window.AudioContext || window.webkitAudioContext)();
    N.master = ac.createGain(); N.master.gain.value = 0;
    const comp = ac.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 3; N.master.connect(comp).connect(ac.destination);
    N.bus = ac.createGain(); N.dry = ac.createGain(); N.send = ac.createGain();
    N.bus.connect(N.dry).connect(N.master); N.bus.connect(N.send);
    // two reverbs so a room change cross-fades instead of clicking
    N.rv = [0, 1].map(() => { const c = ac.createConvolver(), g = ac.createGain(); g.gain.value = 0; N.send.connect(c).connect(g).connect(N.master); return { c, g }; });
    N.rvA = 0; N.rv[0].c.buffer = impulse(S.rev, S.damp);
    // air
    N.airSrc = ac.createBufferSource(); N.airSrc.buffer = noiseBuf(8, 'brown'); N.airSrc.loop = true;
    N.airSrc2 = ac.createBufferSource(); N.airSrc2.buffer = noiseBuf(8, 'pink'); N.airSrc2.loop = true;
    N.airMixB = ac.createGain(); N.airMixP = ac.createGain();
    N.airHp = ac.createBiquadFilter(); N.airHp.type = 'highpass'; N.airLp = ac.createBiquadFilter(); N.airLp.type = 'lowpass';
    N.airG = ac.createGain(); N.airLfo = ac.createOscillator(); N.airLfo.frequency.value = 0.07; N.airLfoG = ac.createGain(); N.airLfo.connect(N.airLfoG).connect(N.airG.gain);
    N.airSrc.connect(N.airMixB).connect(N.airHp); N.airSrc2.connect(N.airMixP).connect(N.airHp); N.airHp.connect(N.airLp).connect(N.airG).connect(N.bus);
    N.airSrc.start(); N.airSrc2.start(); N.airLfo.start();
    // drone
    N.drG = ac.createGain(); N.drLp = ac.createBiquadFilter(); N.drLp.type = 'lowpass'; N.drLp.Q.value = 0.4; N.drG.connect(N.drLp).connect(N.bus);
    const dark = [1, 1.498, 2.003, 2.996, 4.01].map((m, i) => ({ m, i, set: 0, base: [0.5, 0.32, 0.22, 0.12, 0.06][i] })),
      bright = [1, 1.25, 1.5, 2, 2.5, 3].map((m, i) => ({ m, i, set: 1, base: [0.42, 0.26, 0.3, 0.2, 0.1, 0.07][i] }));
    N.dr = dark.concat(bright).map(({ m, i, set, base }) => {
      const o = ac.createOscillator(); o.type = set ? (i < 4 ? 'sine' : 'triangle') : (i < 2 ? 'sine' : 'triangle'); o.detune.value = rnd(-6, 6);
      const g = ac.createGain(); g.gain.value = 0; const l = ac.createOscillator(); l.frequency.value = rnd(0.02, 0.06); const lg = ac.createGain(); l.connect(lg).connect(g.gain);
      const p = ac.createStereoPanner(); p.pan.value = rnd(-0.6, 0.6); o.connect(g).connect(p).connect(N.drG); o.start(); l.start();
      return { o, g, l, lg, m, set, base };
    });
    // light
    N.lgG = ac.createGain(); N.lgG.gain.value = 0; N.lgDry = ac.createGain(); N.lgDry.gain.value = 0.25; N.lgG.connect(N.send); N.lgG.connect(N.lgDry).connect(N.bus);
    N.lg = [1, 1.25, 1.5, 2, 2.5].map((m, i) => {
      const g = ac.createGain(); g.gain.value = 0; const p = ac.createStereoPanner(); p.pan.value = (i % 2 ? 1 : -1) * rnd(0.2, 0.8); g.connect(p).connect(N.lgG);
      const os = [-1, 1].map(sg => { const o = ac.createOscillator(); o.type = 'sine'; o.start(); o.connect(g); return { o, sg }; });
      const l = ac.createOscillator(); l.frequency.value = rnd(0.02, 0.07); const lg = ac.createGain(); l.connect(lg).connect(g.gain); l.start();
      return { m, g, os, l, lg, base: [0.5, 0.38, 0.42, 0.3, 0.2][i], r: rnd(0.6, 1.4) };
    });
    N.stepNoise = noiseBuf(1, 'white');
    apply(true);
  }

  function apply(first) {
    const t = ac.currentTime, a = first ? 0.01 : 1;
    N.rv[N.rvA].g.gain.setTargetAtTime(S.wet * 1.4, t, first ? 0.01 : 0.6);
    N.dry.gain.setTargetAtTime(1 - S.wet * 0.55, t, 0.6 * a);
    N.airG.gain.setTargetAtTime(S.on_air ? S.airV * 0.5 : 0, t, 0.6 * a); N.airLfoG.gain.setTargetAtTime(S.on_air ? S.airV * 0.5 * S.airB * 0.6 : 0, t, 0.6 * a);
    N.airLp.frequency.setTargetAtTime(180 + S.airT * 1800 + S.airK * S.airT * 5000, t, 0.6 * a);
    N.airMixB.gain.setTargetAtTime(1 - S.airK, t, 0.5 * a); N.airMixP.gain.setTargetAtTime(S.airK * 0.55, t, 0.5 * a); N.airHp.frequency.setTargetAtTime(40 + S.airK * 160, t, 0.5 * a);
    N.drG.gain.setTargetAtTime(S.on_drone ? S.drV * 0.22 : 0, t, 1.2 * a); N.drLp.frequency.setTargetAtTime(160 + S.drT * 2400 + S.drM * S.drT * 2600, t, 0.8 * a);
    for (const d of N.dr) {
      const w = d.set ? S.drM : 1 - S.drM;
      d.o.frequency.setTargetAtTime(S.drF * d.m, t, 1.5 * a); d.g.gain.setTargetAtTime(d.base * 0.55 * w, t, 0.5 * a); d.lg.gain.setTargetAtTime(d.base * 0.45 * w, t, 0.5 * a);
      d.l.frequency.setTargetAtTime((0.015 + S.drS * 0.09) * (0.7 + 0.6 * d.m / 4), t, 0.5 * a);
    }
    N.lgG.gain.setTargetAtTime(S.on_light ? S.lgV * 0.035 : 0, t, 1.2 * a); const lb = 440 * Math.pow(2, S.lgH * 1.2);
    for (const q of N.lg) {
      for (const { o, sg } of q.os) { o.frequency.setTargetAtTime(lb * q.m, t, 0.8 * a); o.detune.setTargetAtTime(sg * (1.5 + S.lgS * 7), t, 0.5 * a); }
      q.g.gain.setTargetAtTime(q.base * 0.5, t, 0.5 * a); q.lg.gain.setTargetAtTime(q.base * 0.5, t, 0.5 * a); q.l.frequency.setTargetAtTime((0.02 + S.lgS * 0.12) * q.r, t, 0.5 * a);
    }
  }

  function setRoom(r) {
    if (!ROOM[r] || r === room) return; room = r; Object.assign(S, ROOM[r]); if (!ac) return;
    const t = ac.currentTime, old = N.rv[N.rvA]; N.rvA = 1 - N.rvA; const nw = N.rv[N.rvA];
    nw.c.buffer = impulse(S.rev, S.damp); old.g.gain.setTargetAtTime(0, t, 0.8); nw.g.gain.setTargetAtTime(S.wet * 1.4, t, 0.8); apply(false);
  }

  // one footstep: heel thump + sole scuff; far ones lose their top and lean on the reverb
  function step(when, vol, pan, far) {
    if (vol < 0.002) return;
    const g = ac.createGain(), p = ac.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, pan)); g.connect(p);
    if (far) { const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; p.connect(lp); lp.connect(N.send); const d = ac.createGain(); d.gain.value = 0.35; lp.connect(d).connect(N.bus); } else p.connect(N.bus);
    const hard = 1 - S.stH, th = ac.createOscillator(); th.frequency.setValueAtTime(95 + hard * 40, when); th.frequency.exponentialRampToValueAtTime(48, when + 0.09);
    const tg = ac.createGain(); tg.gain.setValueAtTime(0.0001, when); tg.gain.exponentialRampToValueAtTime(vol * 0.9, when + 0.006); tg.gain.exponentialRampToValueAtTime(0.0001, when + 0.12);
    th.connect(tg).connect(g); th.start(when); th.stop(when + 0.15);
    const n = ac.createBufferSource(); n.buffer = N.stepNoise; const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900 + hard * 2600; bp.Q.value = 0.9 + hard * 1.5;
    const ng = ac.createGain(); ng.gain.setValueAtTime(0.0001, when); ng.gain.exponentialRampToValueAtTime(vol * (0.25 + hard * 0.55), when + 0.004); ng.gain.exponentialRampToValueAtTime(0.0001, when + 0.05 + 0.08 * (1 - hard));
    n.connect(bp).connect(ng).connect(g); n.start(when, rnd(0, 0.8), 0.2);
  }
  function shimmer(when, near) {
    const base = [987.8, 1174.7, 1318.5, 1568, 1760, 2093, 2349][Math.floor(Math.random() * 7)] * (0.6 + S.shH * 0.9);
    const c = ac.createOscillator(), m = ac.createOscillator(), mg = ac.createGain(), g = ac.createGain(), p = ac.createStereoPanner();
    c.frequency.value = base; m.frequency.value = base * 3.51; mg.gain.setValueAtTime(base * 0.8, when); mg.gain.exponentialRampToValueAtTime(1, when + 2.5); m.connect(mg).connect(c.frequency);
    const v = S.shV * 0.05 * near; g.gain.setValueAtTime(0.0001, when); g.gain.exponentialRampToValueAtTime(Math.max(0.0002, v), when + 0.02); g.gain.exponentialRampToValueAtTime(0.00005, when + rnd(3, 5.5));
    p.pan.value = rnd(-0.8, 0.8); c.connect(g).connect(p).connect(N.send); c.start(when); m.start(when); c.stop(when + 6); m.stop(when + 6);
  }

  let me = null, side = 1, nextShim = 0; const others = new Map();
  // ctx: {room, x, y, yaw, peers:[{id,x,y,room}], mobile:{x,y}|null}
  function tick(ctx) {
    if (!ac || !on) return;
    setRoom(ctx.room);
    const now = ac.currentTime;
    if (me) {
      const d = Math.hypot(ctx.x - me.x, ctx.y - me.y);
      if (d < 1.5) { me.acc += d; if (S.on_steps && me.acc >= STRIDE && now - (me.last || 0) > 0.62) { me.acc %= STRIDE; me.last = now; step(now + 0.02, S.stV * 0.5 * rnd(0.85, 1.1), side * 0.12, false); side = -side; } } // never quicker than an ordinary unhurried step
      if (d < 0.0005) me.idle += 1; else me.idle = 0; if (me.idle > 20) me.acc = STRIDE * 0.55; // the first step lands soon after you set off
    }
    me = Object.assign(me || { acc: STRIDE * 0.55, idle: 0 }, { x: ctx.x, y: ctx.y });
    const rx = Math.cos(ctx.yaw), ry = Math.sin(ctx.yaw), seen = new Set();
    for (const p of ctx.peers) {
      seen.add(p.id); let o = others.get(p.id); if (!o) { o = { x: p.x, y: p.y, acc: STRIDE * 0.5 }; others.set(p.id, o); }
      const d = Math.hypot(p.x - o.x, p.y - o.y); o.x = p.x; o.y = p.y; if (d > 1.5) continue; o.acc += d;
      if (S.on_others && o.acc >= STRIDE) {
        o.acc %= STRIDE; const dx = p.x - ctx.x, dy = p.y - ctx.y, dist = Math.hypot(dx, dy) || 0.01;
        const vol = S.otV * 0.4 / (1 + dist * dist * 0.08) * (p.room === ctx.room ? 1 : 0.35);
        step(now + 0.02, vol * rnd(0.85, 1.1), (dx * rx + dy * ry) / dist * Math.min(1, dist / 1.5), dist > 3.5 || p.room !== ctx.room);
      }
    }
    for (const id of [...others.keys()]) if (!seen.has(id)) others.delete(id);
    if (S.on_shim) {
      if (!nextShim) nextShim = now + rnd(1, 4);
      if (nextShim < now + 0.1) {
        const md = ctx.mobile ? Math.hypot(ctx.mobile.x - ctx.x, ctx.mobile.y - ctx.y) : 99, near = Math.max(0.35, Math.min(1.4, 1.6 - md / 7));
        shimmer(nextShim, near); nextShim += rnd(2, 9) * (1.5 - S.shD * 1.2) * (md < 6 ? 0.7 : 1.2);
      }
    }
  }

  function level() { return muted || document.hidden ? 0 : S.master * 0.9; }
  function fade(sec) { if (ac) N.master.gain.setTargetAtTime(level(), ac.currentTime, sec); }
  // call from inside a user gesture (browsers only allow sound after one)
  function start() {
    if (muted) return;
    if (!ac) { try { build(); } catch (e) { ac = null; return; } }
    if (ac.state === 'suspended') ac.resume();
    if (!on) { on = true; fade(2.2); }
  }
  function setMuted(m) {
    muted = !!m; try { localStorage.setItem('lysMute', muted ? '1' : '0'); } catch (e) {}
    if (!muted) start(); else fade(0.4);
  }
  document.addEventListener('visibilitychange', () => {
    if (!ac || !on) return;
    if (document.hidden) { fade(0.3); setTimeout(() => { if (document.hidden && ac) ac.suspend(); }, 800); }
    else { ac.resume(); fade(1.2); }
  });
  return { start, tick, setMuted, get muted() { return muted; }, get running() { return !!ac && on && !muted; } };
}
