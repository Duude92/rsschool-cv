let blocks = []

const sliderContainer = document.querySelector('.slider-container')
const sliderRight = document.querySelector('.slider-right')
const sliderLeft = document.querySelector('.slider-left')
const buttonUp = document.querySelector('.button-up')
const buttonDown = document.querySelector('.button-down')
const buttonNext = document.querySelector('.next')
const buttonPreious = document.querySelector('.previous')
const buttonPlay = document.querySelector('.playButton')
const skipToggle = document.querySelector('.toggleSkip')


const Block = (title, description, bgcolor, imagePath, audioSource) => {
    return {
        title: title,
        description: description,
        backgroundcolor: bgcolor,
        image: imagePath,
        audio: 'assets/audio/' + audioSource
    }
}
const addBlock = (block) => {
    blocks.push(block)
}
const getBlocks = () => {
    blocks.forEach(block => {
        let divLeft = document.createElement('div')
        divLeft.className = 'leftImageContainer'
        divLeft.style.backgroundColor = block.backgroundcolor
        divLeft.style.backgroundImage = `url(assets/images/${block.image})`
        let container = document.createElement('div')
        sliderLeft.appendChild(container)

        let h1 = document.createElement('h1')
        h1.innerText = block.title
        container.appendChild(h1)
        let p = document.createElement('p')
        p.innerText = block.description
        container.appendChild(p)
        container.append(divLeft)

        let divRight = document.createElement('div')
        sliderRight.prepend(divRight)
        divRight.style.backgroundImage = `url(assets/images/${block.image})`
    })
}

addBlock(Block('Beach', 'by the ocean', 'skyblue', 'beach.jpg', 'seaside.mp3'))
addBlock(Block('Foggy', 'forest', 'darkslategray', 'forest.jpg', 'forest.mp3'))
addBlock(Block('Sunset', 'pier', 'coral', 'pier.jpg', 'sunset.mp3'))
addBlock(Block('Boat', 'on a river', 'cyan', 'river.jpg', 'river.mp3'))
document.body.onload = getBlocks()



const slidesLength = blocks.length

let activeSlideIndex = 0
const onResize = () => {
    const slideHeight = sliderContainer.clientHeight

    sliderRight.style.transform = `translateY(-${activeSlideIndex*slideHeight}px)`
    sliderLeft.style.transform = `translateY(${activeSlideIndex*slideHeight}px)`
}
window.addEventListener('resize', onResize)


sliderLeft.style.top = `-100vh`
sliderRight.style.top = `-200vh`

buttonUp.addEventListener('click', () => changeSlide('up'))
buttonDown.addEventListener('click', () => changeSlide('down'))
buttonNext.addEventListener('click', () => changeSlide('up'))
buttonPreious.addEventListener('click', () => changeSlide('down'))
buttonPlay.addEventListener('click', () => playSound())
const audio = document.createElement('audio')
audio.loop = true
document.body.append(audio)
let play = false
const playSound = () => {
    play = !play
    if (play) {
        buttonPlay.firstChild.className = 'fas fa-pause'
        audio.play()
    } else {
        buttonPlay.firstChild.className = 'fas fa-play'

        audio.pause()
    }
}
const animationTime = 500
let sliding = false
let lastDelta = 0
let lastScrollDeltaTime = 0


window.addEventListener('mousewheel', (ev) => {
    lastScrollDeltaTime += new Date().getTime()

    if ((Math.abs(ev.deltaY) < 100) || (ev.deltaY % 100 !== 0) || (sliding) || (lastDelta > Math.abs(ev.deltaY))) {
        //Пробовал реализовать ограничения для инерционного скролла тачпадом, это максимум что смог реализовать самостоятельно
        //ev.deltaY кратный 100 только на мыши, так же идет проверка нисходящих сигналов, у мыши сигнал ровный
        lastDelta = Math.abs(ev.deltaY)
        return
    }
    lastScrollDeltaTime = 0
    lastDelta = Math.abs(ev.deltaY)


    ev = ev || window.event
    let delta = ev.deltaY || ev.detail || ev.wheelDelta;
    changeSlide((delta > 0) ? 'up' : 'down')


}, { passive: false })
let currentSlide = 1
audio.src = blocks[currentSlide].audio

const changeSlide = (direction) => {

    sliding = true

    if (!skipToggle.checked) {
        audio.pause()
    }
    const slideHeight = sliderContainer.clientHeight
    if (direction === 'up') {
        currentSlide--
        if (currentSlide < 0) {
            currentSlide = slidesLength - 1
        }
        let lAnim = sliderLeft.animate({ top: '0vh' }, animationTime)
        lAnim.onfinish = () => {
            sliderLeft.prepend(sliderLeft.lastChild)
            sliderLeft.style.top = '-100vh'
            sliding = false
        }
        let rAnim = sliderRight.animate({ top: '-300vh' }, animationTime)
        rAnim.onfinish = () => {
            sliderRight.append(sliderRight.firstChild)
            sliderRight.style.top = '-200vh'
        }
    } else if (direction === 'down') {
        currentSlide++
        if (currentSlide > slidesLength - 1) {
            currentSlide = 0
        }

        let lAnim = sliderLeft.animate({ top: '-200vh' }, animationTime)
        lAnim.onfinish = () => {
            sliderLeft.append(sliderLeft.firstChild)
            sliderLeft.style.top = '-100vh'
            sliding = false
        }
        let rAnim = sliderRight.animate({ top: '-100vh' }, animationTime)
        rAnim.onfinish = () => {
            sliderRight.prepend(sliderRight.lastChild)
            sliderRight.style.top = '-200vh'
        }
    }
    if (!skipToggle.checked) {
        audio.src = blocks[currentSlide].audio
        if (play) {
            audio.play()
        }
    }
}