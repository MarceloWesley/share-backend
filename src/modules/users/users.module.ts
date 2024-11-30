import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '@/shared/prisma';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  imports: [JwtModule],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
