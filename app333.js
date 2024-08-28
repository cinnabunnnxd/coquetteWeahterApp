const apiKey = "d56a95db9925f60d16e850f8c16d3046"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchBox = document.querySelector(".search input")
const searcBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weatherIcon")
const cursorDot = document.querySelector("[data-cursor-dot]")
const cursorOutLine = document.querySelector("[data-cursor-outline]")

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX
    const posY = e.clientY

    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`

    cursorDot.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 1500, fill: "forwards" })

})

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appId=${apiKey}`)

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
    } else {
        var data = await response.json()

        console.log(data)

        document.querySelector(".city").textContent = `${data.name}`
        document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°c`
        document.querySelector(".humidity").textContent = `${data.main.humidity}%`
        document.querySelector(".wind").textContent = `${Math.round(data.wind.speed).toFixed(2)}km/h`

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }
        document.querySelector(".error").style.display = "none"
    }
}

searcBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)

})
searchBox.addEventListener("keydown", () => {
    if (event.key === "Enter") {
        event.preventDefault
        checkWeather(searchBox.value)
    }
})












