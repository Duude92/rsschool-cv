const videoSelector = document.querySelector('.video-selector')
const video = document.querySelector('video')
const playButtons = document.querySelectorAll('.play')
const playMain = document.querySelector('.play-main')
const controls = document.querySelector('.custom-controls')
const progressBar = document.getElementById('progressBar')
const volumeBar = document.getElementById('volume')
const fullscreen = document.querySelector('.fullscreen')
const videoPlayer = document.querySelector('.video-player')
const muteButton = document.querySelector('.mute')
const nextButton = document.querySelector('.next')
const prevButton = document.querySelector('.previous')
const selectFilesButton = document.querySelector('.select-files')

let playlist = []
let videoTime = 0
let isProgressBarTouching = false
let currentVideo
let lastVolume = 100
let fileNameList = []
let cards = []
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
        document.documentElement.style.setProperty('--progress-position', '0%')
        currentVideo = this
        video.src = this.videoUrl
        return this
    }

}
selectFilesButton.addEventListener('click', _ => {
    document.getElementById('file-input').click()
})
const selectFiles = (data) => {
    const files = Array.from(data)

    files.forEach(file => {
        let name = file.name
        name = name.substring(0, name.lastIndexOf('.'))
        fileNameList.push(name)
    })
    let serializedArray = JSON.stringify(fileNameList)
    const type = "text/plain";

    // create file
    const a = document.createElement("a");
    const file = new Blob([serializedArray], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = "db.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    console.log(serializedArray)
}
muteButton.addEventListener('click', _ => {
    if (video.muted) {
        video.muted = false
        setVolume(lastVolume)
    } else {
        lastVolume = volumeBar.value
        video.muted = true
        setVolume(0)
    }
})
progressBar.onmousedown = _ => {
    isProgressBarTouching = true
}
progressBar.onmouseup = _ => {
    isProgressBarTouching = false
}


document.onfullscreenchange = _ => {
    let icon = fullscreen.querySelector('i')
    if (document.fullscreenElement) {
        icon.classList.remove('fa-expand')
        icon.classList.add('fa-compress')
        videoPlayer.requestFullscreen()
    } else {
        icon.classList.add('fa-expand')
        icon.classList.remove('fa-compress')
        document.exitFullscreen()
    }
}
fullscreen.addEventListener('click', _ => {
    let icon = fullscreen.querySelector('i')
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})
document.onkeypress = (key) => {
    console.log(key)
}
nextButton.addEventListener('click', _ => {
    nextVideo()
})
prevButton.addEventListener('click', _ => {
    previousVideo()
})

const setVolume = (value) => {
    if (video.muted && value !== 0) {
        video.muted = false
    }
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



let xmlObj = new XMLHttpRequest()
xmlObj.overrideMimeType("application/json");
xmlObj.open('GET', 'assets/json/db.json', true);
xmlObj.onreadystatechange = _ => {
    if (xmlObj.readyState == 4 && xmlObj.status == "200") {
        fileNameList = JSON.parse(xmlObj.responseText)

        if (fileNameList.length > 0) {
            fileNameList.forEach(fileName => {
                let card = new VideoCard(fileName)
                cards.push(card)
                console.log(card)

            })
        }

        //hardcode
        console.log(cards)
        playlist.push(cards[0])
        playlist.push(cards[1])
        playlist.push(cards[2])
        playlist.push(cards[3])
        playlist[0].setVideo()

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
        let videosContainer = document.querySelector('.videos-container')

        cards.forEach(card => {
            let cardContainer = document.createElement('div')
            let imageContainer = new Image(400, 250)
            imageContainer.src = card.imageUrl
            cardContainer.append(imageContainer)
            let p = document.createElement('p')
            p.innerText = card.title
            cardContainer.append(p)
            let selector = document.createElement('div')
            selector.className = 'video-card-selector'
            cardContainer.appendChild(selector)
            cardContainer.className = 'container-card-video'

            videosContainer.append(cardContainer)
        })

    }
}
xmlObj.send(null)



// addCard(new VideoCard('Ocean').setVideo())
// addCard(new VideoCard('Rock_Balance'))
// addCard(new VideoCard('Fire'))
// addCard(new VideoCard('Ducks'))

//Комментарий к вопросу о карточках
console.log("https://discord.com/channels/516715744646660106/861528325087035422/880751260838535179")



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
        nextVideo()
    }
}

video.ontimeupdate = (ev) => {
    if (!isProgressBarTouching) {
        let currentTime = video.currentTime
        console.log(video.currentTime, video.duration)

        if (isNaN(video.duration)) {
            document.documentElement.style.setProperty('--progress-position', '0%')
            return
        }
        progressBar.value = currentTime
        document.documentElement.style.setProperty('--progress-position', (currentTime / video.duration * 100) + '%')
        console.log(1)
    }
}