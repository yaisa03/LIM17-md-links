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
const getPathFiles = (Path) => {
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
        mdFilesArray = mdFilesArray.concat(getPathFiles(currentPath));
      });
    }
    return mdFilesArray;

  } else return 'La ruta no existe';
}

// obtener links dentro de un archivo .md
const extractLinks = (path) => {
  const mdFilesArray = getPathFiles(path);
  if (typeof mdFilesArray === 'string') return mdFilesArray;

  else {
    let links = [];
    mdFilesArray.forEach((File) => {

      if (File === 'no es un archivo .md') return File;
      else {
        const fileContent = printFile(File);
        const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm; ///\[([^\[]+)\]\(http?(.*)\)/gm
        const singleMatch = /\[([^\[]+)\]\((.*)\)/;
        const matches = fileContent.match(regexMdLinks);

        if (matches == null) return; // console.error(File, ('no hay links en este archivo .md'));
        
        for (let i = 0; i < matches.length; i++) {
          const text = singleMatch.exec(matches[i]);
          if (text[2].slice(0, 4) === 'http') {
            links.push({
              href: `${text[2]}`,
              text: `${text[1]}`,
              file: File
            });
          }
        }
      }
    })
    return links;
  }
}

// cantidad de links totales y unicos
const stats = (fileLinks) => {
  if (typeof fileLinks !== 'string') {
    const fileLinksUnique = new Set(fileLinks.map(e => e.href));
    return {
      total: fileLinks.length,
      unique: fileLinksUnique.size,
    }
  }
}

// validar estado de los links con uan peticion http
const validate = (fileLinks) => {
  const linksInfo = fileLinks.map(content => {
    const statusInfo = axios.get(content.href)
      .then((response) => {
        return {
          href: content.href,
          text: content.text,
          file: content.file,
          status: response.status,
          statusText: response.statusText
        }
      })
      .catch(() => {
        return {
          href: content.href,
          text: content.text,
          file: content.file,
          status: '',
          statusText: 'fail'
        }
      });
    return statusInfo;
  });
  return Promise.all(linksInfo);
}

module.exports = {
  pathToAbsolute, getPathFiles, extractLinks, stats, validate,
};
