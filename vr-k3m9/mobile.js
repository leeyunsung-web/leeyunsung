// HC-UAS hanging mobile (2019 drawings PLAN A01–A07, B01) — all sizes are real (mm in the data, metres in the scene)
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
const COARSE=typeof matchMedia!=='undefined'&&matchMedia('(pointer:coarse)').matches, TH=COARSE?2.0:1; // phones: rods/rings/wire x2 so they stay visible
const MM=0.001, T=d=>Math.tan(d*Math.PI/180), ln=(c,a,x)=>c+x*T(a);
const EYE=[{"o":[[-428.6,-171.4],[-428.6,-172.4],[-408.9,-170.8],[-384.2,-168.0],[-350.8,-163.2],[-313.4,-156.5],[-281.3,-148.6],[-258.1,-140.7],[-224.8,-122.9],[-155.9,-88.6],[-153.4,-88.3],[-151.1,-89.9],[-128.0,-154.9],[-126.7,-160.0],[-128.3,-161.3],[-142.6,-167.0],[-164.1,-176.8],[-193.7,-191.8],[-217.8,-205.4],[-219.1,-205.4],[-233.0,-195.6],[-234.3,-195.3],[-233.7,-197.2],[-225.4,-207.0],[-224.5,-209.2],[-235.9,-216.2],[-236.2,-217.2],[-235.0,-217.2],[-223.5,-211.1],[-222.2,-211.1],[-208.6,-228.0],[-208.3,-229.6],[-226.4,-250.2],[-236.5,-263.8],[-237.5,-266.4],[-236.9,-266.4],[-214.9,-244.5],[-205.4,-235.9],[-203.2,-235.0],[-178.1,-265.7],[-178.4,-267.7],[-190.8,-284.8],[-201.0,-301.0],[-254.6,-283.2],[-255.9,-283.2],[-255.9,-283.8],[-208.0,-314.3],[-208.0,-315.6],[-215.6,-332.4],[-227.0,-361.6],[-227.0,-362.6],[-226.4,-362.6],[-212.7,-347.7],[-165.1,-300.7],[-148.3,-285.8],[-127.6,-270.2],[-100.6,-253.4],[-75.6,-240.7],[-55.6,-232.4],[-39.7,-227.0],[-31.8,-224.8],[-29.8,-224.8],[-28.9,-225.7],[-30.2,-227.6],[-41.3,-233.0],[-57.2,-242.9],[-74.9,-257.2],[-91.8,-274.6],[-99.1,-283.8],[-106.7,-295.0],[-112.7,-305.1],[-119.7,-319.1],[-124.8,-331.5],[-128.9,-343.9],[-132.7,-358.8],[-134.9,-371.2],[-136.5,-385.4],[-136.8,-397.5],[-137.5,-398.8],[-139.1,-400.0],[-185.7,-402.9],[-186.1,-403.9],[-139.1,-407.0],[-137.2,-408.6],[-135.3,-428.6],[-132.4,-444.5],[-125.4,-468.6],[-118.7,-484.8],[-108.6,-503.9],[-96.5,-521.3],[-85.7,-534.0],[-70.8,-548.3],[-59.1,-557.5],[-50.2,-563.6],[-41.6,-568.6],[-24.4,-576.9],[-11.4,-581.7],[2.5,-585.5],[16.5,-588.0],[33.3,-589.6],[34.6,-590.9],[35.6,-596.9],[37.1,-621.3],[35.6,-623.3],[33.7,-623.9],[18.7,-623.3],[18.7,-623.9],[31.4,-626.4],[32.4,-627.4],[37.5,-653.4],[41.0,-653.4],[45.4,-630.9],[46.4,-628.3],[63.5,-628.3],[73.3,-627.7],[88.6,-625.5],[97.5,-623.3],[99.1,-623.3],[99.7,-623.9],[113.7,-653.4],[115.9,-653.4],[113.0,-619.1],[130.5,-611.8],[144.5,-604.2],[146.4,-604.8],[171.8,-627.1],[172.7,-627.1],[172.1,-624.5],[160.3,-597.5],[159.7,-594.7],[173.4,-583.9],[174.0,-582.6],[172.4,-582.9],[157.5,-592.1],[143.5,-599.1],[129.9,-604.8],[114.3,-610.2],[94.3,-615.6],[82.2,-618.2],[60.3,-621.7],[47.3,-622.9],[43.5,-622.9],[41.3,-620.7],[43.2,-592.1],[43.8,-590.9],[46.0,-589.3],[59.4,-588.3],[74.3,-585.8],[86.7,-582.6],[103.5,-576.6],[118.7,-569.3],[125.4,-565.5],[138.7,-556.6],[149.5,-548.0],[162.9,-535.3],[175.6,-520.4],[186.7,-504.2],[195.9,-487.4],[203.5,-469.3],[208.9,-451.8],[213.0,-432.1],[214.6,-419.4],[214.9,-410.8],[215.6,-408.6],[217.5,-407.0],[264.5,-403.9],[264.2,-402.9],[217.5,-400.0],[215.3,-397.8],[214.9,-386.4],[213.7,-374.0],[208.9,-349.9],[204.8,-336.2],[200.3,-324.5],[190.5,-304.2],[178.1,-284.8],[164.8,-268.6],[154.3,-258.1],[141.6,-247.3],[128.3,-238.1],[121.6,-234.3],[121.0,-232.7],[121.9,-231.8],[124.5,-232.1],[137.5,-237.5],[153.7,-245.4],[169.2,-254.3],[184.5,-265.1],[205.7,-281.3],[227.3,-299.1],[277.2,-344.2],[297.2,-359.7],[311.8,-369.9],[336.2,-384.8],[354.6,-394.3],[371.5,-401.6],[389.3,-407.7],[389.3,-406.7],[372.1,-396.9],[357.8,-387.0],[336.6,-369.6],[318.5,-350.8],[305.8,-334.0],[305.8,-332.4],[312.1,-330.2],[348.9,-320.4],[428.6,-297.5],[428.3,-296.5],[413.4,-296.2],[278.8,-296.9],[255.6,-269.6],[256.2,-267.7],[282.6,-243.8],[283.8,-243.8],[311.2,-268.9],[312.7,-269.6],[312.7,-268.6],[286.7,-241.6],[286.7,-240.0],[393.4,-142.9],[393.4,-142.2],[392.1,-142.2],[384.2,-147.0],[259.7,-215.6],[258.1,-215.6],[245.4,-205.1],[226.7,-191.1],[209.6,-179.7],[199.4,-173.7],[198.4,-172.7],[199.1,-170.2],[271.5,-52.1],[271.8,-50.5],[270.2,-51.4],[232.4,-92.1],[168.9,-156.5],[166.4,-156.2],[154.3,-150.5],[135.6,-143.2],[110.2,-135.3],[82.9,-129.2],[54.3,-125.7],[53.0,-123.8],[51.4,-102.9],[42.9,-17.8],[44.1,-16.5],[113.7,0.0],[42.5,0.0],[41.6,-1.9],[41.6,-5.1],[42.9,-7.0],[42.9,-8.9],[42.2,-10.2],[40.0,-11.7],[37.5,-11.4],[35.6,-9.2],[35.6,-6.7],[36.8,-5.1],[36.8,0.0],[27.6,0.0],[27.3,-0.6],[3.2,-5.4],[-22.5,-12.1],[-54.3,-21.0],[-94.0,-33.0],[-155.9,-54.0],[-214.9,-76.5],[-249.2,-91.1],[-278.1,-104.5],[-303.5,-117.2],[-342.3,-138.1],[-363.5,-148.3],[-394.7,-160.3]],"h":[[[179.1,-203.2],[191.1,-183.2],[193.0,-181.0],[193.7,-181.0],[208.3,-189.2],[231.8,-204.2],[251.5,-218.4],[251.5,-219.7],[225.7,-234.3],[222.2,-235.6],[205.4,-221.9],[191.8,-212.4],[180.0,-205.1],[179.1,-204.2]],[[-119.4,-179.7],[-110.8,-203.2],[-110.2,-206.4],[-123.2,-215.3],[-137.8,-226.4],[-148.9,-235.9],[-159.4,-246.1],[-190.8,-224.8],[-189.5,-222.9],[-178.8,-214.6],[-155.6,-198.8],[-141.0,-189.9],[-121.3,-179.1],[-120.0,-179.1]],[[-148.3,-178.8],[-149.2,-180.7],[-164.1,-190.8],[-181.6,-204.5],[-198.1,-219.4],[-199.4,-219.1],[-215.3,-208.0],[-214.9,-207.0],[-151.4,-178.1],[-149.2,-177.8]],[[38.7,-167.0],[39.7,-167.0],[40.6,-168.0],[47.0,-249.2],[54.6,-324.5],[60.3,-362.9],[62.9,-374.0],[64.8,-377.2],[68.9,-380.0],[74.6,-382.0],[85.7,-384.8],[103.8,-388.0],[153.7,-394.0],[212.7,-398.8],[214.3,-400.4],[214.3,-406.4],[212.7,-408.3],[157.5,-412.8],[101.9,-419.4],[77.2,-424.5],[68.6,-427.4],[64.5,-430.2],[62.9,-433.7],[60.6,-442.3],[56.5,-467.7],[49.8,-527.7],[45.1,-584.2],[44.4,-587.4],[43.2,-588.3],[35.2,-588.3],[34.0,-587.4],[33.3,-585.5],[29.2,-534.7],[23.2,-478.2],[18.4,-445.5],[16.5,-437.5],[13.7,-429.9],[9.5,-427.4],[0.3,-424.2],[-24.1,-419.4],[-49.5,-415.9],[-79.4,-412.8],[-132.7,-408.6],[-134.9,-408.0],[-135.9,-406.7],[-135.9,-400.4],[-134.3,-398.8],[-85.4,-395.0],[-34.0,-389.3],[-14.0,-386.1],[0.6,-382.9],[9.2,-380.0],[14.0,-376.9],[15.9,-372.1],[18.4,-361.0],[23.2,-328.6],[30.8,-255.0],[37.5,-169.2]],[[23.8,-138.7],[21.6,-160.3],[20.3,-161.6],[12.4,-162.2],[-3.2,-164.8],[-16.5,-167.6],[-34.3,-172.4],[-56.8,-180.0],[-80.6,-190.5],[-81.6,-190.5],[-82.6,-189.5],[-95.9,-168.6],[-95.6,-167.3],[-68.3,-156.5],[-53.3,-151.8],[-31.8,-146.0],[-13.7,-142.2],[6.4,-139.1],[22.5,-137.5]],[[54.6,-137.5],[55.6,-136.5],[58.7,-136.5],[73.0,-138.1],[92.4,-141.6],[104.5,-144.5],[119.1,-148.6],[141.9,-156.5],[158.1,-163.2],[159.7,-164.5],[159.7,-165.4],[141.3,-183.8],[140.0,-183.8],[121.9,-176.2],[94.6,-167.3],[75.9,-163.2],[57.8,-161.0],[56.5,-159.4]],[[35.2,-20.3],[25.4,-124.1],[24.4,-125.1],[-4.4,-127.0],[-35.9,-132.1],[-73.7,-141.9],[-104.5,-152.1],[-106.4,-152.1],[-147.3,-88.3],[-147.3,-85.7],[-145.4,-83.8],[-98.7,-63.5],[-58.4,-47.6],[-39.1,-40.6],[2.5,-27.3],[33.3,-19.0],[34.6,-19.4]]]}];
function simple(c,a,L,R){return{segs:[[L.x,ln(c,a,L.x),R.x,ln(c,a,R.x)]],
  orns:[...(L.t?[{t:L.t,r:L.r,x:L.x,y:ln(c,a,L.x)}]:[]),...(R.t?[{t:R.t,r:R.r,x:R.x,y:ln(c,a,R.x)}]:[])],
  balls:[...(L.ball?[{x:L.x,y:ln(c,a,L.x)}]:[]),...(R.ball?[{x:R.x,y:ln(c,a,R.x)}]:[])]};}
const PARTS={
  A01:simple(43,19,{x:-153,t:'s',r:18},{x:270,t:'x',r:46}),
  A02:simple(51,-28,{x:-612,t:'s',r:16},{x:105,t:'s',r:16}),
  A03:simple(73,-15,{x:-405,t:'x',r:46},{x:181,t:'s',r:16}),
  A04:simple(40,17,{x:-270,t:'x',r:46},{x:459,t:'s',r:30}),
  A05:{segs:[[-558,ln(19,16,-558),404,ln(19,16,404)],[404,ln(19,16,404),746,316],[404,ln(19,16,404),600,95]],
    orns:[{t:'s',r:18,x:-558,y:ln(19,16,-558)},{t:'x',r:46,x:746,y:316},{t:'s',r:18,x:600,y:95},{t:'x',r:45,x:0,y:45}],balls:[{x:404,y:ln(19,16,404)}],
    rings:[{x:404,y:ln(19,16,404),r:88},{x:404+(88+24)*Math.cos(-0.7),y:ln(19,16,404)+(88+24)*Math.sin(-0.7),r:24}]},
  A03b:{segs:[[-225,46,261,104],[-225,46,-671,-62],[-225,46,-476,205]],
    orns:[{t:'s',r:24,x:261,y:104},{t:'s',r:18,x:-671,y:-62},{t:'x',r:46,x:-476,y:205},{t:'s',r:18,x:0,y:45}],balls:[{x:-225,y:46}],
    rings:[{x:-225+10,y:46,r:64},{x:-225+10+(64+20)*Math.cos(3.0),y:46+(64+20)*Math.sin(3.0),r:20}]},
  A06:simple(53,9,{x:-225,t:'s',r:24},{x:314,ball:true}),
  A07:simple(54,20,{x:-225,t:'x',r:46},{x:212,t:'s',r:15}),
};
function star5(r){const s=new THREE.Shape(),ri=r*.42;for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,rr=i%2?ri:r;i?s.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):s.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);}return s;}
function cross4(r){const s=new THREE.Shape(),k=r*.11;s.moveTo(0,r);for(let i=0;i<4;i++){const a1=Math.PI/2-i*Math.PI/2,a2=a1-Math.PI/2,am=(a1+a2)/2;s.quadraticCurveTo(Math.cos(am)*k,Math.sin(am)*k,Math.cos(a2)*r,Math.sin(a2)*r);}return s;}
const flat=g=>{g=g.index?g.toNonIndexed():g; for(const k of Object.keys(g.attributes)) if(!['position','normal'].includes(k)) g.deleteAttribute(k); return g;};
function partGeo(def){
  const gs=[]; const up=new THREE.Vector3(0,1,0);
  const pipe=new THREE.CylinderGeometry(4.8*MM,4.8*MM,90*MM,14); pipe.translate(0,45*MM,0); gs.push(pipe);
  for(const [x1,y1,x2,y2] of def.segs){const a=new THREE.Vector3(x1*MM,y1*MM,0),b=new THREE.Vector3(x2*MM,y2*MM,0),len=a.distanceTo(b);
    const g=new THREE.CylinderGeometry(3*TH*MM,3*TH*MM,len,10); const m=new THREE.Matrix4().compose(a.clone().lerp(b,.5),new THREE.Quaternion().setFromUnitVectors(up,b.clone().sub(a).normalize()),new THREE.Vector3(1,1,1)); g.applyMatrix4(m); gs.push(g);}
  for(const o of def.orns){const g=new THREE.ExtrudeGeometry(o.t==='x'?cross4(o.r):star5(o.r),{depth:2,bevelEnabled:false,curveSegments:10});
    const onPipe=Math.abs(o.x)<1; const z0=(onPipe?4.8:3)*TH+0.1;  // back face rests on the rod or pipe
    if(o.t==='s') g.rotateZ((o.x*0.37%1)*.6); g.translate(0,0,z0); g.scale(MM,MM,MM); g.translate(o.x*MM,o.y*MM,0); gs.push(g);}
  for(const b of def.balls){const g=new THREE.SphereGeometry(21.5*MM,28,18); g.translate(b.x*MM,b.y*MM,0); gs.push(g);}
  for(const r of def.rings||[]){const g=new THREE.TorusGeometry(r.r*MM,1.2*TH*MM,6,48); g.translate(r.x*MM,r.y*MM,0); gs.push(g);} // thin wire rings beside the balls
  return mergeGeometries(gs.map(flat));
}
// crescent at the upper-right spike (2019 photos; not on PLAN B01) — plate mm: centre x,y, outer radius r, widest band t, turn rot (deg), flip
export const MOON_DEFAULT={x:398.0,y:-270.2,r:26,t:6,rot:140,flip:false}; // set by 윤성 against the 2019 photos (2026-11-04)
export function moonPts(m){m={...MOON_DEFAULT,...(m||{})}; const R=m.r, c=Math.max(0.5,Math.min(m.t,R*1.6)), r=R*0.97;
  const ix=(R*R-r*r+c*c)/(2*c), iy=Math.sqrt(Math.max(0,R*R-ix*ix)), a=Math.atan2(iy,ix), b=Math.atan2(iy,ix-c), pts=[];
  for(let i=0;i<=36;i++){const t=a+i/36*(2*Math.PI-2*a); pts.push([R*Math.cos(t),R*Math.sin(t)]);}           // outer arc through the back
  for(let i=1;i<36;i++){const t=(2*Math.PI-b)-i/36*(2*Math.PI-2*b); pts.push([c+r*Math.cos(t),r*Math.sin(t)]);} // inner arc back to the top horn
  const q=m.rot*Math.PI/180, cs=Math.cos(q), sn=Math.sin(q), fx=m.flip?-1:1;
  return pts.map(([x,y])=>{y*=fx; return [m.x+x*cs-y*sn, m.y+x*sn+y*cs];});}
function moonShape(m){return new THREE.Shape(moonPts(m).map(([x,y])=>new THREE.Vector2(x,y)));}
export const EYE_OUTLINE=()=>EYE[0];
function eyeGeo(top,bot,mo){
  const sh=EYE[0], ctr=h=>h.reduce((a,p)=>[a[0]+p[0]/h.length,a[1]+p[1]/h.length],[0,0]);
  const star=sh.h.reduce((a,b)=>b.length>a.length?b:a), tip=star.reduce((a,p)=>p[1]>a[1]?p:a), ax=tip[0];
  const topY=Math.max(...sh.o.filter(p=>Math.abs(p[0]-ax)<20).map(p=>p[1])), hang={x:ax,y:topY-9};
  const shape=new THREE.Shape(sh.o.map(p=>new THREE.Vector2(p[0],p[1])));
  const hh=new THREE.Path(); hh.absarc(hang.x,hang.y,3.25,0,Math.PI*2,true); shape.holes.push(hh); // 6.5Ø
  for(const h of sh.h) shape.holes.push(new THREE.Path(h.map(p=>new THREE.Vector2(p[0],p[1]))));
  const moon=moonShape(mo);
  const g=new THREE.ExtrudeGeometry([shape,moon],{depth:2.4,bevelEnabled:false}); // 1.2T × 2 sheets
  g.translate(-hang.x,-hang.y,-1.2); g.scale(MM,MM,MM); g.computeBoundingBox();
  const y0=g.boundingBox.min.y,y1=g.boundingBox.max.y,p=g.attributes.position,col=new Float32Array(p.count*3),c=new THREE.Color();
  c.copy(top); for(let i=0;i<p.count;i++) col.set([c.r,c.g,c.b],i*3); // gold mirror stainless all over
  g.setAttribute('color',new THREE.BufferAttribute(col,3)); g.userData.h=y1-y0; return g;
}
// order and turn of each tier read from the installation image (IMG 01)
// 2019 UARTSPACE photos (the final state): upper stack, bottom to top — [part, pipe bottom above the eye top (m), turn]
const TOP=[['A05',.035,.2],['A04',.16,.55],['A02',.27,2.55],['A03b',.45,.3],['A03',.61,-.6],['A01',.78,.4]];
// under the eye: the ball rod, then the diagonal rod (seen from the back in the photos, so turned half round)
const BOT=[['A06',.3],['A07',2.8]];
export function buildMobile({env,ceiling,eyeBottom=1.5,moon}){
  const gold=new THREE.MeshStandardMaterial({color:new THREE.Color('#d8c470'),metalness:1,roughness:.05,envMap:env,envMapIntensity:1.2});
  const plate=new THREE.MeshStandardMaterial({color:new THREE.Color('#d8c470'),vertexColors:true,metalness:1,roughness:.03,envMap:env,envMapIntensity:1.25,side:THREE.DoubleSide});
  const wireM=new THREE.MeshStandardMaterial({color:0xd4d6d8,metalness:1,roughness:.08,envMap:env});
  const grp=new THREE.Group(), nodes=[], P=130*MM;
  const eg=eyeGeo(new THREE.Color('#ffffff'),new THREE.Color('#ffffff'),moon), eyeH=eg.userData.h;
  const eye=new THREE.Group(); eye.add(new THREE.Mesh(eg,plate));
  const ring=new THREE.Mesh(new THREE.TorusGeometry(9*MM,1.6*MM,8,24),wireM); ring.position.y=16*MM; ring.rotation.y=Math.PI/2; eye.add(ring);
  let wireBot=0;
  function layout(eb){
    const eyeTop=eb+eyeH; let y=eyeTop+60*MM;
    nodes.forEach(n=>{ if(n.userData.tier==='top'){n.position.y=eyeTop+n.userData.h;} else if(n.userData.tier==='bot'){n.position.y=eb-140*MM-n.userData.i*90*MM;} }); // lower pipes stacked end to end
    eye.position.y=eyeTop;
    const topPipe=eyeTop+TOP[TOP.length-1][1]+90*MM;              // top of the highest pipe
    wire.scale.y=ceiling-topPipe; wire.position.y=(ceiling+topPipe)/2;  // ceiling wire stops at the top of the mobile
    const upBot=eyeTop+34*MM, upTop=topPipe;                           // one continuous brass axis, same thickness as the pipes (no gaps)
    upRod.scale.y=upTop-upBot; upRod.position.y=(upTop+upBot)/2;
    clip.position.y=eyeTop+24*MM;                                     // carabiner into the 6.5 mm hole
    l1.position.y=eb-8*MM; l2.position.y=eb-26*MM;                    // two links from the 10 mm hole
    const loTop=eb-34*MM; wireBot=eb-140*MM-(BOT.length-1)*90*MM;
    const loBot=wireBot; loRod.scale.y=loTop-loBot; loRod.position.y=(loTop+loBot)/2;
  }
  const geoCache={};
  TOP.forEach(([k,h,yaw],i)=>{const m=new THREE.Mesh(geoCache[k]||=partGeo(PARTS[k]),gold); m.userData={tier:'top',i,h,yaw,ph:i*1.7}; nodes.push(m);});
  nodes.push(Object.assign(eye,{userData:{tier:'eye',yaw:0,ph:.4}}));
  BOT.forEach(([k,yaw],i)=>{const m=new THREE.Mesh(geoCache[k]||=partGeo(PARTS[k]),gold); m.userData={tier:'bot',i,yaw,ph:5+i*2.3}; nodes.push(m);});
  const wire=new THREE.Mesh(new THREE.CylinderGeometry(TH*MM,TH*MM,1,6),wireM);
  const unit=new THREE.CylinderGeometry(4.8*MM,4.8*MM,1,14); const upRod=new THREE.Mesh(unit,gold), loRod=new THREE.Mesh(unit,gold);
  const link=()=>{const m=new THREE.Mesh(new THREE.TorusGeometry(7*MM,1.4*MM,8,20),gold); m.scale.set(1,1.5,1); return m;};
  const clip=link(), l1=link(), l2=link(); l2.rotation.y=Math.PI/2;
  grp.add(upRod,loRod,clip,l1,l2);
  nodes.forEach(n=>grp.add(n)); grp.add(wire); layout(eyeBottom);
  return { group:grp, setHeight:layout, lowest:()=>wireBot,
    // each tier faces its own way round the circle (golden-angle spread, so no two line up and the whole reads round, not flat),
    // and turns slowly on its own: some one way, some the other, at slightly different speeds, with a small sway on top
    update(t){ nodes.forEach((n,i)=>{const u=n.userData, base=u.yaw+i*2.39996, dir=i%2?-1:1, sp=.035+((i*37)%5)*.008; n.rotation.y=base+dir*sp*t+Math.sin(t*(.08+i*.013)+u.ph)*.18;}); } };
}
