import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
 return knex.schema.createTable('projects', function (table) {
  table.uuid('id').primary().notNullable();
  table.string('name').notNullable();
  table.uuid('owner_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
  table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
 });
}


export async function down(knex: Knex): Promise<void> {
 return knex.schema.dropTableIfExists('projects');
}
