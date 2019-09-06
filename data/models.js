const db = require('./db.config');

const get = id => {
  if (!id) return db('people');
  return db('people').where({ id }).first();
}

const add = (data) => {
  return db('people')
    .insert(data)
    .then(ids => {
      return get(ids[0]);
  });
}

const update = (id, data) => {
  return db('people')
    .where({ id })
    .update(data)
    .then(() => {
      return get(id);
  });
};

const remove = async (id) => {
  const record = await get(id);
  await db('people')
    .where({ id })
    .del();
  return record;
};

module.exports = ({
  add,
  get,
  update,
  remove,
});
