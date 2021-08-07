import Application from './modules/Application.js'
import Grid from './modules/Grid.js'

const app = new Application({
  background: 'gray',
  x: 10,
  y: 10,
  width: 500,
  height: 750,
  content: [
    {
      key: 'grid',
      width: 500,
      height: 500,
    },
    {
      key: 'controller',
      y: 500,
      width: 500,
      height: 125,
    },
    {
      y: 625,
      width: 500,
      height: 125,
    },
  ],
})

document.body.append(app.canvas.element)

// console.log(app)

const gridBox = app.container.getBox('grid')

gridBox.add(new Grid())
// const mixin = (currentClass, ...additionalClasses) => {
//   for (const additionalClass of additionalClasses) {
//     Object.assign(currentClass.prototype, additionalClass.prototype)
//   }
// }
