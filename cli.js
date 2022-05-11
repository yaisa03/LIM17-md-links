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
            filesArray = filesArray.concat(getDirectoryFiles(currentPath))
        }
    });
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
// imprimir contenido de la ruta
const printPathContent = (file) => (!checkIfDirectory(file)) ? getFileContent(file) : getDirectoryFilesContent(file);

// mostrar contenido de rutas validas
const filePathWorking = (file) => {
    const filepath = pathToAbsolute(file);
    if (pathIsVAlid(filepath)) {
        console.log(file);
        console.log('La ruta es valida');
        console.log(printPathContent(filepath));
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