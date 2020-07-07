/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Req, HttpException } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello(@Req() req): string {
    const auth = req.header('Authorization');
    if(!auth) {
      // throw new Error('Not Authorized!'); ** This is not returned and handled by Nest itself
      throw new HttpException('Not Authorized!', 403);
    }
    return `Try <b><i>/contacts</i></b> instead`;
  }
}
