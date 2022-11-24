import { PartialType } from '@nestjs/swagger';
import { createClinicDTO } from './createAdmin.dto';

export class UpdateUserDto extends PartialType(createClinicDTO) {}
