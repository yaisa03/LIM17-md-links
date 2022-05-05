#!/usr/bin/env node

// const mdLinks = require("./index.js");
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
// extension del archivo
const fileExtension = path.extname(filePath);

// leer y mostrar contenido de un archivo
const printFile = (error, content) => {
    if (error) {
        console.log(error)
    } else {
        console.log(filePath);
        console.log(fileExtension);
        console.log(content.toString());
    }
}
// ver si la ruta es absoluto o relativo
const validatePathType = (filePath) => {
    const pathValue = path.isAbsolute(filePath);
    console.log(pathValue);
    return pathValue;
}
// leer y mostrar contenido de carpetas
const printDirectoryFiles = (err, files) => {
    if (err)
        console.log(err);
    else {
        console.log("\nCurrent directory filenames:");
        files.forEach(file => {
                 console.log(file);
            })
           /*  if (path.extname(file)/fileExtension == ".md")
                console.log(file);
        }) */
    }
}
// ver si es carpeta o archivo
const valiateDirectory = fs.statSync(filePath).isDirectory()
// mostrar el contenido de la ruta enviada
const printPathContent = () => {
    if (!valiateDirectory) {
        fs.readFile(filePath, printFile);
        validatePathType(filePath);
    } else {
        fs.readdir(filePath, printDirectoryFiles);
    }
}
printPathContent();
