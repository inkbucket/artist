export function getScreensMeta(screens: any[]) {
  const meta = screens
    // .filter(s => s.meta.showInMenu)
    .map(screen => {
      return {
        screen,
        name: screen.meta.label
      };
    });
  return meta;
}

export const on = eventListener.bind(null, 'addEventListener');
export const off = eventListener.bind(null, 'removeEventListener');

function eventListener(method, elements, events, fn, options = {}) {
  // Normalize array
  if (elements instanceof HTMLCollection || elements instanceof NodeList) {
    elements = Array.from(elements);
  } else if (!Array.isArray(elements)) {
    elements = [elements];
  }

  if (!Array.isArray(events)) {
    events = [events];
  }

  elements.forEach(el => events.forEach(ev => el[method](ev, fn, { capture: false, ...options })));

  return Array.prototype.slice.call(arguments, 1);
}

export function generateID() {
  return Math.random()
    .toString(36)
    .substr(2, 5);
}
