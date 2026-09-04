import { createViewer } from './viewer.js';
import { copy } from './content.js';
import { scenes } from './scenes.js';
import {
  finishRound,
  formatTime,
  newRound,
  remainingSeconds,
  startRound,
  submitWords,
} from './demo.js';

const locale = document.documentElement.lang === 'en' ? 'en' : 'ru';
const c = copy[locale];
const catalog = scenes[locale];
const $ = (id) => document.getElementById(id);
const asset = (file) => new URL(file, import.meta.url).href;
let sceneIndex = 0;
let round = newRound();
let imageReady = false;
let interval;
const scene = () => catalog[sceneIndex];
const image = $('game-image');
const viewer = createViewer({
  locale,
  copy: c,
  scene: (key) => (key === 'studio' ? catalog[0] : scene()),
});

function chip(text, found = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (found) li.classList.add('is-found');
  return li;
}
function updateTimer() {
  const remaining = remainingSeconds(round, Date.now());
  $('timer').textContent = formatTime(remaining);
  $('timer').parentElement.classList.toggle(
    'urgent',
    round.status === 'running' && remaining <= 20,
  );
  if (round.status === 'running' && remaining === 0) endRound();
}
function render() {
  $('ready-panel').hidden = round.status !== 'ready';
  $('running-panel').hidden = round.status !== 'running';
  $('result-panel').hidden = round.status !== 'finished';
  $('answers').hidden = round.status !== 'finished';
  $('score').textContent = String(round.accepted.length);
  $('empty-words').hidden = round.accepted.length > 0;
  $('found-words').replaceChildren(
    ...round.accepted.map((id) =>
      chip(scene().objects.find((item) => item.id === id).label),
    ),
  );
  $('start').disabled = !imageReady;
  $('replay').disabled = !imageReady;
  $('enlarge').disabled = !imageReady;
  $('image-status').hidden = imageReady;
  $('result-heading').textContent = round.accepted.length
    ? c.resultTitle
    : c.resultEmpty;
  if (round.status === 'finished') {
    $('answer-list').replaceChildren(
      ...scene().objects.map((item) =>
        chip(item.label, round.accepted.includes(item.id)),
      ),
    );
  }
  updateTimer();
}
function clearFeedback() {
  $('feedback').replaceChildren();
}
function beginRound() {
  if (!imageReady) return;
  clearInterval(interval);
  round = startRound(Date.now());
  clearFeedback();
  $('round-notice').textContent = c.localeNotice;
  $('word-input').value = '';
  render();
  interval = setInterval(updateTimer, 250);
  $('word-input').focus({ preventScroll: true });
}
function endRound() {
  if (round.status !== 'running') return;
  round = finishRound(round);
  clearInterval(interval);
  render();
  $('round-notice').textContent =
    `${c.resultTitle} ${c.score}: ${round.accepted.length}.`;
  if (!viewer.isOpen()) $('replay').focus({ preventScroll: true });
}
function setImageStatus() {
  imageReady = image.complete && image.naturalWidth > 0;
  $('image-status').textContent = imageReady ? '' : c.loading;
  $('reload').hidden = true;
  render();
}
image.addEventListener('load', setImageStatus);
image.addEventListener('error', () => {
  imageReady = false;
  $('image-status').textContent = c.imageError;
  $('reload').hidden = false;
  render();
});
function selectScene(index) {
  if (index === sceneIndex) return;
  clearInterval(interval);
  sceneIndex = index;
  round = newRound();
  imageReady = false;
  clearFeedback();
  $('word-input').value = '';
  $('round-notice').textContent = c.resetNotice;
  $('image-status').textContent = c.loading;
  $('reload').hidden = true;
  image.src = asset(scene().image);
  image.alt = scene().alt;
  $('game-image-link').href = asset(scene().image);
  $('game-image-link').setAttribute(
    'aria-label',
    `${c.enlarge}: ${scene().title}`,
  );
  $('scene-title').textContent = scene().title;
  $('target-letter').textContent = scene().letter;
  document.querySelectorAll('[data-scene]').forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      String(Number(button.dataset.scene) === index),
    );
  });
  render();
  if (image.complete && image.naturalWidth > 0) setImageStatus();
}
$('start').addEventListener('click', beginRound);
$('replay').addEventListener('click', beginRound);
$('finish').addEventListener('click', endRound);
$('next').addEventListener('click', () => {
  selectScene((sceneIndex + 1) % catalog.length);
  $('start').focus({ preventScroll: true });
});
$('reload').addEventListener('click', () => window.location.reload());
$('word-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const result = submitWords(round, scene(), $('word-input').value, Date.now());
  if (result.round.status === 'finished') {
    endRound();
    return;
  }
  round = result.round;
  $('feedback').replaceChildren(
    ...result.feedback.map((item) => {
      const p = document.createElement('p');
      p.className = item.kind;
      const message =
        item.kind === 'letter'
          ? `${c.letter} ${scene().letter}.`
          : c[item.kind];
      p.textContent = `${item.word ? `${item.word}: ` : ''}${message}`;
      return p;
    }),
  );
  $('word-input').value = '';
  render();
});
document.querySelectorAll('[data-scene]').forEach((button) => {
  button.disabled = false;
  button.addEventListener('click', () =>
    selectScene(Number(button.dataset.scene)),
  );
});
$('enlarge').addEventListener('click', () =>
  viewer.open(scene(), $('enlarge')),
);
document.addEventListener('visibilitychange', updateTimer);
window.addEventListener('pageshow', updateTimer);
window.addEventListener('pagehide', () => clearInterval(interval));
window.addEventListener('pageshow', () => {
  clearInterval(interval);
  if (round.status === 'running') interval = setInterval(updateTimer, 250);
});
if (image.complete) {
  if (image.naturalWidth > 0) setImageStatus();
  else {
    $('image-status').textContent = c.imageError;
    $('reload').hidden = false;
    render();
  }
} else render();
