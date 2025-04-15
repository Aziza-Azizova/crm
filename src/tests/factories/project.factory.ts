import { factory } from 'factory-girl';
import Chance from 'chance';

const chance = new Chance();

factory.define('project', Object, {
 id: () => chance.guid(),
 name: () => chance.name(),
 owner_id: () => chance.guid(),
 created_at: () => chance.date(),
})

factory.define('projects', Object, {
 id: () => chance.guid(),
 name: () => chance.name(),
 owner_id: () => chance.guid(),
 created_at: () => chance.date(),
 total_tasks: '1',
 todo_tasks: '0',
 done_tasks: '0',
 in_progress_tasks: '1',
})