import { faker } from '@faker-js/faker';

export default [
  {
    id: 1,
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
  },
  {
    id: 2,
    username: 'Dawid',
    email: 'example@mail.com',
    password: 'abc123',
    photoURL: 'photo.com',
    avatarURL: 'avatar.com',
    whacamoleTopScore: 15,
    memoryTopScore: 10,
  },
];
