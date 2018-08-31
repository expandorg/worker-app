// @flow
export default class MemoryStorage {
  static global: Object = {};
  store: Object = {};

  constructor(local: boolean = true) {
    if (!local) {
      this.store = MemoryStorage.global;
    }
  }

  tryGet = (key: string) => this.store[key];

  set = (key: string, entity: any) => {
    this.store[key] = entity;
  };
}
