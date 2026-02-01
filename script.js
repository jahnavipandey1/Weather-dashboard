const apiKey = "d2f1dd8c5ffc4f8fa2c60228263101";

const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locBtn = document.getElementById("locBtn");

searchBtn.addEventListener("click", () => {
    getWeather(input.value);
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather(input.value);
    }
});

locBtn.addEventListener("click", getLocationWeather);


async function getWeather(city) {
    if (!city) return;

    showLoader(true);

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) throw new Error();

        displayWeather(data);

    } catch {
        showError("City not found!");
    }

    showLoader(false);
}


function displayWeather(data) {
    document.getElementById("weatherCard").classList.remove("hidden");
    document.getElementById("error").innerText = "";

    document.getElementById("cityName").innerText =
        `${data.location.name}, ${data.location.country}`;

    document.getElementById("temp").innerText =
        `${data.current.temp_c}°C`;

    document.getElementById("condition").innerText =
        data.current.condition.text;

    document.getElementById("humidity").innerText =
        `Humidity: ${data.current.humidity}%`;

    document.getElementById("wind").innerText =
        `Wind: ${data.current.wind_kph} kph`;

    document.getElementById("feels").innerText =
        `Feels: ${data.current.feelslike_c}°C`;

    document.getElementById("icon").src =
        "https:" + data.current.condition.icon;
}


function showError(msg) {
    document.getElementById("weatherCard").classList.add("hidden");
    document.getElementById("error").innerText = msg;
}


function showLoader(show) {
    document.getElementById("loader").classList.toggle("hidden", !show);
}


function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(async (pos) => {

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        getWeather(`${lat},${lon}`);
    });
}
