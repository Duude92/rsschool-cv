import getTimeOfDay from "./timeofday.js"

const sliderContainer = document.getElementById("slider-container")
const sliderLeft = document.querySelector(".slide-prev")
const sliderRight = document.querySelector(".slide-next")
let slides = []
let currentSlide = 0
let slideWidth = document.body.clientWidth
let sliding = false

let InitializeBackgroundSlider = _ => {
    for (let index = 0; index < 3; index++) {
        let slide = document.createElement('div')
        slide.className = "slide"
        sliderContainer.append(slide)
        slides.push(slide)
    }

    currentSlide = Math.floor(Math.random() * 19)

    initImages()

    document.documentElement.style.setProperty("--slide-width", slideWidth + 'px')
    document.documentElement.style.setProperty("--slider-width", slideWidth * 3 + 'px')
    document.documentElement.style.setProperty("--left-position", -slideWidth + 'px')
}
let animateSliderPosition = (position, direction) => {
    if (sliding) return
    sliding = true
    currentSlide += direction
    let anim = sliderContainer.animate({ left: position }, 500)
    anim.onfinish = _ => {
        if (direction === -1)
            sliderContainer.prepend(sliderContainer.lastChild)
        else if (direction === 1)
            sliderContainer.append(sliderContainer.firstChild)
        initImages()
        sliding = false
    }
}
let initImages = _ => {
    for (let index = 0; index < 3; index++) {
        let nextSlide = currentSlide + index
        if (nextSlide > 20) {
            nextSlide -= 20
        }
        if (nextSlide < 1) {
            nextSlide += 20
        }

        if (nextSlide < 10)
            nextSlide = '0' + nextSlide

        sliderContainer.children[index].style.backgroundImage = `url(https://raw.githubusercontent.com/Duude92/stage1-tasks/assets/images/${getTimeOfDay()}/${nextSlide}.jpg)`

    }
}

sliderLeft.onclick = _ => {
    animateSliderPosition(0, -1)
}
sliderRight.onclick = _ => {
    animateSliderPosition(-slideWidth * 2 + 'px', 1)
}




export default InitializeBackgroundSlider