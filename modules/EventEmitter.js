import { _has } from './additional.js'

export default class EventEmitter {
  listeners = []

  addEventListener(name, handler) {
    const { listeners } = this

    if (!_has(listeners, name)) {
      listeners[name] = []
    }

    listeners[name].push(handler)
  }

  on(...args) {
    return this.addEventListener(...args)
  }

  emit(name, ...args) {
    if (_has(this.listeners, name)) {
      for (const handler of this.listeners[name]) {
        handler(...args)
      }
    }
  }
}
