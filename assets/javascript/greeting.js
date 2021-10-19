import getTimeOfDay from "./timeofday.js"
const nameContainer = document.getElementById("name")
const greetingContainer = document.getElementById("greeting")
let InitializeGreetingModule = _ => {
    greetingContainer.textContent = `Good ${getTimeOfDay()},`
    nameContainer.value = localStorage.getItem('name')
}
window.addEventListener('beforeunload', _ => {
    localStorage.setItem('name', nameContainer.value)
})

export default InitializeGreetingModule