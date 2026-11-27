// 일본어(/ja/)·중국어 번체(/zh/) 정적 페이지 만들기 (2026-11-23)
// 영문 정적 페이지(/en/…)를 실제 브라우저로 일본어·중국어 환경에서 열어, 화면 번역층(zh.js, desc.*.json)이
// 바꿔 준 결과를 그대로 저장한다. 홈페이지 코드는 건드리지 않음 — 방문자가 보는 번역과 똑같은 글이 들어감.
// 사용: node .github/i18n/build.mjs <공개 저장소 폴더>   (playwright 필요)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let pw; try { pw = require("playwright"); } catch (e) { pw = await import("playwright"); }
const { chromium } = pw;

const ROOT = path.resolve(process.argv[2] || ".");
const SITE = "https://leeyunsung.com";
const LANGS = [
  { dir: "ja", locale: "ja-JP", lang: "ja", hreflang: "ja", og: "ja_JP", label: "日本語" },
  { dir: "zh", locale: "zh-TW", lang: "zh-Hant", hreflang: "zh-Hant", og: "zh_TW", label: "中文" }
];
const SKIP = [/^en\/shipping\//, /^en\/text\//, /^en\/about\//];   // 2026-11-28: 작가 소개(about)는 4개 언어로 따로 써 둔 정적 페이지 — 다시 만들지 않음   // 배송 안내·평론 글은 번역이 없어 영어 그대로 둠 (일본어·중국어 페이지 안 만듦)

function walk(dir) { const out = []; for (const f of fs.readdirSync(dir)) { const p = path.join(dir, f); if (fs.statSync(p).isDirectory()) out.push(...walk(p)); else if (f === "index.html") out.push(p); } return out; }
const enPages = walk(path.join(ROOT, "en")).map((p) => path.relative(ROOT, p).split(path.sep).join("/")).filter((p) => !SKIP.some((r) => r.test(p)) && !/http-equiv="refresh"/i.test(fs.readFileSync(path.join(ROOT, p), "utf8").slice(0, 2000))).sort();   // 옛 주소 → 새 주소로 넘기는 페이지는 제외
const urlOf = (rel) => "/" + rel.replace(/index\.html$/, "");                // en/works/torso/index.html -> /en/works/torso/
const sub = (rel) => rel.replace(/^en\//, "");                                  // works/torso/index.html
const enSet = new Set(enPages.map(urlOf));
const ABOUT = ["/about/", "/en/about/", "/ja/about/", "/zh/about/"].filter((u) => fs.existsSync(path.join(ROOT, u, "index.html")));
if (ABOUT.includes("/en/about/")) enSet.add("/en/about/");   // 일·중 페이지 하단 About 링크도 같은 언어로

const MIME = { ".html": "text/html; charset=utf-8", ".json": "application/json", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const server = http.createServer((q, s) => {
  let p = decodeURIComponent(q.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { s.writeHead(404); return s.end(""); }
  // 영상·3D는 번역에 필요 없음: 빈 응답 (이미지는 실제 파일을 줘야 함 — 실패하면 페이지가 srcset을 지워 버림)
  if (/\.(mp4|glb|usdz)$/i.test(f)) { s.writeHead(204); return s.end(); }
  s.writeHead(200, { "content-type": MIME[path.extname(f)] || "application/octet-stream" }); s.end(fs.readFileSync(f));
});
await new Promise((r) => server.listen(0, r));
const BASE = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch();
const report = [];

function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

for (const L of LANGS) {
  const ctx = await browser.newContext({ locale: L.locale, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129 Safari/537.36 i18n-build" });
  await ctx.addInitScript(() => { try { localStorage.setItem("lysNoTrack", "1"); } catch (e) {} });
  // leeyunsung.com 절대주소(이미지 등)는 로컬 파일로 연결, 그 밖의 외부 요청은 차단
  await ctx.route(/^https?:\/\/(www\.)?leeyunsung\.com\//, async (r) => { const res = await r.fetch({ url: BASE + new URL(r.request().url()).pathname }); await r.fulfill({ response: res }); });
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1|(www\.)?leeyunsung\.com\/)/, (r) => r.abort());
  for (const rel of enPages) {
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message));
    await page.goto(BASE + urlOf(rel), { waitUntil: "load" });
    try { await page.waitForFunction(() => { const c = document.documentElement.classList; return !c.contains("zhwait") && (c.contains("zh") || c.contains("xja")); }, null, { timeout: 8000 }); } catch (e) { errs.push("translation layer did not start"); }
    await page.waitForTimeout(900);
    const r = await page.evaluate(({ L, enList }) => {
      const H = document.documentElement;
      // 남은 영어 단어 비율 (본문)
      const main = document.querySelector("main") || document.body;
      const txt = main.innerText || "";
      const en = (txt.match(/[A-Za-z]{3,}/g) || []).length, cjk = (txt.match(/[぀-ヿ一-鿿]/g) || []).length;
      // 첫 문단(설명) — meta description 용
      let first = ""; for (const p of main.querySelectorAll(".detail-desc, .pd-desc, .desc, p")) { const t = ((p.innerText || "").trim().split(/\n/)[0] || "").trim(); if (/[\u3040-\u30ff\u4e00-\u9fff]/.test(t) && t.length > 30) { first = t; break; } }
      return { html: "<!doctype html>\n" + H.outerHTML, en, cjk, first };
    }, { L, enList: [...enSet] });
    await page.close();
    let h = r.html;
    // 번역층·대기 스크립트 제거 (저장된 글은 이미 번역됨)
    h = h.replace(/<script[^>]*src="\/zh\.js[^"]*"[^>]*><\/script>/g, "");
    h = h.replace(/<style>html\.zhwait body\{visibility:hidden\}<\/style>/g, "");
    // 일본어·중국어 메뉴가 한 글자씩 줄바꿈되지 않게
    h = h.replace("</head>", "<style>.site-nav a,.lang-switch a{white-space:nowrap}</style>\n</head>");
    h = h.replace(/<script>\(function\(\)\{document\.documentElement\.setAttribute\("data-lang","en"\);[\s\S]*?<\/script>/, '<script>document.documentElement.setAttribute("data-lang","en");</script>');
    h = h.replace(/<html([^>]*)>/, (m, a) => "<html" + a.replace(/\slang="[^"]*"/, "").replace(/\sclass="([^"]*)"/, (mm, c) => ' class="' + c.split(/\s+/).filter((x) => x && x !== "zhwait").join(" ") + '"') + ' lang="' + L.lang + '">');
    const p0 = urlOf(rel), pk = p0.replace(/^\/en\//, "/"), pl = "/" + L.dir + pk;
    // 사이트 안 링크는 같은 언어로 (언어 버튼보다 먼저: 버튼의 EN 링크는 영어 페이지로 남김)
    h = h.replace(/href="\/en\/([^"#?]*)"/g, (m, q) => enSet.has("/en/" + q) ? 'href="/' + L.dir + "/" + q + '"' : m);
    // 언어 버튼: 네 언어로 가는 링크
    // KO: 한국어 선택 기억(안 하면 외국 브라우저는 한국어 페이지에서 영어로 보임) / EN: 자동 번역 끄기(안 하면 영문 페이지가 다시 일·중으로 번역됨)
    const st = (js) => ' onclick="try{' + js + '}catch(e){}"';
    const sw = '<a href="' + pk + '"' + st("localStorage.setItem('lysLang','ko')") + '>KO</a><i>/</i><a href="' + p0 + '"' + st("localStorage.setItem('lysLang','en');localStorage.setItem('lysJa','0');localStorage.setItem('lysZh','0')") + '>EN</a><i>/</i><a href="/ja' + pk + '"' + (L.dir === "ja" ? ' aria-current="true"' : "") + '>日本語</a><i>/</i><a href="/zh' + pk + '"' + (L.dir === "zh" ? ' aria-current="true"' : "") + ">中文</a>";
    h = h.replace(/(<span class="lang-switch"[^>]*>)[\s\S]*?(<\/span>)/g, "$1" + sw + "$2");
    // 주소·언어 정보
    h = h.replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + SITE + pl + '">');
    h = h.replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="' + SITE + pl + '">');
    h = h.replace(/<meta property="og:locale" content="[^"]*">/, '<meta property="og:locale" content="' + L.og + '">');
    h = h.replace(/<link rel="alternate" hreflang="(ja|zh-Hant)"[^>]*>\n?/g, "");   // 영문 원본에 이미 붙은 것 제거 후 다시 넣음(중복 방지)
    h = h.replace(/(<link rel="alternate" hreflang="x-default"[^>]*>)/, '<link rel="alternate" hreflang="ja" href="' + SITE + "/ja" + pk + '">\n<link rel="alternate" hreflang="zh-Hant" href="' + SITE + "/zh" + pk + '">\n$1');
    h = h.replace(/"inLanguage":"en"/g, '"inLanguage":"' + L.lang + '"');
    if (r.first) { const d = r.first.replace(/\s+/g, " ").slice(0, 150); h = h.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + esc(d) + '">').replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="' + esc(d) + '">'); }
    const out = path.join(ROOT, L.dir, sub(rel));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, h);
    report.push({ lang: L.dir, page: pl, en: r.en, cjk: r.cjk, errs });
  }
  await ctx.close();
}
await browser.close(); server.close();

// 한국어·영어 페이지에 일본어·중국어 짝 표시 추가 (이미 있으면 그대로)
for (const rel of enPages) {
  const pk = urlOf(rel).replace(/^\/en\//, "/");
  for (const f of [path.join(ROOT, rel), path.join(ROOT, sub(rel))]) {
    if (!fs.existsSync(f)) continue;
    let h = fs.readFileSync(f, "utf8");
    if (h.includes('hreflang="ja"')) continue;
    h = h.replace(/(<link rel="alternate" hreflang="x-default"[^>]*>)/, '<link rel="alternate" hreflang="ja" href="' + SITE + "/ja" + pk + '">\n<link rel="alternate" hreflang="zh-Hant" href="' + SITE + "/zh" + pk + '">\n$1');
    fs.writeFileSync(f, h);
  }
}
// 사이트맵에 새 주소 추가
const smf = path.join(ROOT, "sitemap.xml");
let sm = fs.readFileSync(smf, "utf8").replace(/\s*<url><loc>https:\/\/leeyunsung\.com\/(ja|zh)\/[^<]*<\/loc>[^\n]*<\/url>/g, "");
const today = new Date().toISOString().slice(0, 10);
const add = enPages.flatMap((rel) => LANGS.map((L) => "  <url><loc>" + SITE + "/" + L.dir + urlOf(rel).replace(/^\/en\//, "/") + "</loc><lastmod>" + today + "</lastmod><priority>0.6</priority></url>")).join("\n");
sm = sm.replace("</urlset>", add + "\n</urlset>");
// 작가 소개 페이지 4개는 발행 때 사이트맵에서 빠지므로 여기서 다시 넣음
sm = sm.replace(/\s*<url><loc>https:\/\/leeyunsung\.com\/(en\/|ja\/|zh\/)?about\/<\/loc>[^\n]*<\/url>/g, "");
sm = sm.replace("</urlset>", ABOUT.map((u) => "  <url><loc>" + SITE + u + "</loc><lastmod>" + today + "</lastmod><priority>0.8</priority></url>").join("\n") + "\n</urlset>");
fs.writeFileSync(smf, sm);
fs.writeFileSync(path.join(ROOT, ".github/i18n/report.json"), JSON.stringify(report, null, 1));
console.log("pages", report.length, "errors", report.filter((r) => r.errs.length).length);
