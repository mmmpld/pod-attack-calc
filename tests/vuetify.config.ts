// jsdom does not implement resize observer https://github.com/jsdom/jsdom/issues/3368
class ResizeObserverStub {
    observe () { }
    unobserve () { }
    disconnect () { }
  }
  window.ResizeObserver ??= ResizeObserverStub
  