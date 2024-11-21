import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HomeService } from './home.service';
import { IsUnguarded } from 'src/installations/installations.decorator';

@ApiTags('Home')
@IsUnguarded()
@Controller({
  path: 'home',
  version: '1',
})
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  appInfo() {
    return this.service.appInfo();
  }
}
