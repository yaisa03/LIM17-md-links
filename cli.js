// #!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { stats, statsAndValidate } = require('./index.js');
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

//funcion que hace que cli funcione
const inputOptions = (paths, options) => {
    if (options.stats && options.validate) {
        mdLinks(paths, options).then((validStats) => {
            statsAndValidate(validStats).then((stats) => {
                console.log(chalk.magenta(`${stats.file}`));
                console.log(chalk.green(`Total: ${stats.total}`));
                console.log(chalk.blue(`Unique: ${stats.unique}`));
                console.log(chalk.red(`Broken: ${stats.broken}`));
            });
        }).catch(err => console.log(chalk.red(err)));

    } else if (options.validate) {
        mdLinks(paths, options).then((files) => {
            files.forEach((fileInfo) => {
                console.log(chalk.blue(`${fileInfo.file}`), chalk.green(`${fileInfo.href}`), fileInfo.statusText, fileInfo.status);
            })
        }).catch(err => console.log(chalk.red(err)));

    } else if (options.stats) {
        mdLinks(paths, options).then((pathLinks) => {
            const linkStats = stats(pathLinks);
            console.log(chalk.magenta(`${linkStats.file}`));
            console.log(chalk.green(`Total: ${linkStats.total}`));
            console.log(chalk.blue(`Unique: ${linkStats.unique}`));
        }).catch(err => console.log(chalk.red(err)));

    } else {
        mdLinks(paths, options).then((pathInfo) => {
            if (typeof pathInfo === 'string') {
                console.log(chalk.red(pathInfo));
            } else {
                pathInfo.forEach(content => {
                    console.log(chalk.blue(`${content.file}`), chalk.green(`${content.href}`), `${content.text}`);
                });
            }
        }).catch(err => console.log(chalk.red(err)));
    }

}

inputOptions(filePath, myArgs);
