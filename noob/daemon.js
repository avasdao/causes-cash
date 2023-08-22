const fs = require('fs')

const {
    createCanvas,
    loadImage,
    registerFont,
} = require('canvas')

let imageCanvas
let context

const createPublic = () => {
    imageCanvas = createCanvas(2000, 2000)

    context = imageCanvas.getContext('2d')

    registerFont('./fonts/LDFComicSans.ttf', { family: 'Comic Sans' })

    context.fillStyle = '#343a40'
    context.fillRect(0, 0, 2000, 2000)

    context.fillStyle = '#fff'
    context.font = 'bold 30pt Menlo'
    context.fillText('apecs.dev', 580, 520)

    fs.writeFileSync(
        `./assets/public.png`,
        imageCanvas.toBuffer('image/png'),
    )
}

const createFront = () => {
    imageCanvas = createCanvas(300, 300)

    context = imageCanvas.getContext('2d')

    registerFont('./fonts/LDFComicSans.ttf', { family: 'Comic Sans' })

    context.fillStyle = '#343a40'
    context.fillRect(0, 0, 300, 300)

    context.fillStyle = '#fff'
    context.font = 'bold 30pt Menlo'
    context.fillText('lumber', 80, 180)

    fs.writeFileSync(
        `./assets/cardf.png`,
        imageCanvas.toBuffer('image/png'),
    )
}

const createBack = () => {
    imageCanvas = createCanvas(300, 300)

    context = imageCanvas.getContext('2d')

    registerFont('./fonts/LDFComicSans.ttf', { family: 'Comic Sans' })

    context.fillStyle = '#343a40'
    context.fillRect(0, 0, 300, 300)

    context.fillStyle = '#fff'
    context.font = 'bold 20pt Menlo'
    context.fillText('apecs.dev', 40, 260)

    fs.writeFileSync(
        `./assets/cardb.png`,
        imageCanvas.toBuffer('image/png'),
    )
}

const createPrivate = () => {
    // TBD
}

createPublic()
createFront()
createBack()
