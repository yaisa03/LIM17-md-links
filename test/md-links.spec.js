// const api = require('../index.js');
const {
  pathToAbsolute, getPathFiles, extractLinks, stats,
} = require('../index.js');

describe('pathToAbsolute', () => {
  it('Debería retornar la misma ruta', () => {
    expect(pathToAbsolute('D:\\Laboratoria\\LIM17-md-links\\README.md'))
      .toBe('D:\\Laboratoria\\LIM17-md-links\\README.md');
  });
  it('Debería retornar la ruta convertida a absoluta', () => {
    expect(pathToAbsolute('README.md')).toBe('D:\\Laboratoria\\LIM17-md-links\\README.md');
  });
});

describe('getPathFiles', () => {
  it('deberia devolver el contenido de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThree';
    expect(typeof getPathFiles(file)).toBe('object');
  })
  it('Deberia mostrar un mensaje de error si la ruta no exite', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThre';
    expect(getPathFiles(file)).toBe('La ruta no existe');
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
