class slide {
    constructor(url) {
        this.url = url
    }
    InitOnPage = (selector) => {
        let container = document.createElement('div')
        container.className = 'slide'
        container.style.backgroundImage = `url(${this.url})`
        selector.style.width = selector.offsetWidth + 1000 + 'px';
        selector.appendChild(container)

        let tempElement = document.createElement('div')
        tempElement.className = 'slide-button'
        slideButtons.appendChild(tempElement)
    }
}
class video {
    constructor(url) {
        this.url = url
        this.innerHTML = `<iframe src="${url}" loading="lazy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }
    Init = (selector) => {
        selector.innerHTML += this.innerHTML
            // selector.style.width = selector.offsetWidth + 486 + 'px';

        let elem = document.createElement('div')
        elem.className = "video-dot"
        videoSliderDots.append(elem)
    }
}
let sliderContainer = document.querySelector(".slides")
let leftArrow = document.querySelector(".arrow-left")
let rightArrow = document.querySelector(".arrow-right")
let currentSlide = document.querySelector(".actual-number")
let slideButtons = document.querySelector(".slide-buttons")
const videoSliderContainer = document.querySelector(".video-slider-container")
const videoSliderDots = document.querySelector(".video-slider-dots")
let videoButtonLeft = document.getElementById("video-left")
let videoButtonRight = document.getElementById("video-right")
let galleryContainer = document.querySelector(".gallery-container")
const buyButton = document.querySelector(".buy-button")
const bookingPanel = document.querySelector(".booking")
const paymentClose = document.querySelector(".payment-close")
const videoProgressBar = document.getElementById("scrollbar")
const pageScrollBar = document.querySelector(".pade-scroll")
const navButton = document.getElementById("navOpen")
const welcomeLeftContainer = document.querySelector(".welcome-left-content")
const mainBlock = document.getElementsByTagName("main")[0]
const header = document.getElementsByTagName("header")[0]
const footerHide = document.querySelectorAll(".footer-hide")
const social = document.querySelector(".social")
const endBlock = document.querySelector(".end")
let sliding = false
let isVideoSliding = false
let slideNum = 1
let mainHidden = false

let slides = []
slides.push(new slide('assets/img/Welcome-slider/1.jpg'))
slides.push(new slide('assets/img/Welcome-slider/2.jpg'))
slides.push(new slide('assets/img/Welcome-slider/3.jpg'))
slides.push(new slide('assets/img/Welcome-slider/4.jpg'))
slides.push(new slide('assets/img/Welcome-slider/5.jpg'))

slides.forEach(slide => slide.InitOnPage(sliderContainer))

let videos = []
videos.push(new video('https://www.youtube.com/embed/zp1BXPX8jcU'))
videos.push(new video('https://www.youtube.com/embed/Vi5D6FKhRmo'))
videos.push(new video('https://www.youtube.com/embed/NOhDysLnTvY'))
videos.push(new video('https://www.youtube.com/embed/aWmJ5DgyWPI'))
videos.push(new video('https://www.youtube.com/embed/2OR0OCr6uRE'))
videoSliderContainer.style.width = 0
videos.forEach(v => v.Init(videoSliderContainer))

let galleryImages = []
for (let index = 1; index <= 15; index++) {
    galleryImages.push(`assets/img/Gallery/galery${index}.jpg`)
}
galleryImages.sort(() => .5 - Math.random())

galleryImages.forEach(img => {
    let tempImage = new Image()
    tempImage.src = img
    galleryContainer.append(tempImage)
})

//---methods
let moveSlide = (direction) => {
    if (sliding) return
    sliding = true
    slideNum += direction
    if (slideNum < 1) slideNum = sliderContainer.childElementCount
    else if (slideNum > sliderContainer.childElementCount) slideNum = 1

    currentSlide.innerHTML = '0' + slideNum
    if (direction === -1) {
        sliderContainer.style.left = '-1000px'
        sliderContainer.prepend(sliderContainer.lastChild);
        let anim = sliderContainer.animate({ left: `0px` }, 500)
        anim.onfinish = _ => {
            sliderContainer.style.left = ''
            sliding = false
        }
    }
    if (direction === 1) {
        sliderContainer.style.left = '0px'
        let anim = sliderContainer.animate({ left: `-1000px` }, 500)
        anim.onfinish = _ => {
            sliderContainer.style.left = ''
            sliderContainer.append(sliderContainer.firstChild);

            sliding = false
        }
    }
}
let moveVideo = (direction) => {
    if (isVideoSliding) return
    isVideoSliding = true

    if (direction === -1) {
        videoSliderContainer.style.left = '-486px'
        videoSliderContainer.prepend(videoSliderContainer.lastChild);
        let anim = videoSliderContainer.animate({ left: `0px` }, 500)
        anim.onfinish = _ => {
            videoSliderContainer.style.left = ''
            isVideoSliding = false
        }
    }
    if (direction === 1) {
        videoSliderContainer.style.left = ''
        videoSliderContainer.append(videoSliderContainer.firstChild);
        let anim = videoSliderContainer.animate({ left: `-486px` }, 500)
        anim.onfinish = _ => {
            videoSliderContainer.style.left = ''
            isVideoSliding = false
        }
    }
}
let setVideoProgress = (value) => document.documentElement.style.setProperty('--progress-position', (value) + '%')
let setVolume = (value) => document.documentElement.style.setProperty('--volume-position', (value) + '%')

setVideoProgress(50)
setVolume(50)
    //---events
buyButton.addEventListener('click', _ => {
    bookingPanel.animate({ left: 0 }, 500).onfinish = _ => bookingPanel.style.left = '0'
    if (document.body.clientWidth <= 768) {
        window.scroll(0, 0)
    }
})
paymentClose.addEventListener('click', _ => bookingPanel.animate({ left: '-110%' }, 500).onfinish = _ => bookingPanel.style = '')
videoButtonLeft.addEventListener('click', _ => moveVideo(-1))
videoButtonRight.addEventListener('click', _ => moveVideo(1))
leftArrow.addEventListener('click', _ => moveSlide(-1))
rightArrow.addEventListener('click', _ => moveSlide(1))
window.onload = () => {
    let body = document.querySelector('.preload')

    body.className = ''
}
navButton.onchange = _ => {
    if (document.body.clientWidth <= 420) {

    } else if (document.body.clientWidth <= 768) {
        if (navButton.checked) {
            mainBlock.style.display = "none"
            footerHide.forEach(e => e.style.display = "none")
                // footerHide.style.display = "none"
            social.classList.add("social-only")
            endBlock.style.display = "none"
            header.classList.add("expanded")

        } else {
            mainBlock.style.display = ""
            footerHide.forEach(e => e.style = "")

            social.classList.remove("social-only")
            header.classList.remove("expanded")

            endBlock.style = ""
        }


    } else if (document.body.clientWidth <= 1024)
        if (navButton.checked) {
            welcomeLeftContainer.style.display = "none"
        } else {
            welcomeLeftContainer.style = ""
        }
}