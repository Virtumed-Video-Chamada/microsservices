import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ClinicModule } from './modules/clinic/clinic.module';
import { StorageModule } from './common/storage/storage.module';
import { ProxyRMQModule } from './rabbitMQ/proxy.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ClinicModule,
        ProxyRMQModule,
        StorageModule,
        AuthModule,
        PrismaModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
