import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/shared/prisma';
import { TotalInvitesConfigModule } from '../total-invites-config/total-invites-config.module';

@Module({
  controllers: [UsersController],
  imports: [TotalInvitesConfigModule],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
