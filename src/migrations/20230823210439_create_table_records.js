exports.up = async (knex) => {
  const tableExist = await knex.schema.hasTable('records');
  if (tableExist) { return; }
  await knex.schema.createTable('records', (table) => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary();
    table.string('operation_id').notNullable();
    table.uuid('user_id').notNullable();
    table.foreign('user_id').references('users.id');
    table.float('amount').notNullable();
    table.float('user_balance').notNullable();
    table.jsonb('operation_response').notNullable();
    table.dateTime('date').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('operations');
};
