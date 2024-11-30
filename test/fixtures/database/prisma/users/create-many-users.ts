import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/.';

const genFakerCode = () => {
  const letters = faker.string.alpha({ length: 5 }); // Gera 5 letras
  const number = faker.number.int({ min: 0, max: 9 }); // Gera 1 número
  const code = `${letters}${number}`;
  return code;
};

export function createExampleUser() {
  const dto: any = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    invite_code: genFakerCode(),
    remaining_invites: faker.number.int({ min: 1, max: 5 }),
  };

  return dto;
}

export async function CreateManyUsers(orm: PrismaClient, size: number = 5) {
  const data: any[] = [];

  for (let i = 0; i < size; i++) {
    data.push(createExampleUser());
  }

  await orm.user.createMany({
    data,
  });

  return data;
}
