/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Req, HttpException, Param } from '@nestjs/common';
import * as fs from 'fs';
import { FileNotFoundException } from './utils/file-not-found-exception';

@Controller()
export class AppController {

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
