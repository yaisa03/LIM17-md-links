
const { extractLinks, validate, pathToAbsolute, pathIsVAlid } = require('./index.js');


const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (!path) {
            reject('Ingrese una ruta');
        } else {
            const filepath = pathToAbsolute(path);

            if (pathIsVAlid(filepath)) {
                const pathLinks = extractLinks(filepath);
                
                if (pathLinks.length === 0) {
                    reject('no hay links');
                } else {
                    if (options.validate) {
                        validate(pathLinks).then((files) => {
                            resolve(files);
                        });
                    } else {
                        resolve(pathLinks);
                    }
                }

            } else reject('La ruta no existe');
        }
    });
}

module.exports = {
    mdLinks,
};

