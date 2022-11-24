import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './services/clinic.service';

@Module({
  imports: [PrismaModule],
  providers: [ClinicService],
  controllers: [ClinicController],
})
export class ClinicModule {}
