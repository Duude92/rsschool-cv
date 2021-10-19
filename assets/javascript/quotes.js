const quoteContainer = document.querySelector('.quote')
const authorContainer = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

let quotes = []

let getQuotes = async _ => {
    const result = await fetch("/assets/json/quotes.json")
    quotes = await result.json()
}
let getRandomQuote = _ => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)]
    quoteContainer.textContent = newQuote.text
    authorContainer.textContent = newQuote.author
}

changeQuote.onclick = _ => getRandomQuote()
window.onload = _ => {
    getQuotes().then(getRandomQuote)
}