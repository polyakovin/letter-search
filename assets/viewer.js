import {
  annotations,
  customScenes,
  referenceScenes,
} from './annotations.js';
import {
  clipForReveal,
  contourPath,
  fitPicture,
  revealPercent,
  viewForScene,
} from './viewer-model.js';

const namespace = 'http://www.w3.org/2000/svg';
function svgElement(tag, attributes, text) {
  const element = document.createElementNS(namespace, tag);
  for (const [name, value] of Object.entries(attributes))
    element.setAttribute(name, String(value));
  if (text) element.textContent = text;
  return element;
}
export function createViewer({ locale, copy, scene }) {
  const $ = (id) => document.getElementById(id);
  const dialog = $('image-dialog');
  const image = $('zoom-image');
  const sheet = $('viewer-sheet');
  const stage = $('viewer-stage');
  const overlay = $('annotation-overlay');
  const slider = $('annotation-range');
  const fullscreen = $('viewer-fullscreen');
  let current;
  let zoom = 1;
  let returnFocus;
  let fullscreenOwned = false;
  let loadId = 0;
  let imageLoaded = false;
  const asset = (file) => new URL(file, import.meta.url).href;
  const resolveDescriptor = (descriptor) => {
    if (descriptor.id === 'custom') return customScenes[locale];
    if (descriptor.id === 'reference') return referenceScenes[locale];
    return viewForScene(descriptor, annotations);
  };

  function setReveal(value) {
    const percent = revealPercent(value);
    slider.value = String(percent);
    slider.setAttribute(
      'aria-valuetext',
      percent === 0
        ? copy.original
        : percent === 100
          ? copy.annotated
          : `${copy.annotated}: ${percent}%`,
    );
    overlay.style.clipPath = clipForReveal(percent);
    overlay.style.visibility = percent === 0 ? 'hidden' : 'visible';
    $('reveal-divider').style.left = `${percent}%`;
    $('reveal-divider').hidden = percent === 0 || percent === 100;
    $('reveal-value').textContent = `${percent}%`;
    $('viewer-word-list').hidden = percent === 0;
    $('show-original').setAttribute('aria-pressed', String(percent === 0));
    $('show-annotations').setAttribute('aria-pressed', String(percent === 100));
    slider.style.setProperty('--reveal', `${percent}%`);
  }
  function resize() {
    if (!dialog.open || !imageLoaded) return;
    const size = fitPicture(
      image.naturalWidth,
      image.naturalHeight,
      stage.clientWidth - 24,
      stage.clientHeight - 24,
      zoom,
    );
    sheet.style.width = `${size.width}px`;
    sheet.style.height = `${size.height}px`;
  }
  function setZoom(value) {
    zoom = value;
    $('viewer-zoom').setAttribute('aria-pressed', String(zoom === 2));
    $('viewer-zoom').textContent = zoom === 2 ? copy.fit : copy.zoom;
    resize();
    stage.scrollTo({ left: 0, top: 0 });
  }
  function drawAnnotations() {
    overlay.replaceChildren();
    for (const mark of current.annotations) {
      const group = svgElement('g', { 'data-object': mark.id });
      const d = contourPath(mark);
      group.append(
        svgElement('path', { d, class: 'mark-halo' }),
        svgElement('path', { d, class: 'mark-outline' }),
      );
      const [x, y] = mark.labelAt;
      if (mark.target) {
        const [tx, ty] = mark.target;
        const leader = `M${x},${y + 3} Q${(x + tx) / 2 + 8},${(y + ty) / 2} ${tx},${ty}`;
        group.append(
          svgElement('path', { d: leader, class: 'leader-halo' }),
          svgElement('path', { d: leader, class: 'mark-leader' }),
        );
      }
      group.append(
        svgElement(
          'text',
          {
            x,
            y,
            transform: `rotate(${mark.rotation} ${x} ${y})`,
            class: 'mark-label',
            'text-anchor': 'middle',
          },
          mark.label,
        ),
      );
      overlay.append(group);
    }
    $('viewer-word-list').replaceChildren(
      ...current.annotations.map((mark) => {
        const li = document.createElement('li');
        li.textContent = mark.label;
        return li;
      }),
    );
  }
  async function loadImage() {
    const id = ++loadId;
    imageLoaded = false;
    sheet.hidden = true;
    slider.disabled = true;
    $('viewer-zoom').disabled = true;
    $('show-original').disabled = true;
    $('show-annotations').disabled = true;
    $('viewer-load-state').hidden = false;
    $('viewer-load-state').textContent = copy.loading;
    $('viewer-retry').hidden = true;
    image.src = asset(current.image);
    image.alt = current.alt;
    try {
      await image.decode();
      if (id !== loadId || !dialog.open) return;
      imageLoaded = true;
      sheet.hidden = false;
      $('viewer-load-state').hidden = true;
      for (const control of [
        slider,
        $('viewer-zoom'),
        $('show-original'),
        $('show-annotations'),
      ])
        control.disabled = false;
      resize();
    } catch {
      if (id !== loadId || !dialog.open) return;
      $('viewer-load-state').textContent = copy.viewerImageError;
      $('viewer-retry').hidden = false;
    }
  }
  function open(descriptor, trigger) {
    current = resolveDescriptor(descriptor);
    const hasAnnotations = current.annotations.length > 0;
    returnFocus = trigger;
    $('dialog-title').textContent = current.title;
    $('viewer-notice').textContent = current.viewerHint ?? copy.viewerHint;
    $('viewer-letter-tag').hidden = !hasAnnotations;
    $('viewer-reveal-panel').hidden = !hasAnnotations;
    $('viewer-letter').textContent = current.letter ?? '';
    $('original-image').href = asset(current.image);
    drawAnnotations();
    setReveal(0);
    zoom = 1;
    $('viewer-zoom').textContent = copy.zoom;
    $('viewer-zoom').setAttribute('aria-pressed', 'false');
    document.documentElement.classList.add('viewer-open');
    dialog.showModal();
    $('close-dialog').focus({ preventScroll: true });
    stage.scrollTo({ left: 0, top: 0 });
    loadImage();
  }
  function onClose() {
    ++loadId;
    document.documentElement.classList.remove('viewer-open');
    if (fullscreenOwned && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    fullscreenOwned = false;
    returnFocus?.focus({ preventScroll: true });
  }
  $('close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', onClose);
  slider.addEventListener('input', () => setReveal(slider.value));
  $('show-original').addEventListener('click', () => setReveal(0));
  $('show-annotations').addEventListener('click', () => setReveal(100));
  $('viewer-zoom').addEventListener('click', () => setZoom(zoom === 1 ? 2 : 1));
  $('viewer-retry').addEventListener('click', loadImage);
  fullscreen.hidden = !document.fullscreenEnabled;
  fullscreen.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
        if (!dialog.open) {
          await document.exitFullscreen();
          return;
        }
        fullscreenOwned = true;
      }
    } catch {
      $('viewer-notice').textContent = copy.fullscreenFallback;
    }
  });
  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement
      ? copy.exitFullscreen
      : copy.fullscreen;
    if (!document.fullscreenElement) fullscreenOwned = false;
    resize();
  });
  new ResizeObserver(resize).observe(stage);
  document.querySelectorAll('[data-viewer]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      const descriptor =
        link.dataset.viewer === 'custom'
          ? customScenes[locale]
          : link.dataset.viewer === 'reference'
            ? referenceScenes[locale]
            : scene(link.dataset.viewer);
      open(descriptor, link);
    });
  });
  return { open, isOpen: () => dialog.open };
}
