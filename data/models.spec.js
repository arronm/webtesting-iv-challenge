const db = require('./db.config');
const model = require('./models');

describe('models', () => {
  beforeAll(() => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  beforeEach(async () => {
    await db('people').truncate();
  });

  describe('add()', () => {
    it('should insert the provided data', async () => {
      let data = await model.add({
        name: 'a',
        email: 'a',
      });

      expect(data.name).toBe('a');
      expect(data.email).toBe('a');
    });
  });

  describe('update()', () => {
    it('should update an existing record with the provided id and data', async () => {
      await model.add({
        name: 'a',
        email: 'a',
      });

      let data = await model.update(1, {
        email: 'b',
      });

      expect(data.name).toBe('a');
      expect(data.email).toBe('b');
    });
  });

  describe('remove()', () => {
    it('should remove an existing record with the provided id', async () => {
      await model.add({
        name: 'a',
        email: 'a',
      });

      let data = await model.remove(1);
      expect(data.name).toBe('a');
      expect(data.email).toBe('a');
    })
  });
});
