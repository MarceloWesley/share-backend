import { faker } from '@faker-js/faker';
import { SignUpDTO } from 'src/modules/auth/dtos';

export function createOneExampleUser() {
  const dto: SignUpDTO = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    registered_code: null,
  };

  return dto;
}

export async function signUpExampleUser() {
  const data: SignUpDTO = createOneExampleUser();

  return data;
}
