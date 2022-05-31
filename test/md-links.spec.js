// const api = require('../index.js');
const {
  pathToAbsolute, getPathFiles, extractLinks, stats, validate, statsAndValidate,
} = require('../index.js');

const { mdLinks } = require('../api.js');

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
    const file = 'D:\\Laboratoria\\LIM17-md-links\\test\\testDirThree';
    expect(typeof getPathFiles(file)).toBe('object');
  })
})

describe('extractLinks', () => {
  it('deberia devolver los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\test\\testDirThree';
    expect(typeof extractLinks(file)).toBe('object');
  })
})

describe('stats', () => {
  it('deberia devolver datos de los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\test\\testDirThree';
    const fileLinks = extractLinks(file);
    expect(typeof stats(fileLinks)).toBe('object');
  })
})

const mockData = [
  {
    "file": "D:\\Laboratoria\\LIM17-md-links\\test\\testDirThree\\file.md",
    "href": "https://google.com",
    "status": 200,
    "statusText": "OK",
    "text": "other one link"
  },
  {
    "file": "D:\\Laboratoria\\LIM17-md-links\\test\\testDirThree\\file.md",
    "href": "https://google.com",
    "status": 200,
    "statusText": "OK",
    "text": "third link"
  }
]
describe('validate', () => {
  it('deberia devolver un object', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\test\\testDirThree';
    const fileLinks = extractLinks(file);
    expect(typeof validate(fileLinks)).toBe('object');
  })
  it('deberia devolver datos de los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\test\\testDirThree';
    const fileLinks = extractLinks(file);
    return expect(validate(fileLinks)).resolves.toEqual(mockData);
  })
})

describe('statsAndValidate', () => {
  it('deberia devolver datos de los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\test\\testDirThree';
    const fileLinks = extractLinks(file);
    expect(typeof statsAndValidate(fileLinks)).toBe('object');
  })
  it('deberia devolver datos de los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\test\\testDirThree\\file.md';
    const fileLinks = extractLinks(file);
    const linksData = {
      "broken": 0,
      "file": "D:\\Laboratoria\\LIM17-md-links\\test\\testDirThree\\file.md",
      "total": 2,
      "unique": 1
    }
    return expect(statsAndValidate(fileLinks)).resolves.toEqual(linksData);
  })

  const file = 'D:\\Laboratoria\\LIM17-md-links\\test\\testDirTwo\\fileTwo.md';
  const fileLinks = extractLinks(file);
  const linksData = {
    "broken": 1,
    "file": "D:\\Laboratoria\\LIM17-md-links\\test\\testDirTwo\\fileTwo.md",
    "total": 2,
    "unique": 2
  }
  it('deberia devolver datos de los links extraidos de las rutas', () => statsAndValidate(fileLinks)
    .then(response => {
      expect(response).toStrictEqual(linksData);
    }));
})

describe('mdLinks', () => {
  const path = 'test\\testDirThree';
  it('Deberia devolver cuando validate es false', () => mdLinks(path, { validate: false })
    .then(response => {
      expect(typeof (response)).toBe('object');
    }));
  it('Deberia devolver cuando validate es true', () => mdLinks(path, { validate: true })
    .then(response => {
      expect(typeof (response)).toBe('object');
    }));
  it('Deberia devolver cuando no se ingresa una ruta', () => mdLinks()
    .catch(err => {
      expect(err).toBe('Ingrese una ruta');
    }));
  it('Deberia devolver cuando la ruta no existe', () => mdLinks('index', { validate: true })
    .catch(err => {
      expect(err).toBe('La ruta no existe');
    }));
  it('Deberia devolver cuando no hay links en el archivo', () => mdLinks('test\\testDirThree\\testDirOne\\file.md', { validate: true })
    .catch(err => {
      expect(err).toBe('No hay links');
    }));
  it('Deberia devolver cuando la ruta ingresada no es un archivo .md', () => mdLinks('test\\testDirThree\\testDirOne\\file.html', { validate: true })
    .catch(err => {
      expect(err).toBe('No es un archivo .md');
    }));
});