// @flow
import Cache from './Cache';

export default class ExpirationCache extends Cache {
  expiresIn: number;

  constructor(expiresIn: number) {
    super();
    this.expiresIn = expiresIn;
  }

  expired(time: number) {
    return new Date().getTime() - time >= this.expiresIn;
  }

  invokeCached = async (key: string, fetchFn: Function) => {
    let data = this.storage.tryGet(key);
    if (!data || this.expired(data.time)) {
      const entity = await fetchFn();
      data = { entity, time: new Date().getTime() };
      if (data.entity) {
        this.storage.set(key, data);
      }
    }
    return data.entity;
  };
}
