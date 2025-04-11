import { factory } from 'factory-girl';
import Chance from 'chance';

const chance = new Chance();

factory.define('project', Object, {
 id: () => chance.guid(),
 name: () => chance.name(),
 owner_id: () => chance.guid(),
 created_at: () => chance.date(),
})