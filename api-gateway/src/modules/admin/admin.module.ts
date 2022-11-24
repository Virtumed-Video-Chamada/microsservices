import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ProxyRMQModule } from 'src/rabbitMQ/proxy.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [ProxyRMQModule, PassportModule],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
