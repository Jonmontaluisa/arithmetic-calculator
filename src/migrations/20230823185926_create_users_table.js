exports.up = async (knex) => {
  const tableExist = await knex.schema.hasTable('users');
  if (tableExist) { return; }
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('status').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users');
};
