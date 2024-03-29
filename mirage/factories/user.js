import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  username() {
    return faker.name.firstName();
  },
  email() {
    return faker.internet.email();
  },
  password() {
    return faker.internet.password();
  },
  photoURL() {
    return faker.image.avatar();
  },
  avatarURL() {
    return faker.image.people();
  },
  whacamoleTopScore() {
    return faker.datatype.number({ max: 100 });
  },
  memoryTopScore() {
    return faker.datatype.number({ max: 100 });
  },
});
