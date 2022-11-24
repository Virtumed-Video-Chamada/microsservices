import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProxyService } from './rabbitMQ/proxy.service';

@ApiTags('status')
@Controller()
export class AppController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('get')
  getStatus(): { message: string } {
    return { message: 'Back-end is running!' };
  }
}
