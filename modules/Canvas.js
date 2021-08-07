import { _pick } from './additional.js'

class Canvas {
  element = document.createElement('canvas')
  context = this.element.getContext('2d')

  width = 300
  height = 150

  constructor(params = {}) {
    const { element } = this

    Object.assign(this, _pick(params, ['width', 'height']))
    Object.assign(element, _pick(this, ['width', 'height']))
  }

  clear(color) {
    const { element, context } = this

    context.beginPath()
    context.fillStyle = color
    context.rect(0, 0, element.width, element.height)
    context.fill()
  }
}

export default Canvas
