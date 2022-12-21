import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  initializeProject() {
    return this.appService.initializeProject();
  }

  @Get('/about-us')
  getAboutUs() {
    return 'about';
  }
}
