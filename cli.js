// #!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { stats, statsAndValidate } = require('./index.js');
const { mdLinks } = require('./api.js');

// argumentos ingresados en la consola
const myArgs = yargs(hideBin(process.argv))
    .usage('Uso: md-links <path> [options]')
    .example("md-links <path>", "Muestra ruta, enlaces y texto")
    .example("md-links <path> -v", "Muestra ruta, texto, enlace, status y mensaje")
    .example("md-links <path> -s", "Muestra los links totales y unicos")
    .example("md-links <path> -s -v", " Muestra los enlaces totales, unicos y rotos")
    .option("v", {
        alias: "validate",
        describe: "Valida que funcionen los links dentro de los archivos .md",
        type: "boolean",
        default: false,
    })
    .option("s", {
        alias: "stats",
        describe: "Muestra estadisticas de los links dentro de los archivos .md",
        type: "boolean",
        default: false,
    })
    .help('h')
    .alias('h', 'help')
    .argv;

// path ingresado en la consola
const filePath = myArgs._.toString();

//funcion que hace que cli funcione
const inputOptions = (paths, options) => {
    if (options.stats && options.validate) {
        mdLinks(paths, options).then((validStats) => {
            statsAndValidate(validStats).then((stats) => {
                console.log(chalk.magenta(stats.file));
                console.log(chalk.green(`Total: ${stats.total}`));
                console.log(chalk.blue(`Unique: ${stats.unique}`));
                console.log(chalk.red(`Broken: ${stats.broken}`));
            });
        }).catch(err => console.log(chalk.red(err)));

    } else if (options.validate) {
        mdLinks(paths, options).then((files) => {
            files.forEach((fileInfo) => {
                console.log(chalk.blue(fileInfo.file), chalk.green(fileInfo.href), chalk.magenta(fileInfo.statusText), fileInfo.status);
            })
        }).catch(err => console.log(chalk.red(err)));

    } else if (options.stats) {
        mdLinks(paths, options).then((pathLinks) => {
            const linkStats = stats(pathLinks);
            console.log(chalk.magenta(linkStats.file));
            console.log(chalk.green(`Total: ${linkStats.total}`));
            console.log(chalk.blue(`Unique: ${linkStats.unique}`));
        }).catch(err => console.log(chalk.red(err)));

    } else {
        mdLinks(paths, options).then((pathInfo) => {
            if (typeof pathInfo === 'string') {
                console.log(chalk.red(pathInfo));
            } else {
                pathInfo.forEach(content => {
                    console.log(chalk.blue(content.file), chalk.green(content.href), content.text);
                });
            }
        }).catch(err => console.log(chalk.red(err)));
    }

}

inputOptions(filePath, myArgs);
