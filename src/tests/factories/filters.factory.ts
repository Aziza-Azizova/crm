import { factory } from 'factory-girl';
import Chance from 'chance';

const chance = new Chance();

factory.define('filters', Object, {
 total: () => chance.integer(),
 todo: () => chance.integer(),
 in_progress: () => chance.integer(),
 done: () => chance.integer(),
})