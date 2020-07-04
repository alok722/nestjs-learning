/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, NotFoundException, Param, Body, Post, Put, Patch, Delete } from '@nestjs/common';

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

    @Put('/:id')
    updateContact(@Param('id') id, @Body() contact): any {
        const index = this.contacts.findIndex(c => c.id == id)
        if (index === -1) {
            throw new NotFoundException();
        }

        contact.id = parseInt(id);
        this.contacts[index] = contact;
        return contact;
    }

    @Patch('/:id')
    partialUpdate(@Param('id') id, @Body() contact): any {
        const index = this.contacts.findIndex(c => c.id == id)
        if (index === -1) {
            throw new NotFoundException();
        }
        this.contacts[index] = {...this.contacts[index], ...contact};
        return {...this.contacts[index]};
    }

    @Delete('/:id')
    deleteContact(@Param('id') id): any {
        const index = this.contacts.findIndex(c => c.id == id)
        if (index === -1) {
            throw new NotFoundException();
        }
        const deleted = this.contacts.splice(index, 1);
        return deleted[0];
    }
}
