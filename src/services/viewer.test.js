import { describe, expect, test } from 'bun:test';
import { annotations, customScenes } from '../../content/annotations.js';
import { scenes } from '../../site/scenes.js';
import {
  clipForReveal,
  contourPath,
  fitPicture,
  revealPercent,
  viewForScene,
} from './viewer.js';
import { normalize } from './demo.js';

describe('annotated picture viewer', () => {
  test('original, halfway and marked endpoints, including invalid range input', () => {
    expect(clipForReveal(0)).toBe('inset(0 100% 0 0)');
    expect(clipForReveal(50)).toBe('inset(0 50% 0 0)');
    expect(clipForReveal(100)).toBe('inset(0 0% 0 0)');
    expect(revealPercent(-20)).toBe(0);
    expect(revealPercent(900)).toBe(100);
    expect(revealPercent('60')).toBe(60);
    expect(revealPercent('invalid')).toBe(0);
  });
  test('fit never crops landscape pictures on portrait or landscape displays; zoom preserves ratio', () => {
    for (const [width, height] of [
      [1400, 700],
      [343, 590],
    ]) {
      const fit = fitPicture(1280, 955, width, height);
      expect(fit.width).toBeLessThanOrEqual(width);
      expect(fit.height).toBeLessThanOrEqual(height);
      expect(fit.width / fit.height).toBeCloseTo(1280 / 955);
      expect(fitPicture(1280, 955, width, height, 2).width).toBeCloseTo(
        fit.width * 2,
      );
    }
    expect(fitPicture(0, 0, 343, 590)).toEqual({ width: 0, height: 0 });
  });
  test('every demo noun is annotated once using its exact localized label', () => {
    for (const scene of Object.values(scenes).flat()) {
      const view = viewForScene(scene, annotations);
      expect(new Set(view.annotations.map((a) => a.id))).toEqual(
        new Set(scene.objects.map((o) => o.id)),
      );
      expect(view.annotations.length).toBe(scene.objects.length);
      for (const mark of view.annotations)
        expect(mark.label).toBe(
          scene.objects.find((o) => o.id === mark.id).label,
        );
    }
    expect(annotations['studio-ru']).not.toEqual(annotations['studio-en']);
    expect(annotations['winter-ru']).not.toEqual(annotations['winter-en']);
  });
  test('all six views have in-bounds contours, leaders and names on the displayed letter', () => {
    const views = [
      ...Object.values(scenes)
        .flat()
        .map((s) => viewForScene(s, annotations)),
      ...Object.values(customScenes),
    ];
    expect(views.length).toBe(6);
    for (const view of views) {
      expect(view.annotations.length).toBeGreaterThan(9);
      expect(new Set(view.annotations.map((a) => a.id)).size).toBe(
        view.annotations.length,
      );
      for (const mark of view.annotations) {
        expect(normalize(mark.label).startsWith(normalize(view.letter))).toBe(
          true,
        );
        const points = [
          mark.labelAt,
          ...(mark.target ? [mark.target] : []),
          ...(mark.points ?? []),
        ];
        if (mark.ellipse) {
          const [x, y, rx, ry] = mark.ellipse;
          points.push([x - rx, y - ry], [x + rx, y + ry]);
          expect(rx > 0 && ry > 0).toBe(true);
        }
        for (const [x, y] of points) {
          expect(x >= 0 && x <= 1000).toBe(true);
          expect(y >= 0 && y <= 750).toBe(true);
        }
        const path = contourPath(mark);
        expect(path.startsWith('M')).toBe(true);
        expect(path.endsWith('Z')).toBe(true);
        expect(path).not.toContain('NaN');
      }
    }
  });
});
