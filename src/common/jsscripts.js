// @flow

export class JsScripts {
  installed: Set<string> = new Set();
  complete: Set<string> = new Set();
  callbacks: Map<string, Function> = new Map();

  addScript = (src: string, async: boolean, defer: boolean, onLoad: Function) => {
    if (!this.installed.has(src)) {
      const script = this.createScript(src, async, defer);

      this.callbacks.set(src, onLoad);
      script.onload = () => {
        this.complete.add(src);
        this.notify(src);
      };

      document.body.appendChild(script);
      this.installed.add(src);
    }
  }

  unsubsribe = (src: string) => {
    this.callbacks.delete(src);
  }

  notify = (src: string) => {
    const loadHandler = this.callbacks.get(src);
    if (loadHandler) {
      loadHandler();
    }
  }

  isLoaded = (src: string) =>
    this.complete.has(src);

  createScript = (src: string, async: boolean, defer: boolean) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;

    return script;
  }
}

export const jsScripts = new JsScripts();
