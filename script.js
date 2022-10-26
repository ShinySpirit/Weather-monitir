let lat, lon = ''

function createWeatherBlockByCity(city) {

    let locationAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=f3ba4ff44ded70f41709bb2a0a34fd83`;
    fetch(locationAPI)
        .then((responce) => responce.json())
        .then((data) => {
            lat = data[0].lat;
            lon = data[0].lon;
            if (data.code != 200) { }
        })
        .then(() => {
            let weaterAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f3ba4ff44ded70f41709bb2a0a34fd83`;

            fetch(weaterAPI)
                .then((response) => response.json())
                .then((data) => {
                    let out = `         
                    <button class="close"">&#10060;</button><br></br>                               
                    <div class="city">${data.name}</div><br>
                    <div class="sky">${data.weather[0].main}</div><br>
                    <div class="temperature">${(data.main.temp - 273.15).toFixed(1)}°C</div><br>`;

                    let parent = document.querySelector('.container');
                    let block = document.createElement('div');

                    block.innerHTML += out;
                    block.classList.add('weather-block');

                    parent.appendChild(block);

                    block.querySelector('.close').onclick = () => {
                        debugger;
                        block.querySelector('.close').parentElement.parentElement.removeChild(block.querySelector('.close').parentElement);
                    }
                });
        });
}

function createCurrentWeatherBlock() {
    new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let pos = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                acc: position.coords.accuracy
            };
            res(pos);
        })
    })
        .then(pos => {
            let weaterAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lon}&appid=f3ba4ff44ded70f41709bb2a0a34fd83`;

            fetch(weaterAPI)
                .then((response) => response.json())
                .then((data) => {
                    let out = `         
                    <button class="close"">&#10060;</button><br></br>                               
                    <div class="city">${data.name}</div><br>
                    <div class="sky">${data.weather[0].main}</div><br>
                    <div class="temperature">${(data.main.temp - 273.15).toFixed(1)}°C</div><br>`;

                    let parent = document.querySelector('.container');
                    let block = document.createElement('div');

                    block.innerHTML += out;
                    block.classList.add('weather-block');

                    parent.appendChild(block);

                    block.querySelector('.close').onclick = () => {
                        debugger;
                        block.querySelector('.close').parentElement.parentElement.removeChild(block.querySelector('.close').parentElement);
                    }
                });
        })
}



createCurrentWeatherBlock();

document.querySelector('.search').onclick = () => {
    let city = document.querySelector('.searchField').value;
    createWeatherBlockByCity(city);
}

