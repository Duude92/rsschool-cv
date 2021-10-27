const audioPlayer = document.getElementById("audioPlayer")
const playList = document.querySelector(".play-list")
const playButton = document.querySelector(".play")
const nextButton = document.querySelector(".play-next")
const prevButton = document.querySelector(".play-prev")
const songName = document.querySelector(".song-name")
const progress = document.getElementById("progress")
const volumeBar = document.getElementById("volumebar")
let music = []
let currentSong = 0

let getMusic = async _ => {
    const result = await fetch("/assets/json/audio.json")
    music = await result.json()
    music.forEach(e => {
        const li = document.createElement('li')
        e.element = li
        li.textContent = e.name
        li.className = "play-item"
        li.onclick = _ => {
            play(e)
        }
        playList.append(li)
    })
}
let play = (musicObject) => {
    playButton.classList.remove('play')
    playButton.classList.add('pause')
    musicObject.element.classList.add('item-active')
    music.forEach(e => { if (e !== musicObject) e.element.classList.remove('item-active') })


    audioPlayer.src = musicObject.source
    songName.textContent = musicObject.name


    // audioPlayer.muted = true
    audioPlayer.onloadedmetadata = _ => audioPlayer.play()
}
let playNext = _ => {
    if (currentSong + 1 < music.length) {
        currentSong++
    } else {
        currentSong = 0
    }
    play(music[currentSong])
}
playButton.onclick = _ => {
    if (audioPlayer.paused) {
        playButton.classList.remove('play')
        playButton.classList.add('pause')
        audioPlayer.play()
    } else {
        playButton.classList.add('play')
        playButton.classList.remove('pause')

        audioPlayer.pause()
    }
}
nextButton.onclick = playNext
prevButton.onclick = _ => {
    if (currentSong - 1 >= 0) {
        currentSong--
    } else {
        currentSong = music.length - 1
    }
    play(music[currentSong])

}
progress.onchange = ev => {
    audioPlayer.currentTime = ev.target.value / 100 * audioPlayer.duration
}
volumeBar.oninput = ev => {
    audioPlayer.volume = ev.target.value
}


audioPlayer.onended = _ => {
    playNext()
}
audioPlayer.ontimeupdate = _ => {
    progress.value = audioPlayer.currentTime / audioPlayer.duration * 100

}
window.addEventListener("load", _ => {
    getMusic().then(_ => {
        audioPlayer.src = music[0].source
        songName.textContent = music[0].name
    })
})