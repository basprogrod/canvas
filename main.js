'use strict'

const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')
const WIDTH = 300
const HEIGHT = 500

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
    this.width = 50
    this.height = 80
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
  ctx.fillStyle = "#aaa"
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
  ctx.beginPath()

  items.forEach((item, index) => {
    ctx.fillStyle = `${!index ? '#00ff00' : '#fff'}`
    
    let x = item.x + offset

    const loop = Math.abs(Math.floor((item.x + offset) / WIDTH))
    // console.log("-> loop", loop)

    if (offset < 0) {
      x = item.x + offset > 0 ? 
      item.x + offset
      :
      ctx.fillRect(item.x + offset + WIDTH, item.y + 50, item.width, item.height)
      ctx.font = "italic 20px Arial";
      ctx.fillText('kek', item.x + offset + WIDTH, 20);
    } else {
      x = item.x
      globalOffset = 0
      xLastPosition = 0
    } 
    
    ctx.fillRect(item.x + offset, item.y + 50, item.width, item.height)
    // ctx.fillRect(x + WIDTH, item.y + 50, item.width, item.height)
    ctx.fillStyle = "#000";
    // drowCell(x, item.y + 20, item.width + x + offset, item.height)
    ctx.font = "italic 20px Arial";
    
    ctx.fillText(loop * items.length + index, x, 20);
  })
}

function mouseMove(e) {
  offset = e.layerX - xFromMouseDown
  
  globalOffset = offset + xLastPosition
  if (e.layerX + 20 > WIDTH || e.layerX < 20) cancelAnimationFrame(raf)
}

function draw() {
  removeAll()
  drowItems(globalOffset)
  raf = requestAnimationFrame(draw)
  ctx.fillText('offset: ' + globalOffset , 100, 200);
}

const items = getItems(Item, 3, WIDTH)
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



// ctx.beginPath()

// ctx.moveTo(10, 10)
// ctx.lineTo(50, 10)
// ctx.lineTo(50, 80)
// ctx.lineTo(10, 80)
// ctx.closePath()

// ctx.moveTo(60, 10)
// ctx.lineTo(100, 10)
// ctx.lineTo(100, 80)
// ctx.lineTo(60, 80)
// ctx.closePath()






// ctx.stroke()
// ctx.fill()
// ctx.moveTo(x + 20, y)