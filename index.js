const { inquirerMenu, pause, readInput, showListPlaces } = require('./helpers/inquirer');
const Search = require('./models/Search');

require('dotenv').config()
require('colors');

// console.log(process.env);
// console.log(process.env.MAPBOX_KEY);

console.clear();
const main = async ()=> {
    let opt;

    const search = new Search();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Show message
                const placeToSearch = await readInput('City: ');

                // Search the places
                const places = await search.city(placeToSearch);
                // console.log(places);

                // Select one place
                const id = await showListPlaces(places);
                // console.log({ id });
                const selectedPlace = places.find( place => place.id = id);
                // console.log(selectedPlace);

                // TODO Get data weather of the place

                // TODO Show weather result of the place
                console.log('\nCity details: \n'.green);
                console.log('City: ', selectedPlace.name );
                console.log('Lat: ', selectedPlace.lat );
                console.log('Lng: ', selectedPlace.lng);
                console.log('Min: ', );
                console.log('Max: ', );
                break;

            case 2:
                // Show the history of search

                break;

            default:
                break;
        }

        if (opt !== 0) await pause();

    } while (opt !== 0);
}

main();