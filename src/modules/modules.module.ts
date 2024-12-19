import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TotalInvitesConfigModule } from './total-invites-config/total-invites-config.module';

@Module({
  imports: [UsersModule, AuthModule, TotalInvitesConfigModule],
})
export class ModulesModule {}
