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
// const printFile = (file) => fs.readFileSync(file, 'utf8');
// leer y mostrar contenido de carpetas
const printDirectory = (dir) => fs.readdirSync(dir);

// obtener archivos .md de un directorio
const getDirectoryFiles = (dir) => {
    const directoryContent = printDirectory(dir);
    let mdFilesArray = [];
    directoryContent.forEach(file => {
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
        const fileContent = printFile(file);
        return [file, fileContent];
    } else {
        return 'no es un archivo .md';
    }
}
// obtener contenido de un archivo .md dentro de un directorio
const getDirectoryFilesContent = (dir) => {
    const files = getDirectoryFiles(dir);
    if (files.length === 0) {
        return console.log('no hay archivos .md en esta carpeta');
     } else {
        return files.map((file) => {
            return [file, printFile(file)];
        });
     }
}

// extraer links de un archivo .md
const extractLinks = (mdContents) => {
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    const matches = mdContents.match(regexMdLinks)
    //console.log('links', matches);
    let links = [];
    const singleMatch = /\[([^\[]+)\]\((.*)\)/
    for (let i = 0; i < matches.length; i++) {
        const text = singleMatch.exec(matches[i]);
        const url = `${text[2]}`;
        if (url.slice(0, 4) === 'http') {
            // console.log(`Match #${i}:`, text);
            links.push([`${text[1]}`,`${text[2]}`]);
        }
    }
    if(matches.length === 0) return console.log('no hay links en este archivo .md');
    // console.log(`numero de links: ${linksCount}`);
    return links;
}

// imprimir contenido de la ruta
const printPathContent = (file) => {
    if (!checkIfDirectory(file)) {
        const content = getFileContent(file);
        return extractLinks(content[1]);
    } else {
        const content = getDirectoryFilesContent(file);
        let links;
        content.forEach(file => {
            links = extractLinks(file[1]);
        });
        return links;
    }
};

// mostrar contenido de rutas validas
const readFileAndDirectory = (file) => {
    const filepath = pathToAbsolute(file);
    if (pathIsVAlid(filepath)) {
        const fileLinks = printPathContent(filepath);
        fileLinks.forEach(link => console.log(file, link[1], link[0].slice(0, 50)));
        return fileLinks;
    } else {
        console.log('La ruta no existe');
        // throw TypeError('La ruta no existe');
        return 'La ruta no existe';
    }
}

readFileAndDirectory(filePath);

module.exports = {
    pathToAbsolute, printPathContent, getDirectoryFilesContent,
    readFileAndDirectory, getFileContent
};
