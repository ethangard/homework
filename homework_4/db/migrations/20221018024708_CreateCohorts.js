/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('cohorts', (table) => {
    table.increments('id');
    table.string('name');
    table.string('logoUrl');
    // table.specificType('members', 'TEXT[]');
    table.string('members');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('cohorts');
};
