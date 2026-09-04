import { CONTACT, copy } from './content.js';
import { scenes } from './scenes.js';
export const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const multiline = (value) => escape(value).replaceAll('\n', '<br>');
const arrow = '<span aria-hidden="true">↗</span>';
const paths = {
  heart:
    '<path d="M24 38S6 27 6 16a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 11-18 22-18 22Z"/><path d="m14 23 7 6 14-14"/>',
  spark: '<path d="m24 5 4 12 13 3-11 8 1 14-11-9-13 5 5-13-8-10 14 1Z"/>',
  cards:
    '<rect x="8" y="6" width="26" height="34" rx="4" transform="rotate(-12 21 23)"/><path d="M37 12h4v30H16v-2M16 30l5-15 6 15m-9-6h7"/>',
  people:
    '<circle cx="17" cy="14" r="7"/><circle cx="35" cy="17" r="5"/><path d="M4 40v-6a13 13 0 0 1 26 0v6H4Zm26-13a10 10 0 0 1 15 9v4H30"/>',
};
const icon = (name) =>
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${paths[name]}</svg>`;
const brand = (c) =>
  `<span class="brand-icon" aria-hidden="true">${c.lang === 'ru' ? 'Б' : 'L'}<i></i></span><span>${c.name}<span class="brand-dots" aria-hidden="true">…</span></span>`;
export function render(locale) {
  const c = copy[locale];
  const prefix = locale === 'en' ? '../' : './';
  const pic = scenes[locale][0];
  const asset = (file) => `${prefix}assets/${file}`;
  const canonical = `https://polyakovin.github.io/letter-search/${locale === 'en' ? 'en/' : ''}`;
  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${c.title}</title><meta name="description" content="${c.description}">
<meta name="theme-color" content="#f8f5ee"><meta property="og:type" content="website"><meta property="og:title" content="${c.title}"><meta property="og:description" content="${c.description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://polyakovin.github.io/letter-search/assets/${pic.image}"><meta property="og:locale" content="${locale === 'ru' ? 'ru_RU' : 'en_US'}">
<link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="ru" href="https://polyakovin.github.io/letter-search/"><link rel="alternate" hreflang="en" href="https://polyakovin.github.io/letter-search/en/"><link rel="alternate" hreflang="x-default" href="https://polyakovin.github.io/letter-search/">
<link rel="icon" type="image/svg+xml" href="${asset('favicon.svg')}"><link rel="stylesheet" href="${asset('style.css')}"><script type="module" src="${asset('app.js')}"></script>
</head>
<body data-locale="${locale}">
<a class="skip" href="#main">${c.skip}</a>
<header class="header wrap">
<a class="brand" href="${locale === 'en' ? `${prefix}en/` : prefix}" aria-label="${c.name}">${brand(c)}</a>
<nav class="nav" aria-label="${locale === 'ru' ? 'Основная навигация' : 'Main navigation'}"><a href="#how">${c.nav[0]}</a><a href="#demo">${c.nav[1]}</a><a href="#together">${c.nav[2]}</a></nav>
<div class="header-actions"><div class="languages" aria-label="${c.language}"><a href="${prefix}" lang="ru" ${locale === 'ru' ? 'aria-current="page"' : ''} title="${c.localeNotice}">RU</a><a href="${prefix}en/" lang="en" ${locale === 'en' ? 'aria-current="page"' : ''} title="${c.localeNotice}">EN</a></div><a class="button button-small outline" href="#custom">${c.customNav} ${arrow}</a></div>
</header>
<main id="main">
<section class="hero wrap" aria-labelledby="hero-title">
<div class="hero-copy"><p class="eyebrow"><span class="small-star" aria-hidden="true">✳</span>${c.eyebrow}</p><h1 id="hero-title">${c.hero1}<br><em>${c.hero2}</em></h1><p class="intro">${c.intro}</p><div class="hero-actions"><a href="#demo" class="button primary">${c.play}<span aria-hidden="true">→</span></a><a class="text-link" href="#how">${c.howLink} <span aria-hidden="true">↘</span></a></div><p class="fine hero-note">${c.heroNote}</p></div>
<div class="hero-art"><div class="art-offset" aria-hidden="true"></div><figure class="hero-picture"><a class="picture-link" data-viewer="studio" href="${asset(pic.image)}" aria-label="${c.enlarge}: ${pic.title}"><img src="${asset(pic.image)}" alt="${pic.alt}" width="1280" height="955" fetchpriority="high"><span class="picture-open" aria-hidden="true">⤢</span></a><figcaption><span>${c.heroCaption}</span><span class="caption-letter">${c.heroLetter}</span></figcaption></figure><div class="sticker" aria-hidden="true">${multiline(c.sticker)}<span>↙</span></div><span class="letter-tile" aria-hidden="true">${pic.letter}<small>1</small></span><svg class="hero-scribble" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M42 7 35 27M65 23 46 36M71 48 49 46M21 17 24 32"/></svg></div>
</section>
<div class="ribbon"><div class="wrap ribbon-inner">${c.ribbon.map((t, i) => `<span>${t}</span>${i < 3 ? '<i aria-hidden="true">✳</i>' : ''}`).join('')}</div></div>
<section class="how wrap section" id="how"><p class="eyebrow">01 — ${c.howEyebrow}</p><h2>${c.howTitle}</h2><p class="section-intro">${c.howIntro}</p><div class="steps">${c.steps.map(([title, text], i) => `<article class="step"><div class="step-number"><span>0${i + 1}</span><span class="step-symbol" aria-hidden="true">${['◎', locale === 'ru' ? 'А а' : 'A a', '02:00'][i]}</span></div><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>
<section class="demo-section section" id="demo"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">02 — ${c.demoEyebrow}</p><h2>${c.demoTitle}</h2></div><p class="section-intro">${c.demoIntro}</p></div>
<noscript><p class="notice">${c.noJs}</p></noscript>
<div class="game" aria-label="${c.demoLabel}"><div class="game-top"><div class="scene-tabs" role="group" aria-label="${c.selectScene}">${c.sceneCount.map((title, i) => `<button type="button" class="scene-tab" data-scene="${i}" aria-pressed="${i === 0}" disabled>${title}</button>`).join('')}</div><span class="game-category">${locale === 'ru' ? 'БЕСПЛАТНОЕ ДЕМО' : 'FREE DEMO'} <span aria-hidden="true">↙</span></span></div>
<div class="game-body"><div class="game-visual"><div class="picture-wrap"><a id="game-image-link" class="picture-link" data-viewer="game" href="${asset(pic.image)}" aria-label="${c.enlarge}: ${pic.title}"><img id="game-image" src="${asset(pic.image)}" alt="${pic.alt}" width="1280" height="955" loading="lazy"></a><button id="enlarge" class="enlarge" type="button" aria-label="${c.enlarge}" disabled><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6"/></svg><span>${c.enlarge}</span></button></div><div class="image-caption"><span id="scene-title">${pic.title}</span><span aria-hidden="true">✳</span><span>${locale === 'ru' ? 'Смотрите внимательнее' : 'Look a little closer'}</span></div></div>
<div class="game-panel"><div class="game-stats"><div class="target"><span id="target-letter">${pic.letter}</span><span>${c.letterLabel}</span></div><div class="timer"><span class="fine">${c.timerLabel}</span><time id="timer" aria-label="${c.timerLabel}">02:00</time></div></div>
<div id="ready-panel"><h3>${c.readyTitle}</h3><p>${c.readyText}</p><button type="button" id="start" class="button primary full" disabled>${c.start}<span aria-hidden="true">→</span></button></div>
<div id="running-panel" hidden><h3>${c.runningTitle}</h3><p>${c.runningText}</p><form id="word-form"><label for="word-input" class="fine">${c.inputLabel}</label><div class="input-row"><input id="word-input" name="words" type="text" placeholder="${c.placeholder}" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="240" enterkeyhint="send"><button type="submit" class="add-word" aria-label="${c.add}">↵</button></div></form><button id="finish" class="finish text-link" type="button">${c.finish}<span aria-hidden="true">↗</span></button></div>
<div id="result-panel" hidden><span class="result-kicker">${locale === 'ru' ? 'РАУНД ЗАВЕРШЁН' : 'ROUND COMPLETE'}</span><h3 id="result-heading">${c.resultTitle}</h3><p>${c.resultText}</p><button type="button" id="replay" class="button primary full">${c.replay}<span aria-hidden="true">↻</span></button><button type="button" id="next" class="button outline full">${c.next}<span aria-hidden="true">→</span></button></div>
<p id="image-status" class="fine" role="status">${c.loading}</p><button id="reload" class="text-link" type="button" hidden>${c.reload}</button><div id="feedback" class="feedback" role="status" aria-live="polite" aria-atomic="true"></div><div class="found"><div class="found-heading"><span>${c.score}</span><strong id="score">0</strong></div><ul id="found-words" class="word-chips" aria-label="${c.inputLabel}"></ul><p id="empty-words" class="fine">${c.noWords}</p></div>
</div></div><div class="game-bottom"><span aria-hidden="true">ⓘ</span><p>${c.demoNote}</p></div><div id="answers" class="answers" hidden><h3>${c.answersTitle}</h3><ul id="answer-list" class="word-chips"></ul></div></div>
<p id="round-notice" class="round-notice fine" role="status">${c.localeNotice}</p>
<noscript><figure class="nojs-second"><a href="${asset(scenes[locale][1].image)}"><img src="${asset(scenes[locale][1].image)}" alt="${scenes[locale][1].alt}" loading="lazy"></a><figcaption>${scenes[locale][1].title} · ${scenes[locale][1].letter}</figcaption></figure></noscript>
</div></section>
<section class="together wrap section" id="together"><div class="section-heading"><div><p class="eyebrow">03 — ${c.socialEyebrow}</p><h2>${multiline(c.socialTitle)}</h2></div><p class="section-intro">${c.socialIntro}</p></div><div class="cases">${c.cases.map((item) => `<article class="case"><div class="case-icon">${icon(item.icon)}</div><h3>${item.title}</h3><p>${item.text}</p><span class="case-tag">${item.tag}</span></article>`).join('')}</div><aside class="group-note"><span class="group-mark" aria-hidden="true">↳</span><strong>${c.groupNote}</strong><p>${c.groupText}</p></aside></section>
<section class="custom-section section" id="custom"><div class="wrap custom-grid"><div class="custom-art"><figure><a class="picture-link" data-viewer="custom" href="${asset('6b06919d-8891-45b4-80e6-f37995adb02c.jpg')}" aria-label="${c.enlarge}: ${locale === 'ru' ? 'Гугарк' : 'Gugark'}"><img src="${asset('6b06919d-8891-45b4-80e6-f37995adb02c.jpg')}" alt="${locale === 'ru' ? 'Персональная иллюстрация «Гугарк»: знакомый дом и двор с питомцами в фантастическом подводном мире.' : 'Personalized Gugark illustration: a house, garden and pets reimagined as a playful underwater world.'}" width="1200" height="896" loading="lazy"><span class="picture-open" aria-hidden="true">⤢</span></a><figcaption>${c.customCaption}</figcaption></figure><div class="custom-sticker" aria-hidden="true">${multiline(c.customBadge)}<span>✷</span></div></div><div class="custom-copy"><p class="eyebrow">04 — ${c.customEyebrow}</p><h2>${multiline(c.customTitle)}</h2><p class="section-intro">${c.customText}</p><ul class="custom-points">${c.customPoints.map((t) => `<li><span aria-hidden="true">✳</span>${t}</li>`).join('')}</ul><a href="${CONTACT}" class="button primary" target="_blank" rel="noopener noreferrer">${c.contact}${arrow}</a><p class="fine contact-note">${c.contactNote}</p></div></div></section>
<section class="faq wrap section"><h2>${c.faqTitle}</h2><div>${c.faqs.map(([q, a]) => `<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></section>
<section class="telegram wrap"><div class="telegram-decoration" aria-hidden="true">${locale === 'ru' ? 'Ещё?' : 'More?'}</div><div><p class="eyebrow">${c.telegramEyebrow}</p><h2>${c.telegramTitle}</h2><p>${c.telegramText}</p><a class="button light" href="https://t.me/letter_search_bot" target="_blank" rel="noopener noreferrer">${c.telegramButton}${arrow}</a></div><svg class="paper-plane" viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m19 74 123-49-29 113-38-37-24 19 6-34L142 25 75 101M51 120l24-19"/></svg></section>
</main>
<footer class="footer wrap"><div><a class="brand" href="${locale === 'en' ? `${prefix}en/` : prefix}">${brand(c)}</a><p>${c.footer}</p></div><div class="footer-right"><a href="https://t.me/letter_search" target="_blank" rel="noopener noreferrer">${c.community} ${arrow}</a><p class="fine">${c.privacy}</p><span class="fine">© ${new Date().getUTCFullYear()} ${c.name}</span></div></footer>
<dialog id="image-dialog" class="picture-viewer" aria-labelledby="dialog-title" aria-describedby="viewer-notice">
<header class="viewer-header"><div class="viewer-heading"><span class="viewer-letter-tag"><span>${c.viewerLetterLabel}</span><strong id="viewer-letter">${pic.letter}</strong></span><h2 id="dialog-title">${pic.title}</h2></div><div class="viewer-tools"><button type="button" id="viewer-zoom" aria-pressed="false">${c.zoom}</button><button type="button" id="viewer-fullscreen" hidden>${c.fullscreen}</button><button type="button" id="close-dialog" class="viewer-close">${c.close}<span aria-hidden="true">×</span></button></div></header>
<div id="viewer-stage" class="viewer-stage" tabindex="0" aria-label="${c.enlarge}"><div class="viewer-load"><p id="viewer-load-state" role="status">${c.loading}</p><button type="button" id="viewer-retry" hidden>${c.retry}</button></div><div id="viewer-sheet" class="viewer-sheet" hidden><img id="zoom-image" alt="${pic.alt}" draggable="false"><svg id="annotation-overlay" viewBox="0 0 1000 750" preserveAspectRatio="none" aria-hidden="true"></svg><span id="reveal-divider" aria-hidden="true" hidden></span></div></div>
<footer class="viewer-footer"><div class="reveal-controls"><button type="button" id="show-original" aria-pressed="true">${c.original}</button><div class="range-control"><label class="visually-hidden" for="annotation-range">${c.revealLabel}</label><input type="range" id="annotation-range" min="0" max="100" value="0" step="1" aria-valuetext="${c.original}" aria-describedby="reveal-hint"><output id="reveal-value" for="annotation-range">0%</output></div><button type="button" id="show-annotations" aria-pressed="false">${c.annotated}</button></div><p id="reveal-hint">${c.revealHint}</p><div class="viewer-footnote"><p id="viewer-notice">${c.viewerHint}</p><a id="original-image" href="${asset(pic.image)}" target="_blank" rel="noopener">${locale === 'ru' ? 'Открыть оригинал' : 'Open original'} ↗</a></div><ul id="viewer-word-list" class="visually-hidden" aria-label="${c.viewerWords}" hidden></ul></footer>
</dialog>
</body></html>`;
}
