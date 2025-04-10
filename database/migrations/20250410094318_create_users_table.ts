import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
 return knex.schema.createTable('users', function (table) {
  table.uuid('id').primary().notNullable();
  table.string('email').notNullable().unique();
  table.string('name').notNullable();
  table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
 });
}


export async function down(knex: Knex): Promise<void> {
 return knex.schema.dropTableIfExists('users');
}
