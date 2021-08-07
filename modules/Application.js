import Box from './Box.js'
import Canvas from './Canvas.js'
import Render from './Render.js'
import EventEmitter from './EventEmitter.js'

import { _pick } from './additional.js'

class Application extends EventEmitter {
  canvas = new Canvas({ width: 1000, height: 900 })
  render = new Render()
  container = null

  background = 'white'

  constructor(params = {}) {
    super()

    Object.assign(this, _pick(params, ['background']))

    this.container = new Box(params)
    setContent(this.container, params.content)

    this.render.on('update', (data) => this.emit(data))
    this.render.on('clear', () => this.canvas.clear(this.background))
    this.render.on('draw', (data) => this.container.draw(this.canvas, data))
    this.render.start()
  }
}

export default Application

function setContent(container, content = []) {
  for (const item of content) {
    const box = new Box(item)
    container.add(box)

    if (item.content && item.content.length) {
      setContent(box, item.content)
    }
  }
}
