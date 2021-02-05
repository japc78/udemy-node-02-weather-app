const fs = require('fs');
const axios = require('axios').default;


class Search {
    history = [];
    dataPath = './db/data.json';

    constructor() {
        // Read DB if exist
        this.loadData();

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

    get historyCapitalized() {
        return this.history.map(place => {
            return place.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        })
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

    addHistory(place = '') {
        // NO duplicate entries
        if (this.history.includes(place.toLocaleLowerCase())) {
            return;
        }

        // Only 6 places in the history
        this.history = this.history.splice(0,5);

        this.history.unshift( place.toLocaleLowerCase());
        // this.history = [...new Set(this.history)];

        // Save data to file
        this.saveData();
    }

    saveData() {
        const payload = {
            history: this.history
        }

        fs.writeFileSync(this.dataPath, JSON.stringify(payload));
    }

    loadData(){

        try {
            if (!fs.existsSync(this.dataPath)) return;
            const info = fs.readFileSync(this.dataPath, {encoding: 'utf-8'}) ;
            const { history } = JSON.parse(info);
            this.history = history;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Search;