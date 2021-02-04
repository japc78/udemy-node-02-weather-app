const inquirer = require("inquirer");
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you wish to do?',
        choices: [
            {
                value: 1,
                name: `${'1'.green}. Search city`
            },
            {
                value: 2,
                name: `${'2'.green}. History`
            },
            {
                value: 0,
                name: `${'0'.green}. Exit`
            },
        ]
    }
]

const inquirerMenu = async() => {
    console.clear();
    console.log('==================================='.green);
    console.log('====== Seleccione una opción ======'.white);
    console.log('===================================\n'.green);

    // const opt = await inquirer.prompt(menuOpts);
    // console.log(opt);
    const { option } = await inquirer.prompt(menuOpts);
    return option;
}

const pause = async() => {
    const msg = {
        type: 'input',
        name: 'enter',
        message: `Press ${ 'Enter'.green } for continue`,
    }

    console.log('\n');
    await inquirer.prompt(msg);
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value.length === 0) {
                    return 'Please insert a value';
                }
                return true;
            }
        }
    ]


    // const anything = await inquirer.prompt(question);
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const cancelOption = {
    value: '0',
    name: '0. '.green + 'Cancel'
}

const confirmAction = async(message) => {
    const question =[{
        type: 'confirm',
        name: 'ok',
        message
    }]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    confirmAction,
}

