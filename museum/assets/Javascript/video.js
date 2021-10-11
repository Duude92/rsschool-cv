const videoSelector = document.querySelector('.video-selector')
const videoContainer = document.querySelector('video')
const playButtons = document.querySelectorAll('.play')
const playMain = document.querySelector('.play-main')
const controls = document.querySelector('.custom-controls')
const progressBar = document.getElementById('scrollbar')
const volumeBar = document.getElementById('volumebar')
const fullscreen = document.querySelector('.fullscreen')
const videoPlayer = document.querySelector('.video-player')
const videoPlayerContainer = document.querySelector('.video-player-container')
const muteButton = document.querySelector('.mute')
const videoTitle = document.getElementById('videoTitle')
const videoDescription = document.getElementById('videoDescription')

let playlist = []
let videoTime = 0
let isProgressBarTouching = false
let currentVideo
let lastVolume = 100
let fileNameList = []
let cards = []
let playListIndex = 0
class VideoCard {
    constructor(videoName) {
        this.videoUrl = `assets/video/${videoName}.mp4`
        this.imageUrl = `assets/images/${videoName}.jpg`
        this.title = videoName
        this.description = `Desctription for: ${this.title}\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }
    playVideo = _ => {
        videoContainer.style.height = videoContainer.offsetHeight + 'px'
        this.setVideo()
        setTimeout(_ => {
            videoContainer.style = ''
        }, 1500)
        playVideo()
    }
    setVideo = _ => {
        videoTitle.innerText = this.title
        videoDescription.innerText = this.description
        document.documentElement.style.setProperty('--progress-position', '0%')
        currentVideo = this
        videoContainer.src = this.videoUrl
        return this
    }

}
const mute = _ => {
    if (videoContainer.muted) {
        muteButton.style = ''
            // innerButton.classList.remove('fa-volume-mute')
            // innerButton.classList.add('fa-volume-up')
        videoContainer.muted = false
        setVolume(lastVolume)
    } else {
        muteButton.style.backgroundImage = "url('assets/svg/mute.svg')"

        // innerButton.classList.remove('fa-volume-up')
        // innerButton.classList.add('fa-volume-mute')
        lastVolume = volumeBar.value
        videoContainer.muted = true
        setVolume(0)
    }
}
muteButton.addEventListener('click', _ => {
    mute()
})
progressBar.onmousedown = _ => {
    isProgressBarTouching = true
}
progressBar.onmouseup = _ => {
    isProgressBarTouching = false
}


document.onfullscreenchange = _ => {
    if (document.fullscreenElement) {
        fullscreen.style.backgroundImage = "url(assets/svg/collapse.svg)"
        fullscreen.style.backgroundSize = "200% 200%"
        fullscreen.style.backgroundPosition = "center"
        controls.classList.add('fullscreen')
    } else {
        fullscreen.style = ''
        controls.classList.remove('fullscreen')

    }
}
fullscreen.addEventListener('click', _ => {
    let icon = fullscreen.querySelector('i')
    if (!document.fullscreenElement) {
        videoPlayerContainer.requestFullscreen()
            // videoPlayer.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})
window.onkeypress = (key) => {
    switch (key.code) {
        case "KeyF":
            if (!document.fullscreenElement) {
                videoPlayerContainer.requestFullscreen()
                    // videoPlayer.requestFullscreen()
            } else {
                document.exitFullscreen()
            }
            break;
        case "KeyM":
            mute()
            break;
        case "Space":
            if (document.activeElement === playMain) {
                return
            }
            if ((key.target == document.body) || (key.target == playMain)) {
                key.preventDefault()
            }
            if (!videoContainer.paused) {
                pauseVideo()
            } else {
                playVideo()
            }
            break;
        case "Period":
            if (videoContainer.playbackRate < 15.5)
                videoContainer.playbackRate += 0.1
            break;
        case "Comma":
            if (videoContainer.playbackRate > 0.15)
                videoContainer.playbackRate -= 0.1
            break;

        default:
            break;
    }
}


const setVolume = (value) => {
    if (videoContainer.muted && value !== 0) {
        videoContainer.muted = false
        muteButton.style = ''
    }
    videoContainer.volume = value / 100
    volumeBar.value = value
    document.documentElement.style.setProperty('--volume-position', value + '%')
    if (value == 0) {
        muteButton.style.backgroundImage = "url('assets/svg/mute.svg')"
        videoContainer.muted = true
    }

}
const setVideoProgress = (value) => {


    document.documentElement.style.setProperty('--progress-position', (value / videoContainer.duration * 100) + '%')
}

const setVideoTime = (value) => {
    setVideoProgress(value)
    videoContainer.currentTime = value
}

const addCard = (card) => {
    playlist.push(card)
}

const pauseVideo = () => {
    videoContainer.pause()
    playButtons.forEach(button => {
        button.classList.remove('pausebutton')
    })
}
let fading = false
videoContainer.onmouseleave = _ => {
    if (videoContainer.played.length > 0) {
        setTimeout(_ => {
            fading = true
            if (fading) {
                let pAnim = playMain.animate({ opacity: 0 }, 2000)
                let cAnim = controls.animate({ opacity: 0 }, 2000)
                pAnim.onfinish = _ => {
                    playMain.classList.add('hide')
                    controls.classList.add('hide')
                    document.body.style.cursor = 'none'
                }
            }
        }, 1000)
    }
}
progressBar.value = 0
setVolume(50)
const playVideo = () => {
    progressBar.max = videoContainer.duration

    if (!videoContainer.paused) {
        videoContainer.load()
        videoContainer.onloadedmetadata = _ => {
            progressBar.max = videoContainer.duration


        }
    }
    playButtons.forEach(button => {
        button.classList.add('pausebutton')
    })
    videoContainer.play()


}
const nextVideo = _ => {
    if (playlist.length - 1 <= playListIndex) {
        pauseVideo()
    } else {
        playlist[playListIndex + 1].playVideo()
        playListIndex++
    }
}
const previousVideo = _ => {
    if (!playListIndex) {
        pauseVideo()
    } else {
        playlist[playListIndex - 1].playVideo()
        playListIndex--
    }
}

const playlistUpdate = () => {
    while (videoSelector.firstChild) {
        videoSelector.removeChild(videoSelector.firstChild)
    }
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
}

playButtons.forEach(button => {
    button.addEventListener('click', _ => {
        if (videoContainer.paused) {
            playVideo()
        } else {
            pauseVideo()
        }
    })
})

videoContainer.onmousemove = _ => {
    playMain.classList.remove('hide')
    controls.classList.remove('hide')
}
window.onmousemove = _ => {
    document.body.style.cursor = 'initial'
    fading = false
}
videoContainer.onended = _ => {
    nextVideo()
}

videoContainer.ontimeupdate = (ev) => {
    if (!isProgressBarTouching) {
        let currentTime = videoContainer.currentTime

        if (isNaN(videoContainer.duration)) {
            document.documentElement.style.setProperty('--progress-position', '0%')
            return
        }
        progressBar.value = currentTime
        document.documentElement.style.setProperty('--progress-position', (currentTime / videoContainer.duration * 100) + '%')
    }
}