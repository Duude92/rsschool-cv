jQuery(document).ready(function($) {
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
    }
    window.addEventListener('resize', onResize)


    sliderLeft.style.top = `-100vh`
    sliderRight.style.top = `-200vh`

    buttonUp.addEventListener('click', () => changeSlide('up'))
    buttonDown.addEventListener('click', () => changeSlide('down'))
    const animationTime = 500

    const changeSlide = (direction) => {
        const slideHeight = sliderContainer.clientHeight
        if (direction === 'up') {
            $('.slider-left').animate({
                top: ''
            }, animationTime, function() {
                sliderLeft.prepend(sliderLeft.lastChild)
                sliderLeft.style.top = '-100vh'
                console.log('slide')
            })
            $('.slider-right').animate({
                top: '-300vh'
            }, animationTime, function() {
                sliderRight.append(sliderRight.firstChild)
                sliderRight.style.top = '-200vh'
                console.log('slide')
            })

        } else if (direction === 'down') {
            $('.slider-left').animate({
                top: '-200vh'
            }, animationTime, function() {
                sliderLeft.append(sliderLeft.firstChild)
                sliderLeft.style.top = '-100vh'
                console.log('slide')
            })
            $('.slider-right').animate({
                top: '-100vh'
            }, animationTime, function() {
                sliderRight.prepend(sliderRight.lastChild)
                sliderRight.style.top = '-200vh'
                console.log('slide')
            })
        }
        // console.log(new WebKitCSSMatrix(window.getComputedStyle(sliderRight).transform))
        //     //sliderRight.style.transform = `translateY(-${activeSlideIndex*slideHeight}px)`
        // console.log(window.getComputedStyle(sliderRight).transform)


        //sliderLeft.style.transform = `translateY(${activeSlideIndex*slideHeight}px)`
        //new WebKitCSSMatrix(window.getComputedStyle(sliderLeft).transform
        //sliderLeft.style.top += 100;
    }
})