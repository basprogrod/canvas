const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')
const WIDTH = 500
const HEIGHT = 700
const CELL_COLOR_1 = '#7762ac'
const CELL_COLOR_2 = '#aa6da8'
const QUANTIFICATION = 4
const ROW_MARGIN = 7
const ROWS_MARGIN_TOP = 30
const ROWS_QUONTITY = 12

canvas.width = WIDTH
canvas.height = HEIGHT

let xFromMouseDown = undefined
let xLastPosition = 0
let globalOffset = 0
let loops = 1
let offset = 0
let raf = undefined
let playTid = undefined
let isPlayBack = false
let isMouseDown = false

class Item {
  constructor(x, y) {
    this.width = 25
    this.height = 40
    this.x = x
    this.y = y
  }
}

class EventsHandler {
  // пока не использутся. Так... набросок
  constructor() {
    this.stor = Object.create({})
  }
  getCoords(x, y) {}

  addEvent(event, handler) {
    this.stor[event] = this.stor[event]?.length ? [...this.stor[event], handler] : [handler]
  }

  runEvent(event) {
    const handlers = this.stor[event]

    for (let handler of handlers) {
      handler(event)
    }
  }
}

const eventsHandler = new EventsHandler()

// eventsHandler.addEvent('kek', (e) => console.log(e))
// eventsHandler.addEvent('kek', (e) => console.log(e))
// eventsHandler.addEvent('lol', (e) => console.log(e))

function getItems(Item, quontity, widthOfCanvas) {
  const arr = []
  const margin = widthOfCanvas / quontity

  for (let i = 0; i < quontity; i++) {
    arr.push(new Item(i * margin, 0))
  }

  return arr
}

function removeAll() {
  // ctx.fillStyle = "#7b4572"
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
}

// function drowCell(x, y, w, h) {
//   // console.log("-> x, y, w, h", x, y, w, h)

//   ctx.moveTo(x, y)
//   ctx.lineTo(w, y)
//   ctx.lineTo(w, h)
//   ctx.lineTo(x, h)
//   ctx.closePath()
//   ctx.stroke()
//   ctx.fill()
// }

function drowTimeMarker() {
  if (WIDTH / 2 > -globalOffset) {
    ctx.fillRect(-globalOffset, 0, 2, HEIGHT)
  } else {
    ctx.fillRect(WIDTH / 2, 0, 2, HEIGHT)
  }
}

function drowItems(offset = 0, point) {
  ctx.font = 'italic 14px Arial'
  let flag = true

  for (let i = 0; i < ROWS_QUONTITY; i++) {
    items.forEach((item, index) => {
      const loop = Math.abs(Math.floor((item.x + offset) / WIDTH))
      const loopForDigits = Math.abs(Math.floor((item.x + globalOffset) / WIDTH))

      if (!(index % QUANTIFICATION)) flag = !flag

      ctx.fillStyle = `${flag ? CELL_COLOR_1 : CELL_COLOR_2}`

      let x = item.x + offset + WIDTH * loop
      let y = item.y + i * (item.height + ROW_MARGIN) + ROWS_MARGIN_TOP

      if (globalOffset < 0) {
        if (item.x + offset < 0) {
          ctx.fillRect(item.x + offset + 4, y, item.width, item.height)
        }
      } else {
        x = item.x
        globalOffset = 0
        xLastPosition = 0
      }

      ctx.fillRect(x + 4, y, item.width, item.height)
      ctx.fillStyle = '#FFFc'

      ctx.fillText(loopForDigits * items.length + index, x + 5, 20)
    })
  }

  ctx.fillText('offset: ' + offset, 20, HEIGHT - 20)
}

function mouseMove(e) {
  offset = e.layerX - xFromMouseDown

  globalOffset = offset + xLastPosition

  if (e.layerX + 20 > WIDTH || e.layerX < 20) cancelAnimationFrame(raf)
}

let kek = 0
function draw() {
  if (kek > 100) kek = 0

  globalOffset--

  removeAll()
  drowItems(globalOffset % WIDTH)
  drowTimeMarker()

  ctx.fillText('GLobal offset: ' + globalOffset, 20, HEIGHT - 40)
  ctx.fillText('raf: ' + kek++, 20, HEIGHT - 100)
  ctx.fillText('isMouseDown: ' + isMouseDown, 200, HEIGHT - 100)
  ctx.fillText('isPlayBack: ' + isPlayBack, 200, HEIGHT - 80)

  raf = requestAnimationFrame(draw)
}

function playStop() {
  // if (!isMouseDown) {
  isPlayBack = true
  // }

  draw()
}

function stop() {
  xLastPosition = globalOffset
  isPlayBack = false
  cancelAnimationFrame(raf)
}

const items = getItems(Item, 16, WIDTH)
console.log('-> items', items)

removeAll()
drowItems()

canvas.addEventListener('click', (e) => {
  // console.log(e.layerX, e.layerY);
})

canvas.addEventListener('mousedown', (e) => {
  cancelAnimationFrame(raf)
  // isPlayBack = false
  xFromMouseDown = e.layerX
  xLastPosition = globalOffset
  draw()
  canvas.addEventListener('mousemove', mouseMove)
})

canvas.addEventListener('mouseup', (e) => {
  // isMouseDown = false
  // isPlayBack = true
  xLastPosition = globalOffset
  if (!isPlayBack) {
    cancelAnimationFrame(raf)
  }

  canvas.removeEventListener('mousemove', mouseMove)
})

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 32 && !isPlayBack) {
    playStop()
  } else {
    stop()
  }
})
