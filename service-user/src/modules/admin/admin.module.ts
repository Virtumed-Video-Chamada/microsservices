import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';

@Module({
  imports: [PrismaModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class ClinicModule {}
