import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return `Try <b><i>/contacts</i></b> instead`;
  }
}
