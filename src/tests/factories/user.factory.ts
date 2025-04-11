import { factory } from 'factory-girl';
import Chance from 'chance';

const chance = new Chance();

factory.define('user', Object, {
 id: () => chance.guid(),
 name: () => chance.name(),
 email: () => chance.email(),
 created_at: () => chance.date(),
})