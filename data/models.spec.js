const db = require('./db.config');
const model = require('./models');

describe('models', () => {
  beforeAll(() => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  beforeEach(async () => {
    await db('people').truncate();
  });

  describe('insert()', () => {
    it('should insert the provided data', async () => {
      let data = await model.add({
        name: 'a',
        email: 'a',
      });
      expect(data.length).toBe(1);
    });
  });
});
