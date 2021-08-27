const videoSelector = document.querySelector('.video-selector')
const video = document.querySelector('video')
const playButtons = document.querySelectorAll('.play')
const playMain = document.querySelector('.play-main')
const controls = document.querySelector('.custom-controls')
const progressBar = document.getElementById('progressBar')
const volumeBar = document.getElementById('volumeBar')
const fullscreen = document.querySelector('.fullscreen')
const videoPlayer = document.querySelector('.video-player')
const muteButton = document.querySelector('.mute')
const nextButton = document.querySelector('.next')
const prevButton = document.querySelector('.previous')

let playlist = []
let videoTime = 0
let isProgressBarTouching = false
let currentVideo
class VideoCard {
    constructor(videoName) {
        this.videoUrl = `assets/video/${videoName}.mp4`
        this.imageUrl = `assets/images/${videoName}.jpg`
        this.title = videoName
    }
    playVideo = _ => {
        video.style.height = video.offsetHeight + 'px'
        this.setVideo()
        setTimeout(_ => {
            video.style = ''
        }, 1500)
        playVideo()
    }
    setVideo = _ => {
        currentVideo = this
        video.src = this.videoUrl
        return this
    }

}
muteButton.addEventListener('click', _ => {
    setVolume(0)
})
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
nextButton.addEventListener('click', _ => {
    nextVideo()
})
prevButton.addEventListener('click', _ => {
    previousVideo()
})

const setVolume = (value) => {
    console.log(value)
    video.volume = value
    document.documentElement.style.setProperty('--volume-position', (value * 100) + '%')

}
const setVideoProgress = (value) => {
    document.documentElement.style.setProperty('--progress-position', (value / video.duration * 100) + '%')

}

const setVideoTime = (value) => {
    video.currentTime = value
}

const addCard = (card) => {
    playlist.push(card)
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
const nextVideo = _ => {
    let index = playlist.indexOf(currentVideo)
    if (playlist.length - 1 <= index) {
        pauseVideo()
    } else {
        playlist[index + 1].playVideo()
    }
}
const previousVideo = _ => {
    let index = playlist.indexOf(currentVideo)
    if (!index) {
        pauseVideo()
    } else {
        playlist[index - 1].playVideo()
    }
}

addCard(new VideoCard('Ocean').setVideo())
addCard(new VideoCard('Rock_Balance'))
addCard(new VideoCard('Fire'))
addCard(new VideoCard('Ducks'))

//Комментарий к вопросу о карточках
console.log("https://discord.com/channels/516715744646660106/861528325087035422/880751260838535179")

playlist.forEach(card => {
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
    let index = playlist.indexOf(currentVideo)
    if (index + 1 === playlist.length) {
        pauseVideo()
    } else {
        playlist[index + 1].playVideo()
    }
}

video.ontimeupdate = (ev) => {
    if (!isProgressBarTouching) {
        let currentTime = video.currentTime
        progressBar.value = currentTime
        document.documentElement.style.setProperty('--progress-position', (currentTime / video.duration * 100) + '%')
    }
}