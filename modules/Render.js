import EventEmitter from './EventEmitter.js'
import { _pick } from './additional.js'

class Render extends EventEmitter {
  play = false

  ptimestamp = 0
  timestamp = 0
  diff = 0
  fps = 0
  secondPart = 0

  tick(timestamp) {
    requestAnimationFrame((x) => this.tick(x))

    this.ptimestamp = this.timestamp
    this.timestamp = timestamp
    this.diff = this.timestamp - this.ptimestamp
    this.fps = 1 / this.diff
    this.secondPart = this.diff / 1000

    const data = _pick(this, ['ptimestamp', 'timestamp', 'diff', 'fps', 'secondPart'])

    this.emit('update', data)
    this.emit('clear', data)
    this.emit('draw', data)
  }

  start() {
    if (!this.play) {
      this.play = true
      requestAnimationFrame((x) => this.tick(x))
    }
  }
}

export default Render
