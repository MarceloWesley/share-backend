import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ModulesModule } from './modules/modules.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      envFilePath: '.env',
    }),

    SharedModule,
    ModulesModule,
  ],
})
export class AppModule {}
