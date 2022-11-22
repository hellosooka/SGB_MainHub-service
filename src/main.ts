import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  createDocumentation(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
  console.log(`Server started on ${PORT} port`);
}

const createDocumentation = (app: any) => {
  const config = new DocumentBuilder()
    .setTitle('Nest start course')
    .setDescription('This is for SGB')
    .setVersion('1.0.0')
    .addTag('practice')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
};

bootstrap();
