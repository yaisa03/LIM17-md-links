// #!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { extractLinks, stats, validate } = require('./index.js');

// argumentos ingresados en la consola
const myArgs = yargs(hideBin(process.argv))
    .usage('Usage: md-links <path> [options]')
    .option("v", {
        alias: "validate",
        describe: "Validate the links in the .md file",
        type: "boolean"
    })
    .option("s", {
        alias: "stats",
        describe: "Stadistics of the links in the .md file",
        type: "boolean"
    })
    .alias('h', 'help')
    .argv;

// path ingresado en la consola
const filePath = myArgs._.toString();

const inputOptions = (paths, options) => {
    const fileLinks = extractLinks(paths);
    if (options.stats && options.validate) {
        console.log('opcion stats y validate');

    } else if (options.validate) {
        console.log('opcion validate');
        validate(fileLinks);

    } else if (options.stats) {
        console.log(fileLinks[1].file);
        const linkStats = stats(fileLinks);
        console.log(`Total: ${linkStats.total}`);
        console.log(`Unique: ${linkStats.unique}`);

    } else {
        if (typeof fileLinks === 'string') {
            console.log(chalk.red(fileLinks));
        } else {
            fileLinks.forEach(content => {
                console.log(chalk.blue(`${content.file}`),
                    chalk.green(`${content.href}`),
                    `${content.text}`);
            })
        }
        if (fileLinks.length === 0) {
            console.log(chalk.red('no hay links'));
        }
    }
}

inputOptions(filePath, myArgs);
