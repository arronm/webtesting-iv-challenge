const db = require('./db.config');
const model = require('./models');

describe('models', () => {
  beforeAll(() => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  beforeEach(async () => {
    await db('people').truncate();
  });

  it('should ', () => {
    expect(1).toBe(1);
  });

  // describe('insert()', () => {
  //   it('should insert the provided data', async () => {
  //     let data = await model.add({
  //       name: 'a',
  //       email: 'a',
  //     });
  //     expect(data.length).toBe(1);
  //   });
  // });
});
