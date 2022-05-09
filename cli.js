#!/usr/bin/env node

// const mdLinks = require("./index.js");
const fs = require('fs');
const path = require('path');
// path ingresado en la consola
const filePathInputed = process.argv[2];
//const filePath = path.resolve(filePathInputed);
// ver si la ruta es absoluto o relativo y convertir ruta a absoluta
const pathToAbsolute = (file) => (path.isAbsolute(file)) ? file : path.resolve(file);
const filePath = pathToAbsolute(filePathInputed);
/* const pathToAbsolute = (file) => {
    if (path.isAbsolute(file)) {
        console.log(file);
        return file;
    } else {
        console.log(file);
        return path.resolve(file);
    }
} */
// ver si la ruta existe 
const pathIsVAlid = (file) => fs.existsSync(file);
// ver si es carpeta o archivo
const checkIfDirectory = (file) => fs.statSync(file).isDirectory();
// mostrar el contenido de la ruta enviada
const printPathContent = (file) => (!checkIfDirectory(file)) ? printFile(file) : printDirectoryFiles(file);
/* const printPathContent = (file) => {
    if (!checkIfDirectory(file)) {
        return printFile(file);
    } else {
        return printDirectoryFiles(file);
    }
} */
// leer y mostrar contenido de un archivo
const printFile = (file) => fs.readFileSync(file).toString();
/* const printFile = (file) => {
    const fileContent = fs.readFileSync(file);
    return fileContent.toString();
}; */
// leer y mostrar contenido de carpetas
const printDirectoryFiles = (dir) => {
    let filesArray = fs.readdirSync(dir);
    filesArray = filesArray.filter(file => {
        if (path.extname(file) == '.md') return file;
    });
    return filesArray;
}
// print the filepath that works
const filePathWorking = (filePath) => {
    if (pathIsVAlid(filePath)) {
        console.log(filePathInputed);
        console.log(printPathContent(filePath))
        return printPathContent(filePath);
    } else {
        console.log('La ruta no existe');
        return 'La ruta no existe';
    }
}

filePathWorking(filePath);


module.exports = {
    pathToAbsolute,
    pathIsVAlid,
    checkIfDirectory,
    printPathContent,
    printFile,
    printDirectoryFiles,
    filePathWorking
};