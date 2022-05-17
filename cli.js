#!/usr/bin/env node

// const mdLinks = require("./index.js");
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
//const yargs = require('yargs');
//const { hideBin } = require('yargs/helpers');

// argumentos ingresados en la consola
const myArgs = process.argv.slice(2);//yargs(hideBin(process.argv))
/* .usage('Usage: md-links <path> [options]')
.option("v", {
    alias: "validate",
    describe: "Validate the links in the .md file",
    type: "boolean",
    default: 'false',
})
.option("s", {
    alias: "stats",
    describe: "Stadistics of the links in the .md file",
    type: "boolean",
    default: 'false',
})
.argv; */
// path ingresado en la consola
const fileP = myArgs[0]; //myArgs._.toString();
// ver si la ruta es absoluto o relativo y convertir ruta a absoluta
const pathToAbsolute = (file) => (path.isAbsolute(file)) ? file : path.resolve(file);
// ver si la ruta existe 
const pathIsVAlid = (file) => fs.existsSync(file);
// ver si es carpeta
const checkIfDirectory = (file) => fs.statSync(file).isDirectory();
// ver si es archivo
const checkIfFile = (file) => fs.statSync(file).isFile();
// validar que es un archivo .md
const checkIfMDFile = (file) => path.extname(file) === '.md';
// leer y mostrar contenido de un archivo
const printFile = (file) => fs.readFileSync(file).toString();
// leer y mostrar contenido de carpetas
const printDirectory = (dir) => fs.readdirSync(dir);
// obtener archivos .md de un directorio
const getDirectoryFiles = (dir) => {
    let mdFilesArray = [];
    printDirectory(dir).forEach(file => {
        let currentPath = path.join(dir, file);
        if (checkIfFile(currentPath)) {
            if (checkIfMDFile(currentPath)) {
                mdFilesArray.push(currentPath);
            }
        } else {
            mdFilesArray = mdFilesArray.concat(getDirectoryFiles(currentPath));
        }
    });
    return mdFilesArray;
}
// obtener contenido de un archivo .md
const getFileContent = (file) => (checkIfMDFile(file)) ? [file, printFile(file)] : 'no es un archivo .md';
// obtener contenido de un archivo .md dentro de un directorio
const getDirectoryFilesContent = (dir) => {
    const files = getDirectoryFiles(dir);
    if (files.length === 0) {
        return 'no hay archivos .md en este directorio';
    } else {
        return files.map((file) => [file, printFile(file)]);
    }
}
// extraer links de un archivo .md
const extractLinks = (mdContents) => {
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    const matches = mdContents[1].match(regexMdLinks);//console.log('links', matches);
    let links = [];
    if (matches == null) {
        return (chalk.white(`${mdContents[0]}`) + ' no hay links en este archivo .md');
    } else {
        const singleMatch = /\[([^\[]+)\]\((.*)\)/
        for (let i = 0; i < matches.length; i++) {
            const text = singleMatch.exec(matches[i]);
            const url = `${text[2]}`;
            if (url.slice(0, 4) === 'http') {//console.log(`Match #${i}:`, text);
                links.push([`${text[1]}`, `${text[2]}`, `${mdContents[0]}`]);
            }
        }
    }
    if (links == 0) {
        return (chalk.white(`${mdContents[0]}`) + ' no hay links de tipo http://');
    }
    return links;
}
// imprimir contenido de la ruta
const printPathContent = (file, content) => {
    if (!checkIfDirectory(file)) {
        const fileLinks = extractLinks(content);
        for (let i = 0; i < fileLinks.length; i++) {
            console.log(chalk.blue(file), chalk.green(fileLinks[i][1]), fileLinks[i][0].slice(0, 50));
        }
        return fileLinks;
    } else {
        return content.map(file => {
            const fileLinks = extractLinks(file);
            for (let i = 0; i < fileLinks.length; i++) {
                if (typeof fileLinks[i] === 'string') {
                    console.log(chalk.red(fileLinks));
                    return fileLinks;
                } else {
                    console.log(chalk.blue(fileLinks[i][2]), chalk.green(fileLinks[i][1]), fileLinks[i][0].slice(0, 50));
                }
            }
            return fileLinks;
        })
    }
}
// mostrar contenido de rutas validas
const filepath = pathToAbsolute(fileP);
const readFileAndDirectory = (filePath) => {
    if (pathIsVAlid(filepath)) {
        let content;
        (!checkIfDirectory(filePath)) ? content = getFileContent(filePath) : content = getDirectoryFilesContent(filePath);
        if (typeof content === 'string') { //'no es un archivo .md'
            console.log(chalk.red(content))
            return content;
        } else {
            return content;
        }
    } else {
        console.log(chalk.red('La ruta no existe: ' + filepath));
        return 'La ruta no existe';
    }
}

const showByOption = (filepath) => {
    if (myArgs[1] === '--validate') {
        console.log('opcion validate');
    } else if (myArgs[1] === '--stats') {
        console.log('opcion stats');
    } else if (myArgs.includes('--validate --stats')) {
        console.log('opcion stats y validate');
    } else {
        const content = readFileAndDirectory(filepath);
        printPathContent(filepath, content);
    }
}

showByOption(filepath);

module.exports = {
    pathToAbsolute, printPathContent, getDirectoryFilesContent,
    readFileAndDirectory, getFileContent, extractLinks
};
