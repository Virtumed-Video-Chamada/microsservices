import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { createClinicDTO } from 'src/modules/clinic/dtos/clinic/createClinic.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  private userSelect = {
    id: true,
    email: true,
    password: false,
    role: false,
    createdAt: true,
    updateAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createClinic(dto: createClinicDTO): Promise<void> {
    try {
      await this.validUser(dto);
      await this.validPassword(dto);
      await this.newClinic(dto);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async validPassword(dto: createClinicDTO) {
    if (dto.password !== dto.confirmPassword) {
      this.logger.error(`'As senhas informadas não são iguais.'`);
      throw new RpcException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;
  }

  async validUser(dto: createClinicDTO) {
    try {
      const clinic = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (clinic) {
        this.logger.error(`Usuário com o e-mail: ${dto.email} Existente`);
        throw new RpcException(`Usuário com o e-mail: ${dto.email} Existente`);
      }
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async hashPassword(dto: createClinicDTO): Promise<string> {
    try {
      const hashPassword = await bcrypt.hash(dto.password, 10);

      return hashPassword;
    } catch (e) {
      throw new RpcException(e.message);
    }
  }

  async newClinic(dto: createClinicDTO): Promise<void> {
    const hashPassword = await this.hashPassword(dto);

    try {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          role: 'Admin',
          password: hashPassword,
        },
        select: this.userSelect,
      });
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  //<----------------- Lógica de deletar por ID ------------------>//
  async delete(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  //<----------------------------------->//
}
