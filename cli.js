#!/usr/bin/env node

// const mdLinks = require("./index.js");
const fs = require('fs');
const path = require('path');
// path ingresado en la consola
const myArgs = process.argv.slice(2)
const filePath = myArgs[0];
// ver si la ruta es absoluto o relativo y convertir ruta a absoluta
const pathToAbsolute = (file) => (path.isAbsolute(file)) ? file : path.resolve(file);
// ver si la ruta existe 
const pathIsVAlid = (file) => fs.existsSync(file);
// ver si es carpeta o archivo
const checkIfDirectory = (file) => fs.statSync(file).isDirectory();
const checkIfFile = (file) => fs.statSync(file).isFile();
// validar que es un archivo .md
const checkIfMDFile = (file) => path.extname(file) === '.md';
// leer y mostrar contenido de un archivo
const printFile = (file) => fs.readFileSync(file).toString();
// const printFile = (file) => fs.readFileSync(file, 'utf8');
// leer y mostrar contenido de carpetas
const printDirectory = (dir) => fs.readdirSync(dir);
// ontener archivos .md de un directorio
const getDirectoryFiles = (dir) => {
    const directoryContent = printDirectory(dir);
    let filesArray = [];
    directoryContent.forEach(file => {
        let currentPath = path.join(dir, file);
        if (checkIfFile(currentPath)) {
            if (checkIfMDFile(currentPath)) {
                filesArray.push(currentPath);
            }
        } else {
            filesArray = filesArray.concat(getDirectoryFiles(currentPath));
        }
    });
    if (filesArray.length === 0) {
        console.log('no hay archivos .md en esta carpeta');
    }
    return filesArray;
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
    let fileContent = files.map((file) => {
        return [file, printFile(file)];
    });
    return fileContent;
}

// const
const extractLinks = (link, mdContents) => {
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    const matches = mdContents.match(regexMdLinks)
    //console.log('links', matches);
    let links = []
    let linksCount = 0;
    const singleMatch = /\[([^\[]+)\]\((.*)\)/
    for (let i = 0; i < matches.length; i++) {
        const text = singleMatch.exec(matches[i]);
        const url = `${text[2]}`;
        if (url.slice(0, 4) === 'http' || url.slice(0, 3) === 'www' ) {
            /*   console.log(`Match #${i}:`, text)
                 console.log(`Word  #${i}: ${text[1]}`)
            // console.log(`Link  #${i}: ${text[2]}`);*/
            linksCount++;
            links.push(`Link  #${linksCount}: ${text[2]}`);
        } else {
            console.log('no hay links en este archivo');
        }
    }
    console.log(links);
    console.log(`numero de links: ${linksCount}`);
    return links;

}
// imprimir contenido de la ruta
const printPathContent = (file) => {
    if (!checkIfDirectory(file)) {
        const content = getFileContent(file);
        return extractLinks(content[0], content[1])
    } else {
        const content = getDirectoryFilesContent(file);
        console.log(content);
        content.forEach(file => {
            return extractLinks(file[0], file[1]);
        });
        return content;
    }
};

// mostrar contenido de rutas validas
const filePathWorking = (file) => {
    const filepath = pathToAbsolute(file);
    if (pathIsVAlid(filepath)) {
        console.log(file);
        console.log('La ruta es valida');
        return printPathContent(filepath);
    } else {
        console.log('La ruta no existe');
        // throw TypeError('La ruta no existe');
        return 'La ruta no existe';
    }
}

filePathWorking(filePath);

module.exports = {
    pathToAbsolute, printPathContent, getDirectoryFilesContent,
    filePathWorking, getFileContent
};
