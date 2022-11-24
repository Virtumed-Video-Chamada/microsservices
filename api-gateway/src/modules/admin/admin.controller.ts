import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedClinic } from 'src/auth/decorators/logged-clinic.decorator';
import { User } from 'src/auth/models/user.model';
import { createClinicDTO } from 'src/modules/clinic/dtos/clinic/createClinic.dto';
import { ProxyService } from 'src/rabbitMQ/proxy.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly proxyService: ProxyService) {}

  private adminBackend = this.proxyService.getAdminMicroservice();

  @Post('register')
  @UsePipes(ValidationPipe)
  createClinic(@Body() createClinic: createClinicDTO): void {
    this.adminBackend.emit('create-admin', createClinic);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um admin pelo ID',
  })
  findOne(@LoggedClinic() user: User) {
    return this.adminBackend.send('find-by-id', user.id ? user.id : '');
  }
}
