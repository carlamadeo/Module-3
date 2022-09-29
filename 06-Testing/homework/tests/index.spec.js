const session = require('supertest-session');
//const {expect} = require('chai');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.
const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with an object with message `hola`', () =>
      agent.get('/').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with an object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [], num: 1}).expect(200));
    it('responds with true', () =>
      agent.post('/sumArray')
        .send({array: [2, 5, 7, 10, 11, 15, 20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it('responds with false', () =>
      agent.post('/sumArray')
        .send({array: [2, 5, 7, 10, 11, 15, 20], num: 100})
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
    it('should not add the same number twice', () =>
      agent.post('/sumArray')
        .send({array: [2, 8, 8, 10, 11, 15, 20], num: 16})
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
  });

  describe('POST /numString', () => {
    it('responds with 200', () => agent.post('/numString').send({string: 'string'}).expect(200));
    it('responds with 4', () =>
      agent.post('/numString').send({string: 'hola'}).then((res) => expect(res.body.result).toEqual(4)));
    it('responds with a status 400 (bad request) if the parameter is a number', () =>
      agent.post('/numString').send({string: 9}).expect(400));
    it('responds with a status 400 (bad request) if the parameter is an empty string', () =>
      agent.post('/numString').send({string: ''}).expect(400));
  });

  describe('POST /pluck', () => {
    const array = [{title: 'Libro uno', stock: 10}, {title: 'Libro dos', stock: 2}, {title: 'Libro tres', stock: 0}];
    it('responds with 200', () => agent.post('/pluck').send({array: array, prop: 'title'}).expect(200));
    it('responds with titles', () =>
      agent.post('/pluck').send({array: array, prop: 'title'}).then((res) => expect(res.body.result).toEqual(['Libro uno', 'Libro dos', 'Libro tres'])));
    it('responds with a status 400 (bad request) if the parameter is not an array', () =>
      agent.post('/pluck').send({array: 64, prop: 'title'}).expect(400));
    it('responds with a status 400 (bad request) if the parameter is an empty string', () =>
      agent.post('/pluck').send({array: array, prop: ''}).expect(400));
  });

});

