let _blocks = []

const sliderContainer = document.querySelector('.slider-container')
const sliderRight = document.querySelector('.slider-right')
const sliderRightContainer = sliderRight.querySelector('.slider-right-container')
const sliderLeft = document.querySelector('.slider-left')
const buttonUp = document.querySelector('.button-up')
const buttonDown = document.querySelector('.button-down')
const buttonNext = document.querySelector('.next')
const buttonPreious = document.querySelector('.previous')
const buttonPlay = document.querySelector('.playButton')
const skipToggle = document.querySelector('.toggleSkip')
const orientationButton = document.querySelector('.orientation-button')
let actionButtons = document.querySelector('.action-buttons')
actionButtons = actionButtons.querySelectorAll('button')

console.log(`Собственная оценка работы:30 баллов.\n
Слайдер изначально был реализован почти как в примере, за исключением того, что сами слайды не хардкодил в html - а создавал через js. \n
Зацикленный слайдер реализовал способом анимации движения и смещения крайнего слайда. Из отличий - не стал подключать jQuery как в примере, только для этого пункта, реализовал на чистом js.\n
Дополнительные задания: реализовал переключение слайдов колесом мыши, если у вас ноутбук - постарался максимально убрать эффект иннерциальной прокрутки.\n
Не стал внедрять в контейнер слайдера видео или музыку - дополнил слайдер \"Плеером\", мне кажется - так интереснее выглядит.\n
Так же добавил переключение слайдера с вертикального в горизонтальный вид (крайняя правая кнопка) - сами движения слайдов оставил вертикальными - верхние слайды перекрыты нижними, нижние слайды вложены в контейнер с overflow:hidden.\n
В целом - последние два доп. задания сам считаю не совсем по ТЗ, хотя некоторые задания можно трактовать по своему, но считаю что свои 30 баллов я заслужил.\n
Спасибо за проверку.`)

const initSlides = () => {
    sliderLeft.style.top = `-${sliderLeft.offsetHeight}px`
    sliderRightContainer.style.top = `-${sliderRightContainer.offsetHeight * 2}px`

}
orientationButton.addEventListener('click', () => {
    sliderContainer.classList.add('fade')
    setTimeout(() => {
        sliderContainer.classList.remove('fade')
    }, 1000);

    setTimeout(() => {
        if (sliderContainer.classList.contains('horizontal')) {
            sliderContainer.classList.remove('horizontal')
            actionButtons.forEach(e => {
                e.style = ''
            })
        } else {
            sliderContainer.classList.add('horizontal')
            setTimeout(() => {
                actionButtons.forEach(e => {
                    let anim = e.animate({ opacity: 0 }, 1000)
                    anim.onfinish = _ => {
                        e.style.opacity = 0
                    }
                })

            }, 2000)
        }
        initSlides()
    }, 500);




})

initSlides()


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
    _blocks.push(block)
}
const getBlocks = () => {
    _blocks.forEach(block => {
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
        sliderRightContainer.prepend(divRight)
        divRight.style.backgroundImage = `url(assets/images/${block.image})`
    })
}

addBlock(Block('Beach', 'by the ocean', 'skyblue', 'beach.jpg', 'seaside.mp3'))
addBlock(Block('Foggy', 'forest', 'darkslategray', 'forest.jpg', 'forest.mp3'))
addBlock(Block('Sunset', 'pier', 'coral', 'pier.jpg', 'sunset.mp3'))
addBlock(Block('Boat', 'on a river', 'cyan', 'river.jpg', 'river.mp3'))
document.body.onload = getBlocks()



const slidesLength = _blocks.length

let activeSlideIndex = 0
const onResize = () => {
    const slideHeight = sliderContainer.clientHeight

    sliderRight.style.transform = `translateY(-${activeSlideIndex*slideHeight}px)`
    sliderLeft.style.transform = `translateY(${activeSlideIndex*slideHeight}px)`
}
window.addEventListener('resize', onResize)


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
audio.src = _blocks[currentSlide].audio

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
        let lAnim = sliderLeft.animate({
            top: `0px`
        }, animationTime)
        lAnim.onfinish = () => {
            sliderLeft.prepend(sliderLeft.lastChild)
            sliderLeft.style.top = `-${sliderLeft.offsetHeight}px`
            sliding = false
        }
        let rAnim = sliderRightContainer.animate({
            top: `-${sliderRightContainer.offsetHeight * 3}px`
        }, animationTime)
        rAnim.onfinish = () => {
            sliderRightContainer.append(sliderRightContainer.firstChild)
            sliderRightContainer.style.top = `-${sliderRightContainer.offsetHeight*2}px`
        }
    } else if (direction === 'down') {
        currentSlide++
        if (currentSlide > slidesLength - 1) {
            currentSlide = 0
        }

        let lAnim = sliderLeft.animate({
            top: `-${sliderLeft.offsetHeight*2}px`
        }, animationTime)
        lAnim.onfinish = () => {
            sliderLeft.append(sliderLeft.firstChild)
            sliderLeft.style.top = `-${sliderLeft.offsetHeight}px`
            sliding = false
        }
        let rAnim = sliderRightContainer.animate({
            top: `-${sliderRightContainer.offsetHeight}px`
        }, animationTime)
        rAnim.onfinish = () => {
            sliderRightContainer.prepend(sliderRightContainer.lastChild)
            sliderRightContainer.style.top = `-${sliderRightContainer.offsetHeight*2}px`
        }
    }
    if (!skipToggle.checked) {
        audio.src = _blocks[currentSlide].audio
        if (play) {
            audio.play()
        }
    }
}