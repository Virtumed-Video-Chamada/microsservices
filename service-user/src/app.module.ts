import { Module } from '@nestjs/common';
import { ClinicController } from './modules/clinic/clinic.controller';
import { ConfigModule } from '@nestjs/config';
import { ClinicService } from './modules/clinic/services/clinic.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClinicModule } from './modules/clinic/clinic.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ClinicModule,
  ],
  providers: [ClinicService],
})
export class AppModule {}
