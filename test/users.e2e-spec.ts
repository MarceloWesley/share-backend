import * as supertest from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';

import { ExecutionContext, INestApplication } from '@nestjs/common';

import * as qs from 'qs';

import { PrismaClient } from '@prisma/client';

import { UsersModule } from '@/modules/users/users.module';
import { appConfiguration } from '@/utils/config';
import { CreateUserDTOFixture } from './fixtures/dtos';
import { CreateManyUsers } from './fixtures/database/prisma/users';
import { AuthFixtureModule, AuthFixtureService } from './fixtures/modules/auth';
import { signUpExampleUser } from './fixtures/database/prisma/auth';
import { SignUpDTO } from '@/modules/auth/dtos';
import { AuthGuard } from '@/shared/guards';

const orm = new PrismaClient();

describe('Users', () => {
  let app: INestApplication;
  let createdUsers: any[] = [];
  let authFixtureService: AuthFixtureService;
  let token: string;
  let exampleUser: SignUpDTO;
  let loggedUser: any;
  let registeredUser: CreateUserDTOFixture;

  const TOTAL_REGISTERS = 15;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AuthFixtureModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          if (request.headers.authorization.split(' ')[1] === 'valid') {
            return true;
          }
          return false;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();

    authFixtureService = app.get<AuthFixtureService>(AuthFixtureService);

    appConfiguration(app);

    await app.init();
  });

  beforeAll(async () => {
    await orm.$connect();

    createdUsers = await CreateManyUsers(orm, TOTAL_REGISTERS);
    createdUsers = createdUsers.map(({ password, ...props }) => props);
    console.log(createdUsers);
  });

  describe('/api/users (GET)', () => {
    describe('Success responses', () => {
      it.each`
        page | size  | total | pageCount | hasPrevious | hasNext  | description
        ${1} | ${15} | ${15} | ${1}      | ${false}    | ${false} | ${'should return the first 5 users with hasNext in pagination'}
      `(
        '$description',
        async ({
          page = 1,
          size = 10,
          total = TOTAL_REGISTERS,
          pageCount = Math.ceil(total / size),
          hasPrevious,
          hasNext,
        }) => {
          const query = qs.stringify(
            { page, size },
            { addQueryPrefix: true, skipNulls: true },
          );

          const defaultMeta = {
            page: 1,
            size: 10,
            total: TOTAL_REGISTERS,
            pageCount: 2,
            hasPrevious: false,
            hasNext: false,
          };

          const meta = defaultMeta;

          if (page) meta['page'] = page;
          if (size) meta['size'] = size;
          if (total) meta['total'] = total;
          if (pageCount) meta['pageCount'] = pageCount;
          if (hasPrevious) meta['hasPrevious'] = hasPrevious;
          if (hasNext) meta['hasNext'] = hasNext;

          const uri = `/api/users${query}`;

          const sut = await supertest(app.getHttpServer())
            .get(uri)
            .auth('valid', { type: 'bearer' });

          expect(sut.status).toBe(200);
          console.log('sut body', sut.body);
          expect(sut.body).toEqual(
            expect.objectContaining({
              data: expect.arrayContaining(
                createdUsers
                  .slice((page - 1) * meta.size, meta.size)
                  .map(({ name, email, invite_code, remaining_invites }) =>
                    expect.objectContaining({
                      id: expect.any(Number),
                      name,
                      email,
                      remaining_invites,
                      invite_code,
                      createdAt: expect.any(String),
                      deletedAt: null,
                      updatedAt: expect.any(String),
                      invited_by: expect.any(Number),
                    }),
                  ),
              ),
              meta,
            }),
          );

          expect(sut.body.data).toHaveLength(
            hasNext ? meta.size : total % meta.size || meta.size,
          );
        },
      );

      it(`Should create user and return it`, () => {
        return supertest(app.getHttpServer())
          .get('/api/users')
          .auth(token, { type: 'bearer' })
          .expect(200);
      });
    });
  });

  afterAll(async () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Início do dia
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Fim do dia

    await orm.user.deleteMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    await orm.$disconnect();

    await app.close();
  });
});
