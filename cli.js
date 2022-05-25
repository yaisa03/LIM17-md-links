// #!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { extractLinks, stats, validate } = require('./index.js');
const { mdLinks } = require('./api.js');

// argumentos ingresados en la consola
const myArgs = yargs(hideBin(process.argv))
    .usage('Usage: md-links <path> [options]')
    .option("v", {
        alias: "validate",
        describe: "Validate the links in the .md file",
        type: "boolean",
        default: false,
    })
    .option("s", {
        alias: "stats",
        describe: "Stadistics of the links in the .md file",
        type: "boolean",
        default: false,
    })
    .alias('h', 'help')
    .argv;

// path ingresado en la consola
const filePath = myArgs._.toString();

//
const inputOptions = (paths, options) => {
    const fileLinks = extractLinks(paths);

    if (options.stats && options.validate) {
        mdLinks(fileLinks, options).then((validStats) => {
            console.log(validStats);
        })

    } else if (options.validate) {
        mdLinks(fileLinks, options).then((files) => {
            files.forEach((fileInfo) => {
                console.log(fileInfo.file, fileInfo.href, fileInfo.statusText, fileInfo.status);
            })
        })

    } else if (options.stats) {
        mdLinks(fileLinks, options).then((linkStats) => {
            console.log(fileLinks[1].file);
            console.log(`Total: ${linkStats.total}`);
            console.log(`Unique: ${linkStats.unique}`);
        })


    } else {
        if (fileLinks.length === 0) {
            mdLinks(fileLinks, options).then((filesInfo) => { console.log(chalk.red(filesInfo)) })
        } else if (typeof fileLinks === 'string') {
            mdLinks(fileLinks, options).then((filesInfo) => { console.log(chalk.red(filesInfo)) })
        } else {
            mdLinks(fileLinks, options).then((filesInfo) => {
                filesInfo.forEach(content => {
                    console.log(chalk.blue(`${content.file}`), chalk.green(`${content.href}`), `${content.text}`);
                });
            });
        }

    }
}

inputOptions(filePath, myArgs);
