import { Controller, Get, NotFoundException, Param, Body, Post } from '@nestjs/common';

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
        return { ...c };
    }

    @Post()
    createContacts(@Body() body: any[]): any {
        const ids = this.contacts.map(c => c.id);

        const newId = 1 + Math.max(...ids);

        let out = null;

        if (body instanceof Array) {
            const contacts = body;
            contacts.forEach((c, i) => {
                c.id = newId + i;
            });
            this.contacts.push(...contacts);
            out = contacts;
        } else {
            const contact: any = body;
            contact['id'] = newId;
            this.contacts.push(contact);
            out = contact;
        }

        return out;
    }
}
