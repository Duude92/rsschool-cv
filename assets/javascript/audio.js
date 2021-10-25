const audioPlayer = document.getElementById("audioPlayer")
const playList = document.querySelector(".play-list")
const playButton = document.querySelector(".play")
const nextButton = document.querySelector(".play-next")
const prevButton = document.querySelector(".play-prev")
let music = []
let currentSong = 0

let getMusic = async _ => {
    const result = await fetch("/assets/json/audio.json")
    music = await result.json()
    console.log(music)
    music.forEach(e => {
        const li = document.createElement('li')
        li.textContent = e.name
        li.className = "play-item"
        li.onclick = _ => play(e.source)
        playList.append(li)
    })
}
let play = src => {
    playButton.classList.remove('play')
    playButton.classList.add('pause')

    audioPlayer.src = src
        // audioPlayer.muted = true
    audioPlayer.onloadedmetadata = _ => audioPlayer.play()
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
nextButton.onclick = _ => {
    if (currentSong + 1 < music.length) {
        currentSong++
    } else {
        currentSong = 0
    }
    play(music[currentSong].source)

}
prevButton.onclick = _ => {
    if (currentSong - 1 >= 0) {
        currentSong--
    } else {
        currentSong = music.length - 1
    }
    play(music[currentSong].source)

}

window.addEventListener("load", _ => {
    getMusic().then(_ => audioPlayer.src = music[0].source)
})