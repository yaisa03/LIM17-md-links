// const api = require('../index.js');
const { pathToAbsolute, pathIsVAlid, checkIfDirectory, printPathContent,
  printFile, printDirectoryFiles, filePathWorking } = require('../cli.js');



describe('pathToAbsolute', () => {
  it('Debería retornar la misma ruta', () => {
    expect(pathToAbsolute('D:\\Laboratoria\\LIM17-md-links\\index.js'))
    .toBe('D:\\Laboratoria\\LIM17-md-links\\index.js');
  });
  it('Debería retornar la ruta convertida a absoluta', () => {
    expect(pathToAbsolute('index.js')).toBe('D:\\Laboratoria\\LIM17-md-links\\index.js');
  });
});

describe('pathIsVAlid', () => {
  it('Deberia comprobar que la ruta es valida', () => {
    expect(pathIsVAlid('D:\\Laboratoria\\LIM17-md-links\\index.js')).toBe(true);
    expect(pathIsVAlid('index.js')).toBe(true);
  });
  it('Deberia comprobar que la ruta no es valida', () => {
    expect(pathIsVAlid('sub.js')).toBe(false);
    expect(pathIsVAlid('D:\\Laboratoria\\LIM17-md-links\\sub.js')).toBe(false);
  });
});

describe('checkIfDirectory', () => {
  it('Deberia comprobar que es un directorio', () => {
    expect(checkIfDirectory('D:\\Laboratoria\\LIM17-md-links\\testDirThree')).toBe(true);
    expect(checkIfDirectory('testDirThree')).toBe(true);
  });
  it('Deberia comprobar que es un archivo', () => {
    expect(checkIfDirectory('D:\\Laboratoria\\LIM17-md-links\\index.js')).toBe(false);
    expect(checkIfDirectory('index.js')).toBe(false);
  });
});

describe('printPathContent,', () => {
  it('Deberia imprimir contenido de un directorio', () => {
    expect(printPathContent('D:\\Laboratoria\\LIM17-md-links\\testDirThree'))
    .toStrictEqual(printDirectoryFiles('D:\\Laboratoria\\LIM17-md-links\\testDirThree'));
  });
  it('Deberia imprimir contenido de un archivo', () => {
    expect(printPathContent('D:\\Laboratoria\\LIM17-md-links\\index.js'))
    .toBe(printFile('D:\\Laboratoria\\LIM17-md-links\\index.js'));
  });
});

describe('printFile', () => {
  it('Deberia imprimir contenido del archivo', () => {
    expect(typeof printFile('D:\\Laboratoria\\LIM17-md-links\\index.js')).toBe('string');
  });
  /* test del contenido del archivo*/
});
describe('printDirectoryFiles', () => {
  it('Deberia imprimir archivos del directorio', () => {
    expect(typeof printDirectoryFiles('D:\\Laboratoria\\LIM17-md-links\\testDirTwo')).toBe('object');
  }); // deberia de ser un array
  /* test del contenido del directorio*/
});

describe('filePathWorking', () => {
  it('Deberia mostrar contenido del archivo/directorio', () => {
    expect(filePathWorking('D:\\Laboratoria\\LIM17-md-links\\index.js'))
    .toBe(printPathContent('D:\\Laboratoria\\LIM17-md-links\\index.js'));
  });
  it('Deberia mostrar un mensaje de error si la ruta no exite', () => {
    expect(filePathWorking('D:\\Laboratoria\\LIM17-md-links\\sub.js')).toBe('La ruta no existe');
    // revisar el throw
  });
});
