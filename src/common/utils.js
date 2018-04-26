
export const encodeUrlParams = (query) => {
  if (query === null || query === undefined) {
    return '';
  }
  return Reflect.ownKeys(query)
    .filter(key => query[key] !== undefined && query[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
};

export const keyMirror = (object, transformKey = (key => key)) =>
  Reflect.ownKeys(object).reduce((result, key) => {
    result[key] = transformKey(key);
    return result;
  }, {});
