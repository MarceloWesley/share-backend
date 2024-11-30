import { Module } from '@nestjs/common';

import { AuthFixtureService } from './auth-fixture.service';
import { ApplicationConfigModule } from '../config';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [AuthModule, ApplicationConfigModule],
  exports: [AuthFixtureService],
  providers: [AuthFixtureService],
})
export class AuthFixtureModule {}
