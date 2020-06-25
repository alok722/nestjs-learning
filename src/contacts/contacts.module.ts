import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';

@Module({
  controllers: [ContactsController]
})
export class ContactsModule {}
