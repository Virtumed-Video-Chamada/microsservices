import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProxyRMQModule } from 'src/rabbitMQ/proxy.module';
import { ClinicController } from './clinic.controller';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    ProxyRMQModule,
  ],
  controllers: [ClinicController],
})
export class ClinicModule {}
