// @flow

export default class Mixpanel {
  static instance(): ?Object {
    return window.mixpanel;
  }

  static identify(id: any) {
    const mixpanel = Mixpanel.instance();
    if (mixpanel) {
      mixpanel.identify(id);
    }
  }

  static alias(id: any) {
    const mixpanel = Mixpanel.instance();
    if (mixpanel) {
      mixpanel.alias(id);
    }
  }

  static track(name: string, ...args: any) {
    const mixpanel = Mixpanel.instance();
    if (mixpanel) {
      mixpanel.track(name, ...args);
    }
  }

  static people = {
    set: (...args: any) => {
      const mixpanel = Mixpanel.instance();
      if (mixpanel) {
        mixpanel.people.set(...args);
      }
    },
  };
}
