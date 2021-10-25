const quoteContainer = document.querySelector('.quote')
const authorContainer = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

let quotes = []
let lastQuoteNum = -1

let getQuotes = async _ => {
    const result = await fetch("/assets/json/quotes.json")
    quotes = await result.json()
}
let getRandomQuote = _ => {
    const newQuote = quotes[getDifferentRandomNumber(lastQuoteNum)]
    quoteContainer.textContent = newQuote.text
    authorContainer.textContent = newQuote.author
}
let getDifferentRandomNumber = lastNumber => {
    let num = Math.floor(Math.random() * quotes.length)
    if (num === lastNumber) {
        return getDifferentRandomNumber(lastNumber)
    } else {
        lastQuoteNum = num
        return num
    }
}

changeQuote.onclick = _ => getRandomQuote()

window.addEventListener("load", _ => {
    getQuotes().then(getRandomQuote)
})