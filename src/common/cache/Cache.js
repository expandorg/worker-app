// @flow
import MemoryStorage from './MemoryStorage';

export default class Cache {
  storage: Object;

  constructor(storage: Object = new MemoryStorage()) {
    this.storage = storage;
  }

  invokeCached = async (key: string, fetchEntity: Function) => {
    let entity = this.storage.tryGet(key);
    if (!entity) {
      entity = await fetchEntity();
      if (entity) {
        this.storage.set(key, entity);
      }
    }
    return entity;
  };
}
