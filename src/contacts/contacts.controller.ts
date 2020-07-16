/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body, Get, NotFoundException, Param, Put, Patch, Delete, ParseIntPipe, Query, DefaultValuePipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { MandatoryFieldsPipes } from 'src/utils/mandatory-field.pipes';
import { UppercasePipe } from 'src/utils/uppercase.pipe';
import { Contact } from './contact';

@Controller('contacts')
export class ContactsController {

    /** NOTE : Basic JS CRUD
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
    */

    // NOTE Exploring service based controller.

    constructor(private service: ContactsService) { }

    @Post()
    addOneContact(@Body() body) {
        if (body instanceof Array) {
            return this.service.addManyContacts(body);
        } else {
            return this.service.addOneContact(body);
        }
    }

    @Get()
    getAllContact() {
        return this.service.getAllContacts();
    }

    @Get('/:id')
    getContactById(@Param('id') id) {
        if (this.service.exists(id)) {
            return this.service.getOneContact(id);
        }
        throw new NotFoundException();
    }

    @Put('/:id')
    updateContactById(@Param('id') id, @Body() contact) {
        if (this.service.exists(id)) {
            return this.service.updateContact(id, contact);
        }
        throw new NotFoundException();
    }

    @Patch('/:id')
    updatePartialContactById(@Param('id') id, @Body() contact) {
        if (this.service.exists(id)) {
            return this.service.partialUpdateContact(id, contact);
        }
        throw new NotFoundException();
    }

    @Delete('/:id')
    deleteContact(@Param('id') id) {
        if (this.service.exists(id)) {
            return this.service.deleteContact(id);
        }
        throw new NotFoundException();
    }

    // NOTE Exploring Pipes
    // Converting to Number from String using ParseIntPipe

    contacts = [
        { id: 1, name: 'Alok Raj', email: 'alok.raj@gmail.com' },
        { id: 2, name: 'Ashish Raj', email: 'ashish.raj@gmail.com' },
        { id: 3, name: 'Ankit Raj', email: 'ankit.raj@gmail.com' }
    ]

    // NOTE @UsePipes(ParseIntPipe) -- Method level pipe,, It is executed before DefaultValuePipe
    @Get('/pipes/test')
    getAllQuery(@Query('_page', new DefaultValuePipe(1), ParseIntPipe) page, @Query('_limit', new DefaultValuePipe(10), ParseIntPipe) limit): any {
        return {
            page: {
                value: page,
                type: typeof(page)
            },
            limit: {
                value: limit,
                type: typeof(limit)
            }
        }
    }

    @Get('pipe/:id')
    getOne(@Param('id', ParseIntPipe) id): any {
        const c = this.contacts.find(c1 => c1.id === id);
        if (!c) {
            throw new NotFoundException();
        }
        return { ...c };
    }

    // NOTE:  Validating payload via custom Pipe
    @Post('/pipes/test')
    createContact(@Body(new MandatoryFieldsPipes(['name', 'email', 'phone'])) body) {
        return body;
    }

    // NOTE: Checking Upper case Pipe

    @Get('pipes/query')
    @UsePipes(UppercasePipe)
    query(@Query('city') city, @Query('state') state, @Query('country') country) {
        return {city, state, country};
    }

    // NOTE : ValidationPipe Usage
    // We can verify class validation by disabling global custom filter in main.ts
    @Post('validationtest')
    @UsePipes(ValidationPipe)
    createContactWithValidation(@Body() contact: Contact) {
        console.log('I am here')
        return contact;
    }

}
