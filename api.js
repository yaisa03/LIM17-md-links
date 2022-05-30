
const { extractLinks, validate, } = require('./index.js');


const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (!path) {
            reject('Ingrese una ruta');
        } else {
            const pathLinks = extractLinks(path);
            if (options.validate) {
                validate(pathLinks).then((files) => {
                    resolve(files);
                });
            } else {
                if (pathLinks.length === 0) {
                    resolve('no hay links');
                } else {
                    resolve(pathLinks);
                }
            }
        }
    });
}

module.exports = {
    mdLinks,
};

