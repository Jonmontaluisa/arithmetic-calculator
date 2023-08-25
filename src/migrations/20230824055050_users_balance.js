exports.up = async (knex) => {
  const tableExist = await knex.schema.hasTable('users_balance');
  if (tableExist) { return; }
  await knex.schema.createTable('users_balance', (table) => {
    table.uuid('id').primary();
    table.foreign('id').references('users.id');
    table.float('balance').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users_balance');
};
