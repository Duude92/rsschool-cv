const audioPlayer = document.getElementById("audioPlayer")
const playList = document.querySelector(".play-list")
const playButton = document.querySelector(".play")
const nextButton = document.querySelector(".play-next")
const prevButton = document.querySelector(".play-prev")
let music = []

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
    audioPlayer.src = src
    audioPlayer.onloadedmetadata = _ => audioPlayer.play()
}

window.addEventListener("load", _ => {
    getMusic().then(_ => play(music[0].source))

})