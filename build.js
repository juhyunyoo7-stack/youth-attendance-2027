// 빌드: src/app.html 하나로 세 가지 산출물을 만든다
//  docs/index.html   — 설치형 앱(PWA), GitHub Pages로 배포
//  shared/index.html — 교사 공유판(claude.ai 아티팩트, 공유 DB)
//  ../청소년부_출석부_2027.html — 파일로 바로 여는 단독판
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'src/app.html'), 'utf8');
const local = src.replace("'__MODE__'", "'local'");
const shared = src.replace("'__MODE__'", "'shared'");
const head = (pwa) => `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#f3f5f9" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0c1020" media="(prefers-color-scheme: dark)">
<meta name="description" content="청소년부 2027년 주일 출석부 — 출석체크, 연간 출석부, 심방 관리">
${pwa ? `<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png" type="image/png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="출석부">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
` : ''}</head>
<body>
`;
const tail = `
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'docs/index.html'), head(true) + local + tail);
fs.writeFileSync(path.join(__dirname, 'shared/index.html'), shared);
fs.writeFileSync(path.join(__dirname, '..', '청소년부_출석부_2027.html'), head(false) + local + tail);
console.log('built', src.length, 'bytes of source');
