// const api = require('../index.js');
const { pathToAbsolute, printPathContent, getDirectoryFilesContent,
  readFileAndDirectory, getFileContent, extractLinks } = require('../cli.js');



describe('pathToAbsolute', () => {
  it('Debería retornar la misma ruta', () => {
    expect(pathToAbsolute('D:\\Laboratoria\\LIM17-md-links\\index.js'))
      .toBe('D:\\Laboratoria\\LIM17-md-links\\index.js');
  });
  it('Debería retornar la ruta convertida a absoluta', () => {
    expect(pathToAbsolute('index.js')).toBe('D:\\Laboratoria\\LIM17-md-links\\index.js');
  });
});

/* describe('pathIsVAlid', () => {
  it('Deberia comprobar que la ruta es valida', () => {
    expect(pathIsVAlid('D:\\Laboratoria\\LIM17-md-links\\index.js')).toBe(true);
    expect(pathIsVAlid('index.js')).toBe(true);
  });
  it('Deberia comprobar que la ruta no es valida', () => {
    expect(pathIsVAlid('sub.js')).toBe(false);
    expect(pathIsVAlid('D:\\Laboratoria\\LIM17-md-links\\sub.js')).toBe(false);
  });
}); */

/* describe('checkIfDirectory', () => {
  it('Deberia comprobar que es un directorio', () => {
    expect(checkIfDirectory('D:\\Laboratoria\\LIM17-md-links\\testDirThree')).toBe(true);
    expect(checkIfDirectory('testDirThree')).toBe(true);
  });
  it('Deberia comprobar que es un archivo', () => {
    expect(checkIfDirectory('D:\\Laboratoria\\LIM17-md-links\\index.js')).toBe(false);
    expect(checkIfDirectory('index.js')).toBe(false);
  });
});
 */
describe('printPathContent,', () => {
  it('Deberia imprimir contenido de un directorio', () => {
    const dir = 'D:\\Laboratoria\\LIM17-md-links\\testDirThree';
    expect(typeof printPathContent(dir, getDirectoryFilesContent(dir)))
      .toBe('object');
  });
  it('Deberia imprimir contenido de un directorio', () => {
    const dir = 'D:\\Laboratoria\\LIM17-md-links\\testDirFour';
    expect(typeof printPathContent(dir, getDirectoryFilesContent(dir)))
      .toBe('string');
  });
  it('No deberia imprimir contenido de un archivo', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\index.js';
    expect(typeof printPathContent(file, getFileContent(file)))
      .toBe('string');
  });
  it('Deberia imprimir contenido de un archivo', () => {
    const dir = 'D:\\Laboratoria\\LIM17-md-links\\testDirTwo\\fileThree.md';
    expect(typeof printPathContent(dir, getFileContent(dir)))
      .toBe('string');
  });
});


describe('readFileAndDirectory', () => {
  it('Deberia mostrar contenido del archivo/directorio valido', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\index.js';
    expect(readFileAndDirectory(file))
      .toBe('no es un archivo .md');
  });
  it('Deberia mostrar contenido del archivo/directorio valido', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\README.md';
    expect(readFileAndDirectory(file))
      .toStrictEqual(printPathContent(file, getFileContent(file)));
  });
  it('Deberia mostrar contenido del archivo/directorio valido', () => {
    const dir = 'D:\\Laboratoria\\LIM17-md-links\\testDirFour';
    expect(readFileAndDirectory(dir))
      .toBe('no hay archivos .md en este directorio');
  });
  it('Deberia mostrar un mensaje de error si la ruta no exite', () => {
    expect(readFileAndDirectory('D:\\Laboratoria\\LIM17-md-links\\sub.js')).toBe('La ruta no existe');
    // expect(filePathWorking('D:\\Laboratoria\\LIM17-md-links\\sub.js')).toThrow(TypeError);
    // revisar el throw
  });
});

describe('getDirectoryFilesContent', () => {
  /* it('deberia devolver el contenido de los archivos .md dentro de un directorio', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirThree';
    expect(typeof getDirectoryFilesContent(file)).toBe('object');
  }) */
  it('deberia devolver un aviso si no hay archivos .md dentro del directorio', () => {
    const file = 'D:\\Laboratoria\\LIM17-md-links\\testDirFour';
    expect(getDirectoryFilesContent(file)).toBe('no hay archivos .md en este directorio');
  })
})
