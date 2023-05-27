import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/demo')
  demoFun() {
    return 'This is demo';
  }
  // @Get('/:id')
  // getOneByID(@Param() param, @Query() query) {
  //   return { param, query };
  // }

  @Post('/auth/admin_login')
  login(@Body() user, @Res({ passthrough: true }) response: Response) {
    response.cookie('token', 'xiaohei', { httpOnly: true });
    return user;
  }
}
