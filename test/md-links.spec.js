// const api = require('../index.js');
const {
  pathToAbsolute, getPathFiles, extractLinks, stats, validate, statsAndValidate,
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
const mockData = [
  {
    "file": "D:\\Laboratoria\\LIM17-md-links\\testDirThree\\file.md",
    "href": "https://google.com",
    "status": 200,
    "statusText": "OK",
    "text": "other one link"
  },
  {
    "file": "D:\\Laboratoria\\LIM17-md-links\\testDirThree\\file.md",
    "href": "https://google.com",
    "status": 200,
    "statusText": "OK",
    "text": "third link"
  }
]
describe('validate', () => {
  it('deberia devolver datos de los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThree';
    const fileLinks = extractLinks(file);
    expect(typeof validate(fileLinks)).toBe('object');
  })
  it('deberia devolver datos de los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThree';
    const fileLinks = extractLinks(file);
    return expect(validate(fileLinks)).resolves.toEqual(mockData);
  })
})

describe('statsAndValidate', () => {
  it('deberia devolver datos de los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThree';
    const fileLinks = extractLinks(file);
    expect(typeof statsAndValidate(fileLinks)).toBe('object');
  })
  it('deberia devolver datos de los links extraidos de las rutas', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThree';
    const fileLinks = extractLinks(file);
    const linksData = {
      "broken": 0,
      "file": "D:\\Laboratoria\\LIM17-md-links\\testDirThree\\file.md",
      "total": 2,
      "unique": 1
    }
    return expect(statsAndValidate(fileLinks)).resolves.toEqual(linksData);
  })
})
