const videoSelector = document.querySelector('.video-selector')

let cards = []
class VideoCard {
    constructor(url) {
        this.src = url
    }
}

const addCard = (card) => {
    cards.push(card)
}
addCard(new VideoCard('assets/video/Ocean.mp4'))
addCard(new VideoCard('assets/video/Rock_Balance.mp4'))