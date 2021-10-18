const timeContainer = document.getElementById("time")
const dateContainer = document.getElementById("date")

let showTime = _ => {
    const date = new Date()

    timeContainer.textContent = date.toLocaleTimeString()
    setTimeout(showTime, 1000)
}
let showDate = _ => {
    const date = new Date()
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    dateContainer.textContent = date.toLocaleDateString('ru-Ru', options)
}


let InitializeDateTime = _ => {
    showTime()
    showDate()
}

export default InitializeDateTime