import { PartialType } from '@nestjs/swagger';
import { createClinicDTO } from './createClinic.dto';

export class UpdateUserDto extends PartialType(createClinicDTO) {}
