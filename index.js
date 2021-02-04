const { inquirerMenu, pause } = require('./helpers/inquirer');

require('colors');

console.clear();

const main = async ()=> {
    let opt;

    do {
        opt = await inquirerMenu();

        if (opt !== 0) await pause();

    } while (opt !== 0);
}

main();