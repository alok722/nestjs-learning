/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { ContactsModule } from './contacts/contacts.module';
import { LoggerMiddleware } from './logger.middleware';
import { enableCors } from './cors.middleware';
import { ContactsController } from './contacts/contacts.controller';
import * as helmet from 'helmet';

@Module({
  imports: [ContactsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet(), LoggerMiddleware, enableCors)
    /** Below I have implemented middlware for all the routes of Contact controller */
      .forRoutes(ContactsController);
    /** Below I have implemented for only get request of the routes of Contact controller */
      // .forRoutes({
      //   path: 'contacts', method: RequestMethod.GET
      // })
  }

}
