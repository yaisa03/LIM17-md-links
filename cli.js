#!/usr/bin/env node

// const mdLinks = require("./index.js");
const fs = require('fs');
const path = require('path');

// argumentos ingresados en la consola
const myArgs = process.argv.slice(2);
// path ingresado en la consola
const filePath = myArgs[0];
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
const getFileContent = (file) => {
    if (checkIfMDFile(file)) {
        return printFile(file);
    } else {
        return 'no es un archivo .md';
    }
}
// obtener contenido de un archivo .md dentro de un directorio
const getDirectoryFilesContent = (dir) => {
    const files = getDirectoryFiles(dir);
    if (files.length === 0) {
        return 'no hay archivos .md en este directorio';
    } else {
        return files.map((file) => printFile(file));
    }
}
// extraer links de un archivo .md
const extractLinks = (mdContents) => {
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    const matches = mdContents.match(regexMdLinks);//console.log('links', matches);
    let links = [];
    if (matches == null) {
        return 'no hay links en este archivo .md';
    } else {
        const singleMatch = /\[([^\[]+)\]\((.*)\)/
        for (let i = 0; i < matches.length; i++) {
            const text = singleMatch.exec(matches[i]);
            const url = `${text[2]}`;
            if (url.slice(0, 4) === 'http') {// console.log(`Match #${i}:`, text);
                links.push([`${text[1]}`, `${text[2]}`]);
            }
        }
    }
    if (links == 0) {
        return 'no hay links de tipo http://';
    }
    return links;
}
// imprimir contenido de la ruta
const printPathContent = (file) => {
    if (!checkIfDirectory(file)) {
        const content = getFileContent(file);
        if (content === 'no es un archivo .md') {
            return content;
        }
        return extractLinks(content);
    } else {
        const content = getDirectoryFilesContent(file);
        if (content === 'no hay archivos .md en este directorio') {
            return content;
        } else {
            let links;
            content.forEach(file => links = extractLinks(file));
            return links;
        }
    }
};
// mostrar contenido de rutas validas
const readFileAndDirectory = (file) => {
    const filepath = pathToAbsolute(file);
    if (pathIsVAlid(filepath)) {
        const fileLinks = printPathContent(filepath);
        if (typeof fileLinks === 'string') {
            return console.log(fileLinks);
        } else {
            fileLinks.forEach(link => console.log(file, link[1], link[0].slice(0, 50)));
            return fileLinks;
        }
    } else {
        console.log('La ruta no existe');
        return 'La ruta no existe';
    }
}

readFileAndDirectory(filePath);

module.exports = {
    pathToAbsolute, printPathContent, getDirectoryFilesContent,
    readFileAndDirectory, getFileContent
};
