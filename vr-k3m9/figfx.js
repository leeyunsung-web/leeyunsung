// Figure effects and walk details shared by the figure page (figure-edit.html) and the gallery (index.html), so both look the same.
// 2026-11-07: aura around the outline, rainbow sheen at the edges, rainbow inside; finer walk (hips, stride, counter-turn of the chest, bounce, steady head)

export const FX_DEF = { aura:0, auraSize:1, auraHue:-1, rain:0, inner:0, rainScale:1, rainSpeed:0,
  stride:1, hipSway:0, hipTwist:0, chestTwist:0, bob:0, headSteady:0, shoulderBob:0 };

// rows for the figure page (menu order): [key, label, min, max, step]
export const FX_ROWS = [
  ['몸 효과', [['aura','아우라 (윤곽 빛)',0,1.5,0.01],['auraSize','아우라 크기',0.3,3,0.01],['auraHue','아우라 색 (-1 무지개)',-1,1,0.01],
    ['rain','무지개 테두리',0,1,0.01],['inner','안쪽 무지개',0,1,0.01],['rainScale','무지개 촘촘함',0.3,4,0.01],['rainSpeed','무지개 흐름 속도 (0 멈춤)',0,2,0.01]]],
  ['걸음 세부', [['stride','보폭',0.6,1.5,0.01],['hipSway','골반 좌우 기울기',-1,1,0.01],['hipTwist','골반 돌림',-1,1,0.01],
    ['chestTwist','상체 반대 돌림',-1,1,0.01],['bob','몸 위아래 출렁임',0,1,0.01],['shoulderBob','어깨 오르내림',-1,1,0.01],['headSteady','머리 흔들림 줄이기',0,1,0.01]]],
];

// walk details, added on top of the walk motion each frame. get(name) returns a bone by its short name ('Hips', 'LeftUpLeg'...).
// The phase comes from the legs themselves (left thigh forward vs right thigh), so it always matches the motion clip.
function axisQ(ax, ay, az, a){ const s = Math.sin(a/2); return { x:ax*s, y:ay*s, z:az*s, w:Math.cos(a/2) }; }
function mulRight(q, r){ // q = q * r (local rotation), on a THREE.Quaternion
  const x=q.x,y=q.y,z=q.z,w=q.w; q.set(w*r.x+x*r.w+y*r.z-z*r.y, w*r.y-x*r.z+y*r.w+z*r.x, w*r.z+x*r.y-y*r.x+z*r.w, w*r.w-x*r.x-y*r.y-z*r.z); }
function pitch(q){ return Math.atan2(2*(q.w*q.x+q.y*q.z), 1-2*(q.x*q.x+q.y*q.y)); } // rotation about the bone's own X (forward/back swing)
export function walkDetail(get, w, L, unit){
  if(!L || w <= 0.001) return;
  const lu=get('LeftUpLeg'), ru=get('RightUpLeg'), hips=get('Hips'); if(!lu||!ru||!hips) return;
  const sw = pitch(lu.quaternion) - pitch(ru.quaternion), s = Math.max(-1, Math.min(1, sw/0.7)) * w; // -1..1 through the step
  const st = (L.stride ?? 1) - 1;
  if(Math.abs(st) > 0.001){ for(const b of [lu,ru]){ const p = pitch(b.quaternion); mulRight(b.quaternion, axisQ(1,0,0, p*st*w)); } }
  if(L.hipSway) mulRight(hips.quaternion, axisQ(0,0,1, L.hipSway*0.09*s));
  if(L.hipTwist) mulRight(hips.quaternion, axisQ(0,1,0, L.hipTwist*0.12*s));
  const ch = get('Spine1'); if(ch && L.chestTwist) mulRight(ch.quaternion, axisQ(0,1,0, -L.chestTwist*0.14*s));
  if(L.bob) hips.position.y += L.bob * 2.2 * (unit||1) * (1-Math.abs(s)) * w;
  if(L.shoulderBob){ const ls=get('LeftShoulder'), rs=get('RightShoulder'); if(ls) mulRight(ls.quaternion, axisQ(0,0,1, L.shoulderBob*0.06*s)); if(rs) mulRight(rs.quaternion, axisQ(0,0,1, L.shoulderBob*0.06*s)); }
  const hd = get('Head'); if(hd && L.headSteady) mulRight(hd.quaternion, axisQ(0,1,0, L.headSteady*((L.chestTwist||0)*0.14 - (L.hipTwist||0)*0.12)*s*0.8));
}

// colour effects, run where the blurred figure layer is laid over the room. t = the figure layer (premultiplied).
export const FX_GLSL = `
uniform float uAura,uAuraSize,uAuraHue,uRain,uInner,uRainScale,uTime; uniform vec2 uRes;
vec3 fxHue(float h){ return clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.); }
vec4 fxApply(sampler2D t, vec2 uv, vec4 s){
  float a=s.a; vec3 c=a>1e-4?s.rgb/a:vec3(0.);
  float h=fract((uv.y*1.3+uv.x*0.4)*uRainScale+uTime);
  vec3 rb=fxHue(h);
  if(uRain>0.){ float edge=clamp(a*(1.-a)*4.,0.,1.); c=mix(c,rb,uRain*edge); }
  if(uInner>0.){ c=mix(c,mix(c,rb,0.65),uInner*smoothstep(0.35,0.95,a)); }
  vec4 o=vec4(c*a,a);
  if(uAura>0.){ float r=0.; vec2 px=uAuraSize*7./uRes;
    for(int i=0;i<12;i++){ float ang=float(i)*0.5236; r+=texture2D(t,uv+vec2(cos(ang),sin(ang))*px).a; r+=texture2D(t,uv+vec2(cos(ang+0.26),sin(ang+0.26))*px*2.).a*0.6; }
    r/=19.2; float g=clamp((r-a*0.9)*uAura*1.6,0.,1.);
    vec3 gc=uAuraHue<0.?rb:mix(vec3(1.),fxHue(uAuraHue),0.8);
    o.rgb+=gc*g*(1.-o.a); o.a+=g*(1.-o.a); }
  return o; }`;
export function fxUniforms(V2){ return { uAura:{value:0}, uAuraSize:{value:1}, uAuraHue:{value:-1}, uRain:{value:0}, uInner:{value:0}, uRainScale:{value:1}, uTime:{value:0}, uRes:{value:new V2(1,1)} }; }
export function fxSet(U, L, w, h, time){ L=L||{}; U.uAura.value=L.aura||0; U.uAuraSize.value=L.auraSize??1; U.uAuraHue.value=L.auraHue??-1; U.uRain.value=L.rain||0; U.uInner.value=L.inner||0;
  U.uRainScale.value=L.rainScale??1; U.uTime.value=(L.rainSpeed||0)*time*0.1; U.uRes.value.x=w; U.uRes.value.y=h; }
export function fxAnimated(L){ return !!(L && L.rainSpeed>0 && (L.rain>0||L.inner>0||(L.aura>0&&(L.auraHue??-1)<0))); }
