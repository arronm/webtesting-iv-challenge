const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const get = id => {
  if (!id) return db('people');
  return db('people').where({ id }).first();
}

const add = (data) => {
  return db('people')
    .insert(data)
    .then(ids => {
      return get('people')(ids[0]);
  });
}

const update = (id, data) => {
  return db('people')
    .where({ id })
    .update(data)
    .then(() => {
      return get('people')(id);
  });
}

const remove = async (id) => {
  const record = await get('people')(id);
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
