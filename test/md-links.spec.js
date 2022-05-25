// const api = require('../index.js');
const {
  getPathsFiles, extractLinks, stats,
} = require('../index.js');

describe('getPathsFiles', () => {
  it('deberia devolver el contenido de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThree';
    expect(typeof getPathsFiles(file)).toBe('object');
  })
  it('deberia devolver el contenidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThre';
    expect(typeof getPathsFiles(file)).toBe('string');
  })
})

describe('extractLinks', () => {
  it('deberia devolver los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThree';
    expect(typeof extractLinks(file)).toBe('object');
  })
})

describe('stats', () => {
  it('deberia devolver datos de los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThree';
    const fileLinks = extractLinks(file);
    expect(typeof stats(fileLinks)).toBe('object');
  })
})
