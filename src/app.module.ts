/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { ContactsModule } from './contacts/contacts.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { enableCors } from './middleware/cors.middleware';
import { ContactsController } from './contacts/contacts.controller';
import { UsersModule } from './users/users.module';
import * as helmet from 'helmet';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-intro'),
    ContactsModule,
    UsersModule
  ],
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
