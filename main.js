const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')
const WIDTH = 500
const HEIGHT = 700
const CELL_COLOR_1 = '#7762ac'
const CELL_COLOR_2 = '#aa6da8'
const QUANTIFICATION = 4
const ROW_MARGIN = 7
const ROWS_QUONTITY = 12

canvas.width = WIDTH
canvas.height = HEIGHT

let xFromMouseDown = undefined
let xLastPosition = 0
let globalOffset = 0
let loops = 1
let offset = 0
let raf = undefined


class Item {
  constructor(x, y) {
    this.width = 25
    this.height = 40
    this.x = x
    this.y = y
  }
}

function getItems(Item, quontity, widthOfCanvas) {
  const arr = []
  const margin = widthOfCanvas / quontity

  for (let i = 0; i < quontity; i++) {
    arr.push(new Item(i * margin , 0)) 
  }
  
  return  arr
}

function removeAll() {
  ctx.fillStyle = "#7b4572"
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drowCell(x, y, w, h) {
  // console.log("-> x, y, w, h", x, y, w, h)
  
  ctx.moveTo(x, y)
  ctx.lineTo(w, y)
  ctx.lineTo(w, h)
  ctx.lineTo(x, h)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
}

function drowItems(offset = 0) {
  ctx.font = "italic 14px Arial";
  let flag = true
  
  for (let i = 0; i < ROWS_QUONTITY; i++) {
    items.forEach((item, index) => {
      const loop = Math.abs(Math.floor((item.x + offset) / WIDTH))
      const loopForDigits = Math.abs(Math.floor((item.x + globalOffset) / WIDTH))
  
      if (!(index % QUANTIFICATION)) flag = !flag    
  
      ctx.fillStyle = `${flag ? CELL_COLOR_1 : CELL_COLOR_2}`
  
      let x = item.x + offset + WIDTH * loop
      let y = item.y + i * (item.height + ROW_MARGIN)
  
      if (globalOffset < 0) {
  
        if (item.x + offset < 0) {
          ctx.fillRect(item.x + offset, y, item.width, item.height)
        }
        
      } else {
        x = item.x
        globalOffset = 0
        xLastPosition = 0
      } 
      
      ctx.fillRect(x, y, item.width, item.height)
      ctx.fillStyle = "#FFFc";
  
      ctx.fillText(loopForDigits * items.length + index, x + 5, 20);
      
    })
  }
  
  
  ctx.fillText('offset: ' + offset , 20, HEIGHT - 20);
}

function mouseMove(e) {
  offset = e.layerX - xFromMouseDown
  
  globalOffset = offset + xLastPosition
  if (e.layerX + 20 > WIDTH || e.layerX < 20) cancelAnimationFrame(raf)
}

function draw() {
  removeAll()
  drowItems(globalOffset % WIDTH)
  raf = requestAnimationFrame(draw)
  ctx.fillText('GLobal offset: ' + globalOffset , 20  , HEIGHT - 40);
}

const items = getItems(Item, 16, WIDTH)
console.log("-> items", items)

removeAll()
drowItems()



canvas.addEventListener('mousedown', (e) => {
  xFromMouseDown = e.layerX
  raf = requestAnimationFrame(draw)
  canvas.addEventListener('mousemove', mouseMove)
})

canvas.addEventListener('mouseup', (e) => {
  
  xLastPosition = globalOffset
  cancelAnimationFrame(raf)
  canvas.removeEventListener('mousemove', mouseMove)
})




