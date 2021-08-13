let blocks = []

const sliderContainer = document.querySelector('.slider-container')
const sliderRight = document.querySelector('.slider-right')
const sliderLeft = document.querySelector('.slider-left')
const buttonUp = document.querySelector('.button-up')
const buttonDown = document.querySelector('.button-down')


const Block = (title, description, bgcolor, imagePath) => {
    return {
        title: title,
        description: description,
        backgroundcolor: bgcolor,
        image: imagePath
    }
}
const addBlock = (block) => {
    blocks.push(block)
}
const getBlocks = () => {
    blocks.forEach(block => {
        let divLeft = document.createElement('div')
        divLeft.style.backgroundColor = block.backgroundcolor
        sliderLeft.append(divLeft)
        let h1 = document.createElement('h1')
        h1.innerText = block.title
        divLeft.appendChild(h1)
        let p = document.createElement('p')
        p.innerText = block.description
        divLeft.appendChild(p)
        let divRight = document.createElement('div')
        sliderRight.prepend(divRight)
        divRight.style.backgroundImage = `url(assets/images/${block.image})`
    })
}

addBlock(Block('Beach', 'by the ocean', 'skyblue', 'beach.jpg'))
addBlock(Block('Foggy', 'forest', 'darkslategray', 'forest.jpg'))
addBlock(Block('Sunset', 'pier', 'coral', 'pier.jpg'))
addBlock(Block('Boat', 'on a river', 'cyan', 'river.jpg'))
document.body.onload = getBlocks()



const slidesLength = blocks.length

let activeSlideIndex = 0
const onResize = () => {
    const slideHeight = sliderContainer.clientHeight

    sliderRight.style.transform = `translateY(-${activeSlideIndex*slideHeight}px)`
    sliderLeft.style.transform = `translateY(${activeSlideIndex*slideHeight}px)`

    console.log('resized')
}
window.addEventListener('resize', onResize)


sliderLeft.style.top = `-${(slidesLength - 1)*100}vh`

buttonUp.addEventListener('click', () => changeSlide('up'))
buttonDown.addEventListener('click', () => changeSlide('down'))

const changeSlide = (direction) => {
    const slideHeight = sliderContainer.clientHeight
    if (direction === 'up') {
        activeSlideIndex++
        if (activeSlideIndex > slidesLength - 1) { activeSlideIndex = 0 }
    } else if (direction === 'down') {
        activeSlideIndex--
        if (activeSlideIndex < 0) { activeSlideIndex = slidesLength - 1 }
    }
    sliderRight.style.transform = `translateY(-${activeSlideIndex*slideHeight}px)`
    sliderLeft.style.transform = `translateY(${activeSlideIndex*slideHeight}px)`
}