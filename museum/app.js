class slide {
    constructor(url) {
        this.url = url
    }
    InitOnPage = (selector) => {
        let container = document.createElement('div')
        container.className = 'slide'
        container.style.backgroundImage = `url(${this.url})`
        selector.appendChild(container)
        container.style.width = container.offsetWidth + 1000;
    }
}
let sliderContainer = document.querySelector(".slides")

slides = []
slides.push(new slide('assets/img/Welcome-slider/1.jpg'))
slides.push(new slide('assets/img/Welcome-slider/2.jpg'))
slides.push(new slide('assets/img/Welcome-slider/3.jpg'))
slides.push(new slide('assets/img/Welcome-slider/4.jpg'))
slides.push(new slide('assets/img/Welcome-slider/5.jpg'))

slides.forEach(slide => slide.InitOnPage(sliderContainer))
    //---events
window.onload = () => {
    let body = document.querySelector('.preload')

    body.className = ''
}