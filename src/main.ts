import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MyCustomExceptionFilter } from './utils/my-custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Cutom exception handler at global level
  // app.useGlobalFilters(new MyCustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
