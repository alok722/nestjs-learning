/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @Post()
    @UsePipes(new ValidationPipe({transform: true}))
    createUser(@Body() body: User) {
        this.service.addOneUser(body);
    }

    @Get()
    getAllUser(@Query('_page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('_limit', new DefaultValuePipe(10), ParseIntPipe) limit: number) {
        return this.service.getAllContacts(page, limit);
    }
}
