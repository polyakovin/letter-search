import { describe, expect, test } from 'bun:test';
import {
  finishRound,
  formatTime,
  newRound,
  normalize,
  remainingSeconds,
  startRound,
  submitWords,
} from './demo.js';
const scene = {
  letter: 'К',
  locale: 'ru',
  objects: [
    { id: 'cat', label: 'кот', aliases: ['кот', 'кошка', 'коты', 'кошки'] },
    { id: 'rug', label: 'ковёр', aliases: ['ковёр', 'ковер', 'ковры'] },
    { id: 'book', label: 'книга', aliases: ['книга', 'книги'] },
  ],
};
describe('picture-demo round', () => {
  test('does not start a timer until the explicit start action', () => {
    const ready = newRound();
    expect(ready.status).toBe('ready');
    expect(remainingSeconds(ready, 900000)).toBe(120);
    expect(submitWords(ready, scene, 'кот', 0).round.accepted).toEqual([]);
  });
  test('normalizes Cyrillic Unicode, case and ё', () => {
    expect(normalize(' КОВЁР ')).toBe('ковер');
    expect(normalize('коше\u0308к')).toBe('кошек');
  });
  test('accepts separators, counts each object once and distinguishes feedback', () => {
    const { round, feedback } = submitWords(
      startRound(1000),
      scene,
      'КОТ, кошка\nковёр; КОВЕР книга дуб крокодил',
      2000,
    );
    expect(round.accepted).toEqual(['cat', 'rug', 'book']);
    expect(feedback.map((x) => x.kind)).toEqual([
      'accepted',
      'duplicate',
      'accepted',
      'duplicate',
      'accepted',
      'letter',
      'unknown',
    ]);
  });
  test('input is immutable and punctuation-only submissions are empty', () => {
    const old = startRound(0);
    const next = submitWords(old, scene, 'кот', 1);
    expect(old.accepted).toEqual([]);
    expect(next.round.accepted).toEqual(['cat']);
    expect(submitWords(old, scene, ' , ; \n !!', 1).feedback[0].kind).toBe(
      'empty',
    );
  });
  test('accepts just before deadline and rejects exactly at it or later', () => {
    const round = startRound(5000);
    expect(submitWords(round, scene, 'кот', 124999).round.accepted).toEqual([
      'cat',
    ]);
    for (const now of [125000, 900000]) {
      const result = submitWords(round, scene, 'кот', now);
      expect(result.round.status).toBe('finished');
      expect(result.round.accepted).toEqual([]);
      expect(remainingSeconds(round, now)).toBe(0);
    }
  });
  test('finish is idempotent and blocks later answers; restart clears score', () => {
    const result = finishRound(
      submitWords(startRound(0), scene, 'кот', 1).round,
    );
    expect(finishRound(result)).toEqual(result);
    expect(submitWords(result, scene, 'книга', 2).round).toEqual(result);
    expect(startRound(3).accepted).toEqual([]);
  });
  test('countdown is based on deadline, independent of interval ticks', () => {
    const round = startRound(1000);
    expect(remainingSeconds(round, 1001)).toBe(120);
    expect(remainingSeconds(round, 32000)).toBe(89);
    expect(formatTime(89)).toBe('01:29');
    expect(formatTime(0)).toBe('00:00');
  });
  test('English accepts C, rejects lookalike Cyrillic С, and groups aliases', () => {
    const en = {
      locale: 'en',
      letter: 'C',
      objects: [{ id: 'cat', label: 'cat', aliases: ['cat', 'cats'] }],
    };
    expect(
      submitWords(startRound(0), en, 'CAT cats СAT', 1).feedback.map(
        (x) => x.kind,
      ),
    ).toEqual(['accepted', 'duplicate', 'letter']);
  });
});
