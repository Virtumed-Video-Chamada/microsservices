import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { User } from 'src/auth/models/user.model';
import { createClinicDTO } from 'src/modules/clinic/dtos/clinic/createClinic.dto';
import { ProxyService } from 'src/rabbitMQ/proxy.service';
import { Request } from 'express';
import { LoggedUser } from 'src/auth/decorators/logged-user.decorator';

@ApiTags('clinic')
@Controller('clinic')
export class ClinicController {
    private logger = new Logger(ClinicController.name);

    constructor(private readonly proxyService: ProxyService) {}

    private clinicBackend = this.proxyService.getClinicMicroservice();

    @Post('register')
    @UsePipes(ValidationPipe)
    createClinic(@Body() createClinic: createClinicDTO): void {
        this.clinicBackend.emit('create-clinic', createClinic);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @UsePipes(ValidationPipe)
    @Get(':id')
    @ApiOperation({
        summary: 'Visualizar uma clínica pelo ID',
    })
    findOne(@LoggedUser() user: User): Observable<any> {
        return this.clinicBackend.send('find-by-id', user.id ? user.id : '');
    }
}

