// @flow

export const encodeUrlParams = (query: Object) => {
  if (query === null || query === undefined) {
    return '';
  }
  return Reflect.ownKeys(query)
    .filter(key => query[key] !== undefined && query[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
};

export const keyMirror = (object: Object, transformKey: Function = (key => key)): Object =>
  Reflect.ownKeys(object).reduce((result, key) => {
    result[key] = transformKey(key);
    return result;
  }, {});


export function promisify(original: Function, ctx: any): Function {
  return function decoated(...args) {
    return new Promise((resolve, reject) => {
      args.push((err, ...values) => {
        if (err) {
          reject(err);
        } else {
          resolve(values[0]);
        }
      });
      original.call(ctx || this, ...args);
    });
  };
}
