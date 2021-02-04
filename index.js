const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const Search = require('./models/Search');

require('colors');

console.clear();

const main = async ()=> {
    let opt;

    const searches = new Search();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // TODO Show message
                const place = await readInput('City: ');
                console.log(place);

                // TODO Search the places
                se

                // TODO Select one place

                // TODO Get data weather of the place

                // TODO Show weather result of the place
                console.log('\nCity details: \n'.green);
                console.log('City: ', );
                console.log('Lat: ', );
                console.log('Lng: ', );
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