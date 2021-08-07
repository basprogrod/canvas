export const _has = (a, b) => Object.prototype.hasOwnProperty.call(a, b)

export const _pick = (obj, keys) =>
  keys.reduce((r, key) => {
    if (_has(obj, key)) {
      r[key] = obj[key]
    }

    return r
  }, {})
