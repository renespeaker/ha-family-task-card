/* ------------------------------------------------------------------ */
/*  Browser APIs happy-dom does not implement, stubbed just enough for */
/*  the card to render. Layout only, never logic. Runs for every test  */
/*  file, including pure ones in the node environment - hence the      */
/*  guards.                                                            */
/* ------------------------------------------------------------------ */

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).ResizeObserver ??= ResizeObserverStub;

if (typeof Element !== "undefined") {
  Element.prototype.scrollTo ??= function scrollTo() {};
  Element.prototype.setPointerCapture ??= function setPointerCapture() {};
}
