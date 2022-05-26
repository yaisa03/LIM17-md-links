
const { stats, validate } = require('./index.js');


const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (options.stats && options.validate) {
            resolve('opcion stats y validate');

        } else if (options.validate) {
            validate(path).then((files) => {
                resolve(files);
            });

        } else if (options.stats) {
            resolve(stats(path));

        } else {
            if (path.length === 0) {
                resolve('no hay links');
            } else {
                resolve(path);
            }
        }
    });
}

module.exports = {
    mdLinks,
};

