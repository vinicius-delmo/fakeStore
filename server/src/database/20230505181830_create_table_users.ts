import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", function (table) {
    table.increments('id').primary();
    table.string('user').notNullable();
    table.string('password').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}

