export const VIEWBOX = { width: 1000, height: 750 };
export function revealPercent(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.min(100, number)) : 0;
}
export function clipForReveal(value) {
  return `inset(0 ${100 - revealPercent(value)}% 0 0)`;
}
export function contourPath(annotation) {
  if (annotation.ellipse) {
    const [x, y, rx, ry] = annotation.ellipse;
    return `M${x - rx},${y} C${x - rx},${y - ry * 1.06} ${x + rx * 0.93},${y - ry} ${x + rx},${y} C${x + rx * 1.03},${y + ry} ${x - rx * 0.93},${y + ry * 1.05} ${x - rx},${y} Z`;
  }
  return (
    annotation.points
      .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`)
      .join(' ') + ' Z'
  );
}
export function viewForScene(scene, maps) {
  const marks = maps[`${scene.id}-${scene.locale}`];
  if (!marks)
    throw new Error(`Missing annotation map: ${scene.id}-${scene.locale}`);
  return {
    ...scene,
    annotations: marks.map((mark) => {
      const object = scene.objects.find((object) => object.id === mark.id);
      if (!object) throw new Error(`Unknown annotated object: ${mark.id}`);
      return { ...mark, label: object.label };
    }),
  };
}
export function fitPicture(
  naturalWidth,
  naturalHeight,
  width,
  height,
  zoom = 1,
) {
  if (naturalWidth <= 0 || naturalHeight <= 0 || width <= 0 || height <= 0)
    return { width: 0, height: 0 };
  const scale = Math.min(width / naturalWidth, height / naturalHeight) * zoom;
  return { width: naturalWidth * scale, height: naturalHeight * scale };
}
