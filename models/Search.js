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
}

module.exports = Search;