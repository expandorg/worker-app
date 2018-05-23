/**
 * @func cssModulesProxy captures css-modules function calls & prevent
 *    classNames from transformation
 * @param {string} key represents input className
 */
const cssModulesProxy = new Proxy({}, {
  get: function getter(target, key) {
    if (key === '__esModule') {
      return false;
    }
    return key;
  },
});

export default cssModulesProxy;
