import Widget from './Widget.js'

class Grid extends Widget {
  offsetX = 10
  margin = 10
  cellWidth = 25
  cellHeight = 50
  canvas = document.createElement('canvas')

  draw(canvas, data, box) {
    const { offsetX, margin, cellWidth, cellHeight } = this

    const { context } = canvas

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 20; x++) {
        const even = x % 8 > 3

        context.beginPath()
        context.rect(-offsetX + x * cellWidth + x * margin, y * cellHeight + y * margin, cellWidth, cellHeight)
        context.fillStyle = even ? 'red' : 'green'
        context.fill()
      }
    }
  }
}

export default Grid
