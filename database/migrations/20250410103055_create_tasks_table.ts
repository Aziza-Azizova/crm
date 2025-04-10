import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
 return knex.schema.createTable('tasks', function (table) {
  table.uuid('id').primary().defaultTo(knex.raw("gen_random_uuid()"));
  table.string('title').notNullable();
  table.enu('status', ['todo', 'in_progress', 'done']).notNullable();
  table.uuid('project_id').notNullable().references('id').inTable('projects').onDelete('CASCADE');
  table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
 });
}


export async function down(knex: Knex): Promise<void> {
 return knex.schema.dropTableIfExists('tasks');
}
