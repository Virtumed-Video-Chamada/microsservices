import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { createClinicDTO } from './dtos/clinic/createClinic.dto';
import { ClinicService } from './services/clinic.service';

@Controller()
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  logger = new Logger(ClinicController.name);

  @EventPattern('create-clinic')
  async createClinic(
    @Payload() createClinic: createClinicDTO,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    await this.clinicService.createClinic(createClinic);
    await this.ackMessage(context);
  }

  @MessagePattern('find-by-id')
  async handleFindById(@Payload() id: string, @Ctx() context: RmqContext) {
    console.log(id);
    try {
      const response = await this.clinicService.findById(id);
      if (response) {
        return response;
      }
    } finally {
      await this.ackMessage(context);
    }
  }

  private async ackMessage(context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    await channel.ack(message);
  }
}
