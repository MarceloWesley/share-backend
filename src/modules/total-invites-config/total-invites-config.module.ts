import { Module } from '@nestjs/common';
import { TotalInvitesConfigService } from './total-invites-config.service';
import { TotalInvitesConfigController } from './total-invites-config.controller';
import { PrismaService } from 'src/shared/prisma';

@Module({
  controllers: [TotalInvitesConfigController],
  providers: [TotalInvitesConfigService, PrismaService],
  exports: [TotalInvitesConfigService],
})
export class TotalInvitesConfigModule {}
