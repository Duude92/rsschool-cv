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
        video.style.height = video.offsetHeight + 'px'
        this.setVideo()
        setTimeout(_ => {
            video.style = ''
        }, 1500)
        playVideo()
    }
    setVideo = _ => {
        videoTitle.innerText = this.title
        videoDescription.innerText = this.description
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
const mute = _ => {
    let innerButton = muteButton.querySelector('i')
    if (video.muted) {
        innerButton.classList.remove('fa-volume-mute')
        innerButton.classList.add('fa-volume-up')
        video.muted = false
        setVolume(lastVolume)
    } else {
        innerButton.classList.remove('fa-volume-up')
        innerButton.classList.add('fa-volume-mute')
        lastVolume = volumeBar.value
        video.muted = true
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
    let icon = fullscreen.querySelector('i')
    if (document.fullscreenElement) {
        icon.classList.remove('fa-expand')
        icon.classList.add('fa-compress')
    } else {
        icon.classList.add('fa-expand')
        icon.classList.remove('fa-compress')
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
window.onkeypress = (key) => {
    switch (key.code) {
        case "KeyF":
            if (!document.fullscreenElement) {
                videoPlayer.requestFullscreen()
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
            if (!video.paused) {
                pauseVideo()
            } else {
                playVideo()
            }
            break;
        case "Period":
            if (video.playbackRate < 15.5)
                video.playbackRate += 0.1
            break;
        case "Comma":
            if (video.playbackRate > 0.15)
                video.playbackRate -= 0.1
            break;

        default:
            break;
    }
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
let fading = false
video.onmouseleave = _ => {
    if (video.played.length > 0) {
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

const playVideo = () => {
    video.load()
    video.onloadedmetadata = _ => {
        progressBar.max = video.duration
        playButtons.forEach(button => {
            let icon = button.querySelector('i')
            icon.classList.remove('fa-play')
            icon.classList.add('fa-pause')
        })

        video.play()
    }

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
            })
        }

        //hardcode
        playlist.push(cards[0])
        playlist.push(cards[1])
        playlist.push(cards[2])
        playlist[0].setVideo()


        playlistUpdate()

        let videosContainer = document.querySelector('.videos-container')

        cards.forEach(card => {
            let cardContainer = document.createElement('div')
            let image = new Image(400, 250)
            image.src = card.imageUrl
            let imageContainer = document.createElement('div')
            imageContainer.appendChild(image)
            let plusContainer = document.createElement('div')
            plusContainer.className = 'add-playlist'
            plusContainer.innerHTML = `<i class="fas fa-plus"></i>`

            plusContainer.addEventListener('click', _ => {
                addCard(card)
                playlistUpdate()
            })
            imageContainer.appendChild(plusContainer)
            cardContainer.append(imageContainer)
            let p = document.createElement('p')
            p.innerText = card.title
            cardContainer.append(p)
            let selector = document.createElement('div')
            selector.className = 'video-card-selector'
            cardContainer.appendChild(selector)
            cardContainer.className = 'container-card-video'
            const setCurrentVideo = _ => {
                card.setVideo()
                playlist = [card]
                playListIndex = 0
                playlistUpdate()
            }


            cardContainer.onclick = setCurrentVideo
            plusContainer.onmouseover = _ => {
                cardContainer.onclick = null
            }
            plusContainer.onmouseleave = _ => {
                cardContainer.onclick = setCurrentVideo
            }

            videosContainer.append(cardContainer)
            plusContainer.style.top = image.offsetHeight
            plusContainer.style.left = image.offsetWidth

        })

    }
}
xmlObj.send(null)

//Комментарий к вопросу о карточках
console.log(`К вопросу о карточках:
https://discord.com/channels/516715744646660106/861528325087035422/880751260838535179

Самооценка: 30
Основной функционал - кастомный видео плеер выполнен.
Обязательный дополнительный функционал - управление с клавиатуры выполнено, кнопки backward и forward - выполняют роль переключений видео из плейлиста.
Дополнительный функционал:
    Дополнительные кнопки с клавиатуры не стал дополнять.
    Перелистывание видео выполнено в виде плейлиста, есть возможность переключить на следующее видео, предыдущее, по окочанию текущего видео - плеер автоматически переключит.
    Подобие кинопоиска так же реализовать довольно трудоемко - tmdb из примера не имеет самих видео, найти бесплатный видео хостинг с доступным api мне не удалось, по этому решил залить несколько видео(см. ссылку выше) на выбор (а так же можно добавить в текущий плейлист), для бОльшего кол-ва видео необходимо использовать бд, но это уже не входит в рамки этой работы.
    В целом считаю 30 баллов заслуженными, хоть и дизайн у меня так себе - я не дизайнер :)
Так же добавлено в целом на страницу вывод имени видео, а так же его описания (подготовлено в обьекте видео карточек, смысла его выполнять без бд - нет).
P.S. Работу в основном делал функционально а не дизайнерски.`)



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
window.onmousemove = _ => {
    document.body.style.cursor = 'initial'
    fading = false
}
video.onended = _ => {
    nextVideo()
}

video.ontimeupdate = (ev) => {
    if (!isProgressBarTouching) {
        let currentTime = video.currentTime

        if (isNaN(video.duration)) {
            document.documentElement.style.setProperty('--progress-position', '0%')
            return
        }
        progressBar.value = currentTime
        document.documentElement.style.setProperty('--progress-position', (currentTime / video.duration * 100) + '%')
    }
}