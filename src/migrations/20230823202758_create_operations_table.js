exports.up = async (knex) => {
  const tableExist = await knex.schema.hasTable('operations');
  if (tableExist) { return; }
  await knex.schema.createTable('operations', (table) => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary();
    table.string('type').notNullable();
    table.string('cost').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('operations');
};
