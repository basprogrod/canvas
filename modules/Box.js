import { _pick } from './additional.js'

class Box {
  key = ''
  x = 0
  y = 0
  width = 50
  height = 50
  content = []

  constructor(params = {}) {
    Object.assign(this, _pick(params, ['key', 'width', 'height', 'x', 'y']))
  }

  add(element) {
    if (!this.content.includes(element)) {
      this.content.push(element)
    }
  }

  getBox(key) {
    if (this.key === key) {
      return this
    }

    for (const item of this.content) {
      if (item instanceof Box) {
        const result = item.getBox(key)

        if (result) {
          return result
        }
      }
    }
  }

  draw(canvas, data) {
    canvas.context.save()
    canvas.context.translate(this.x, this.y)

    canvas.context.beginPath()
    canvas.context.rect(0, 0, this.width, this.height)
    canvas.context.lineWidth = 1
    canvas.context.strokeStyle = 'white'
    canvas.context.stroke()

    for (const item of this.content) {
      item.draw(canvas, data)
    }

    canvas.context.restore()
  }
}

export default Box
