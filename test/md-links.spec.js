// const api = require('../index.js');
const { pathToAbsolute,  printPathContent, getDirectoryFilesContent, 
  filePathWorking, getFileContent } = require('../cli.js');



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
}); */

describe('printPathContent,', () => {
  it('Deberia imprimir contenido de un directorio', () => {
    expect(printPathContent('D:\\Laboratoria\\LIM17-md-links\\testDirThree'))
    .toStrictEqual(getDirectoryFilesContent('D:\\Laboratoria\\LIM17-md-links\\testDirThree'));
  });
  it('No deberia imprimir contenido de un archivo', () => {
    expect(printPathContent('D:\\Laboratoria\\LIM17-md-links\\index.js'))
    .toBe('no es un archivo .md');
  });
  it('Deberia imprimir contenido de un archivo', () => {
    expect(printPathContent('D:\\Laboratoria\\LIM17-md-links\\testDirTwo\\fileThree.md'))
    .toStrictEqual(getFileContent('D:\\Laboratoria\\LIM17-md-links\\testDirTwo\\fileThree.md'));
  });
});


describe('filePathWorking', () => {
  it('Deberia mostrar contenido del archivo/directorio valido', () => {
    expect(filePathWorking('D:\\Laboratoria\\LIM17-md-links\\index.js'))
    .toBe(printPathContent('D:\\Laboratoria\\LIM17-md-links\\index.js'));
  });
  it('Deberia mostrar un mensaje de error si la ruta no exite', () => {
    expect(filePathWorking('D:\\Laboratoria\\LIM17-md-links\\sub.js')).toBe('La ruta no existe');
    // expect(filePathWorking('D:\\Laboratoria\\LIM17-md-links\\sub.js')).toThrow(TypeError);
    // revisar el throw
  });
});
