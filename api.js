module.exports = () => {
    // ..00.
    mdLinks;
};
const { extractLinks } = require('./index.js');


const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (options === { validate: true }) {
            resolve(extractLinks(path));
        } else if (options === { validate: false }) {
            return;
        }
    })
}

