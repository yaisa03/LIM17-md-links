const fs = require('fs');
const path = require('path');
const axios = require('axios');

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

// recorrer rutas y extraer archivos.md en un array
const getPathsFiles = (Path) => {
  const filepath = pathToAbsolute(Path);
  let mdFilesArray = [];

  if (pathIsVAlid(filepath)) {
    if (checkIfFile(filepath)) {

      if (checkIfMDFile(filepath)) {
        mdFilesArray.push(filepath);

      } else return 'no es un archivo .md';

    } else {
      printDirectory(filepath).forEach(file => {
        let currentPath = path.join(filepath, file);
        mdFilesArray = mdFilesArray.concat(getPathsFiles(currentPath));
      });
    }
    return mdFilesArray;

  } else return 'La ruta no existe';
}

// obtener links dentro de un archivo .md
const extractLinks = (path) => {
  const mdFilesArray = getPathsFiles(path); //console.log(mdFilesArray);
  if (typeof mdFilesArray === 'string') return mdFilesArray;

  else {
    let links = [];
    mdFilesArray.forEach((File) => {

      if (File === 'no es un archivo .md') return File;
      else {
        const fileContent = printFile(File);
        const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm; ///\[([^\[]+)\]\(http?(.*)\)/gm
        const matches = fileContent.match(regexMdLinks);
        const singleMatch = /\[([^\[]+)\]\((.*)\)/;// console.log('links', matches);
        
        if (matches == null) return;// console.error(File, chalk.red('no hay links en este archivo .md'));
        else {
          for (let i = 0; i < matches.length; i++) {
            const text = singleMatch.exec(matches[i]);
            if (text[2].slice(0, 4) === 'http') {//console.log(`Match #${i}:`, text);
              links.push({
                href: `${text[2]}`,
                text: `${text[1]}`,
                file: File
              });
            }
          }
        }
      }
    })
    return links;
  }
}

// cantidad de links totales y unicos
const stats = (fileLinks) => { // const fileLinks = extractLinks(path);
  if (typeof fileLinks !== 'string') {
    const fileLinksUnique = new Set(fileLinks.map(e => e.href));
    return {
      total: fileLinks.length,
      unique: fileLinksUnique.size,
    }
  }
}

const validate = (fileLinks) => {
  fileLinks.map(content => {
    axios.get(content.href).then((response) => {
      console.log({
        href: content.href,
        text: content.text,
        file: content.file,
        status: response.status,
        statusText: response.statusText
      })
    }).catch((error) => (error))
  })
}

module.exports = {
  pathToAbsolute, getPathsFiles, extractLinks, stats, validate,
};
