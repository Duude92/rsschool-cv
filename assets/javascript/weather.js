const cityContainer = document.getElementById("city")
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const weatherError = document.querySelector('.weather-error')
let city = 'Минск'
let getWeather = async _ => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=2859d4e6c866d19c3074a62e57efa084&units=metric`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    resetWidget()

    if (data.cod === 200) {

        // cityContainer.value = data.name
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${data.main.temp}°C`
        weatherDescription.textContent = data.weather[0].description
    } else {
        weatherError.textContent = data.message
    }
}
let resetWidget = _ => {
    weatherIcon.className = "weather-icon owf"
    temperature.textContent = ''
    weatherDescription.textContent = ''

}
cityContainer.onchange = value => {
    console.log(value.target.value)
    city = value.target.value
    getWeather()
    localStorage.setItem('city', city)
}

let InitializeWeatherModule = _ => {
    if (localStorage.getItem('city')) {
        city = localStorage.getItem('city')
        cityContainer.value = city
    }
    getWeather()
}
export default InitializeWeatherModule