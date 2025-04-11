import { factory } from 'factory-girl';
import Chance from 'chance';

const chance = new Chance();

factory.define('task', Object, {
 id: () => chance.guid(),
 title: () => chance.name(),
 status: 'todo',
 project_id: () => chance.guid(),
 created_at: () => chance.date(),
})