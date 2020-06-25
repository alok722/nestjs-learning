import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [ContactsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
