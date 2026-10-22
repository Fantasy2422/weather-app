const API_KEY = "bc455af34cc9c28818a03cebfd89e5db";

const btn = document.getElementById("btn");
const input = document.getElementById("city");
const result = document.getElementById("result");

async function getWeather() {
    const city = input.value.trim();
    if (!city) {
        result.innerHTML = '<p class="error">Введите город</p>';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            result.innerHTML = '<p class="error">Город не найден 😕</p>';
            return;
        }

        result.innerHTML = `
            <h2>${data.name}</h2>
            <div class="temp">${Math.round(data.main.temp)}°C</div>
            <p>${data.weather[0].description}</p>
            <p>💨 Ветер: ${data.wind.speed} м/с</p>
            <p>💧 Влажность: ${data.main.humidity}%</p>
        `;
    } catch (e) {
        result.innerHTML = '<p class="error">Ошибка запроса</p>';
    }
}

btn.addEventListener("click", getWeather);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") getWeather();
});