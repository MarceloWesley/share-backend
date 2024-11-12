import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { appConfiguration } from './utils/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const serverPort = configService.getOrThrow('SERVER_PORT');
  const TITLE = 'Project - Alexandria';
  const DESCRIPTION = 'The main API of "Alexandria"';
  const API_VERSION = '1.0';

  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(API_VERSION)
    .build();

  appConfiguration(app);

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(serverPort);
}
bootstrap();
