import {
  ConflictException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma';
import { CreateUserDTO, UpdateOneUserByIdDTO } from './dtos';

import * as bcrypt from 'bcrypt';
import { PaginationDTO, PaginationMetaDTO } from 'src/shared/dtos/pagination';
import { CommonFilter } from 'src/shared/types';
import { prismaExclude } from 'src/utils/prisma';

@Injectable()
export class UsersService {
  public constructor(private readonly prismaService: PrismaService) {}

  private async hashPassword(password: string) {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  private async createInviteCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomNumber = Math.floor(Math.random() * 10);
    let result = '';

    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * letters.length);
      result += letters[index];
    }

    const code = result + randomNumber;

    return code;
  }

  public async verifyEmailExistence(email: string) {
    const data = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (data) throw new ConflictException('Email already exists');
  }

  public async consumeInvite(code: string) {
    const user = (await this.findOneByCode(code)).data;

    if (user.remaining_invites === 0) {
      throw new GoneException('Invalid code');
    }

    const currentInvites = user.remaining_invites - 1;

    const userDecreasedInvite: UpdateOneUserByIdDTO = {
      ...user,
      remaining_invites: currentInvites,
    };

    await this.updateOneById(user.id, userDecreasedInvite);
  }

  public async createOne(dto: CreateUserDTO) {
    const { name, email, password, registered_code } = dto;
    let registeredCode = null;

    await this.verifyEmailExistence(email);

    if (registered_code) {
      registeredCode = registered_code;
      await this.consumeInvite(registeredCode);
    }

    const hashedPassword = await this.hashPassword(password);
    const code = await this.createInviteCode();

    const data = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        registered_code: registeredCode,
        invite_code: code,
        remaining_invites: 5,
      },
      select: prismaExclude('User', ['password']),
    });

    return {
      data,
    };
  }

  public async findAll({ pagination: { page = 1, size = 5 } }: CommonFilter) {
    const filter = {
      OR: [{ deletedAt: null }],
    };
    const total = await this.prismaService.user.count({
      where: filter,
    });

    page = +page;
    size = +size;

    const data = await this.prismaService.user.findMany({
      skip: (page - 1) * size,
      take: size,
      where: filter,
      select: prismaExclude('User', ['password']),
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  public async findOneById(id: number) {
    const data = await this.prismaService.user.findUnique({
      where: { id: +id },
      select: prismaExclude('User', ['password']),
    });

    if (!data) throw new NotFoundException('The user was not found.');

    return {
      data,
    };
  }

  public async findOneByEmail(email: string) {
    const data = await this.prismaService.user.findUnique({
      where: { email },
      select: prismaExclude('User', ['password']),
    });

    if (!data) throw new NotFoundException('The user was not found.');

    return {
      data,
    };
  }

  public async findOneByCode(code: string) {
    const data = await this.prismaService.user.findUnique({
      where: { invite_code: code },
      select: prismaExclude('User', ['password']),
    });

    if (!data) throw new NotFoundException('Invite code not found');

    return {
      data,
    };
  }

  public async findOneByEmailWithPassword(email: string) {
    const data = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!data) throw new NotFoundException('The user was not found.');

    return {
      data,
    };
  }

  public async updateOneById(id: number, dto: UpdateOneUserByIdDTO) {
    const { password, name, remaining_invites } = dto;

    await this.findOneById(id);

    let hashedPassword = undefined;

    if (password) {
      hashedPassword = await this.hashPassword(password);
    }

    const data = await this.prismaService.user.update({
      where: {
        id: +id,
      },
      data: {
        password: hashedPassword,
        name,
        remaining_invites,
      },
      select: prismaExclude('User', ['password']),
    });

    return {
      data,
    };
  }

  public async deleteOne(id: number) {
    await this.findOneById(id);

    const data = await this.prismaService.user.update({
      where: { id: +id },
      data: {
        deletedAt: new Date(),
      },
      select: prismaExclude('User', ['password']),
    });

    return { data };
  }
}
