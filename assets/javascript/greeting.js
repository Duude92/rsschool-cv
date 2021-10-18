import getTimeOfDay from "./timeofday.js"
const greetingContainer = document.getElementById("greeting")
let InitializeGreetingModule = _ => {
    greetingContainer.textContent = `Good ${getTimeOfDay()},`
    console.log(getTimeOfDay())
}
export default InitializeGreetingModule