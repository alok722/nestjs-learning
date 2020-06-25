import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {

    contacts = [
        { id: 1, name: 'Alok Raj', email: 'alok.raj@gmail.com' },
        { id: 2, name: 'Ashish Raj', email: 'ashish.raj@gmail.com' },
        { id: 3, name: 'Ankit Raj', email: 'ankit.raj@gmail.com' }
    ]

    @Get()
    getAll(): any {
        return [...this.contacts];
    }

    @Get('/:contactId')
    getOne(@Param('contactId') id: number): any {
        const c = this.contacts.find(c1 => c1.id == id);
        if (!c) {
            throw new NotFoundException();
        }
        return {...c};
    }
}
