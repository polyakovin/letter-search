export const ROUND_SECONDS = 120;
export function normalize(word) {
  return word.normalize('NFC').trim().toLowerCase().replaceAll('ё', 'е');
}
export function newRound() {
  return { status: 'ready', deadline: null, accepted: [] };
}
export function startRound(now) {
  return {
    status: 'running',
    deadline: now + ROUND_SECONDS * 1000,
    accepted: [],
  };
}
export function finishRound(round) {
  return { ...round, status: 'finished' };
}
export function remainingSeconds(round, now) {
  if (round.status === 'ready') return ROUND_SECONDS;
  if (round.status === 'finished') return 0;
  return Math.max(0, Math.ceil((round.deadline - now) / 1000));
}
export function formatTime(seconds) {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}
export function submitWords(round, scene, input, now) {
  if (round.status !== 'running') return { round, feedback: [] };
  if (now >= round.deadline) return { round: finishRound(round), feedback: [] };
  const words = input.normalize('NFC').match(/[\p{L}\p{M}]+/gu) ?? [];
  const accepted = [...round.accepted];
  const feedback = [];
  if (!words.length) feedback.push({ word: '', kind: 'empty' });
  for (const raw of words) {
    const word = normalize(raw);
    if (!word.startsWith(normalize(scene.letter))) {
      feedback.push({ word: raw, kind: 'letter' });
      continue;
    }
    const object = scene.objects.find((item) =>
      item.aliases.some((alias) => normalize(alias) === word),
    );
    if (!object) feedback.push({ word: raw, kind: 'unknown' });
    else if (accepted.includes(object.id))
      feedback.push({ word: raw, kind: 'duplicate' });
    else {
      accepted.push(object.id);
      feedback.push({ word: object.label, kind: 'accepted' });
    }
  }
  return { round: { ...round, accepted }, feedback };
}
