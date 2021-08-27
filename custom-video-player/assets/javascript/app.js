const videoSelector = document.querySelector('.video-selector')
const video = document.querySelector('video')
const playButtons = document.querySelectorAll('.play')
const playMain = document.querySelector('.play-main')
const controls = document.querySelector('.custom-controls')
const progressBar = document.getElementById('progressBar')
const volumeBar = document.getElementById('volumeBar')
const fullscreen = document.querySelector('.fullscreen')
const videoPlayer = document.querySelector('.video-player')
let cards = []
let videoTime = 0
let isProgressBarTouching = false
let currentVideo
class VideoCard {
    constructor(videoName) {
        this.videoUrl = `assets/video/${videoName}.mp4`
        this.imageUrl = `assets/images/${videoName}.jpg`
        this.title = videoName
        this.playVideo = _ => {
            currentVideo = this
            video.style.height = video.offsetHeight + 'px'
            video.src = this.videoUrl
                // progressBar.max = video.duration
            setTimeout(_ => {
                video.style = ''
            }, 1500)
            playVideo()
        }
    }
}
progressBar.onmousedown = _ => {
    isProgressBarTouching = true
}
progressBar.onmouseup = _ => {
    isProgressBarTouching = false
}

fullscreen.addEventListener('click', _ => {
    videoPlayer.requestFullscreen()

    console.log(video.controls)
})

const setVolume = (value) => {
    video.volume = value
}

const setVideoTime = (value) => {
    console.log(value)
    video.currentTime = value
}

const addCard = (card) => {
    cards.push(card)
}

const pauseVideo = () => {
    video.pause()
    playButtons.forEach(button => {
        let icon = button.querySelector('i')
        icon.classList.remove('fa-pause')
        icon.classList.add('fa-play')
    })
}

const playVideo = () => {
    video.load()
    video.onloadedmetadata = _ => {
        progressBar.max = video.duration
        playButtons.forEach(button => {
            let icon = button.querySelector('i')
            icon.classList.remove('fa-play')
            icon.classList.add('fa-pause')
        })
        setTimeout(_ => {
            let pAnim = playMain.animate({ opacity: 0 }, 1000)
            let cAnim = controls.animate({ opacity: 0 }, 1000)
            pAnim.onfinish = _ => {
                playMain.classList.add('hide')
                controls.classList.add('hide')
            }
        }, 1000)
        video.play()
    }

}

addCard(new VideoCard('Ocean'))
addCard(new VideoCard('Rock_Balance'))

cards.forEach(card => {
    let cardImage = new Image(200, 100)
    cardImage.src = card.imageUrl
    let container = document.createElement('div')
    container.className = 'card-video'
    videoSelector.appendChild(container)


    let p = document.createElement('p')
    p.innerText = card.title
    container.appendChild(cardImage)
    container.appendChild(p)
    let selector = document.createElement('div')
    selector.className = 'video-card-selector'
    container.appendChild(selector)

    container.addEventListener('click', _ => card.playVideo())
})

playButtons.forEach(button => {
    button.addEventListener('click', _ => {
        if (video.paused) {
            playVideo()
        } else {
            pauseVideo()
        }
    })
})

video.onmousemove = _ => {
    playMain.classList.remove('hide')
    controls.classList.remove('hide')
}
video.onended = _ => {
    let index = cards.indexOf(currentVideo)
    if (index + 1 === cards.length) {
        pauseVideo()
    } else {
        cards[index + 1].playVideo()
    }
}

video.ontimeupdate = (ev) => {
    if (!isProgressBarTouching) {
        progressBar.value = video.currentTime
    }
}