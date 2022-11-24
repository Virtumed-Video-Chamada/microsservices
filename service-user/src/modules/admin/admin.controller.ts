import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { createClinicDTO } from './dtos/createAdmin.dto';
import { AdminService } from './services/admin.service';

@Controller()
export class AdminController {
  constructor(private readonly clinicService: AdminService) {}

  logger = new Logger(AdminController.name);

  @EventPattern('create-admin')
  async createClinic(
    @Payload() createClinic: createClinicDTO,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    await this.clinicService.createClinic(createClinic);
    await this.ackMessage(context);
  }

  private async ackMessage(context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    await channel.ack(message);
  }
}
