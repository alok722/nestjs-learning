/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Req, HttpException, Param, ForbiddenException } from '@nestjs/common';
import * as fs from 'fs';
import { FileNotFoundException } from './utils/file-not-found-exception';
// import { MyCustomExceptionFilter } from './utils/my-custom-exception.filter';

@Controller()
// commenting as we have applied at global level
// @UseFilters(MyCustomExceptionFilter) // Applicable to entire App controller
export class AppController {

  // Checking whether we are able to override and customize the default exception handler of NEST
  // Implementing, at individual level
  @Get('/hello')
  // @UseFilters(MyCustomExceptionFilter)
  hello() {
    throw new ForbiddenException();
  }

  @Get('/:filename')
  sendFile(@Param('filename') filename: string) {
    try {      
      const content = fs.readFileSync(filename, 'utf-8');
      return content;
    } catch (error) {
      const err = {
        timestamp: new Date().toLocaleString(),
        message: error.message
      }
      throw new FileNotFoundException(err);
    }
  }

  @Get()
  getHello(@Req() req): string {
    const auth = req.header('Authorization');
    if(!auth) {
      // throw new Error('Not Authorized!'); ** This is not returned and handled by Nest itself
      const err = {
        code: 403,
        desc: {
          short: 'Forbidden!',
          long: 'Backend didn\'t received the Authorization Header',
        },
        timestamp: new Date().toLocaleString()
      }
      throw new HttpException(err, 403);
    }
    return `Try <b><i>/contacts</i></b> instead`;
  }
}
