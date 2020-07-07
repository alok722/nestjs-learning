/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { ContactsModule } from './contacts/contacts.module';
import { LoggerMiddleware } from './logger.middleware';
import { ContactsController } from './contacts/contacts.controller';

@Module({
  imports: [ContactsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
      .forRoutes(ContactsController);
  }

}
