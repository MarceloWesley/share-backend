import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDTO, SignUpDTO } from './dtos';
import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  public constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn({ email, password }: SignInDTO) {
    let user: Awaited<User>;

    try {
      const { data } =
        await this.usersService.findOneByEmailWithPassword(email);
      user = data;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('The user was not found');
        throw new UnauthorizedException('The credentials are invalid');
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('The credentials are invalid');
    }

    const expiresIn = this.configService.get('JWT_EXPIRES_IN');

    delete user.password;
    const userWithoutPassword = user;

    const payload = {
      ...userWithoutPassword,
      expiresIn,
    };

    const token = await this.jwtService.signAsync(payload, { expiresIn });

    return { data: token };
  }

  public async signUp(dto: SignUpDTO) {
    const { data } = await this.usersService.createOne(dto);

    return { data };
  }
}
