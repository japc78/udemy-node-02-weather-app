const axios = require('axios').default;


class Search {
    historial = [];

    constructor() {
        // TODO Read DB if exist

    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en'
        }
    }

    get paramsOpenWeatherMap() {
        return {
            'appid': process.env.OPEN_WEATHER_KEY,
            'units': 'metric',
            'lang': 'en'
        }
    }

    async city( place = '') {
        // TODO Http request
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            })

            const resp = await instance.get();
            // console.log(resp.data.features);

            // En este caso se retorna con map un objeto de forma implícita
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))

        } catch (error) {
            return [];
        }
    }

    async weatherPlaceFromCoordinates(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { ...this.paramsOpenWeatherMap, lat, lon }
            });

            const resp = await instance.get();
            const { weather , main } = resp.data;
            // console.log(main);
            return {
                'desc': weather[0].description,
                'temp': main.temp,
                'temp_min': main.temp_min,
                'temp_max': main.temp_max
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Search;