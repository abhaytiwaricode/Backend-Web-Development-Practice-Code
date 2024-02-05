import { faker } from '@faker-js/faker'; // ESM
const { faker } = require('@faker-js/faker'); // CJS

let getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

console.log(getRandomUser());