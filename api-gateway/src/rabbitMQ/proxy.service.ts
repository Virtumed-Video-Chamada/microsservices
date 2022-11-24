import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    ClientProxy,
    ClientProxyFactory,
    Transport,
} from '@nestjs/microservices';

@Injectable()
export class ProxyService {
    constructor(private readonly configService: ConfigService) {}

    getClinicMicroservice(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [
                    `amqp://${this.configService.get<string>(
                        'RABBITMQ_USER',
                    )}:${this.configService.get<string>(
                        'RABBITMQ_PASSWORD',
                    )}@${this.configService.get<string>('RABBITMQ_URL')}`,
                ],
                queue: 'clinic',
            },
        });
    }

    getAdminMicroservice(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [
                    `amqp://${this.configService.get<string>(
                        'RABBITMQ_USER',
                    )}:${this.configService.get<string>(
                        'RABBITMQ_PASSWORD',
                    )}@${this.configService.get<string>('RABBITMQ_URL')}`,
                ],
                queue: 'admin',
            },
        });
    }

    getDoctorMicroservice(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [
                    `amqp://${this.configService.get<string>(
                        'RABBITMQ_USER',
                    )}:${this.configService.get<string>(
                        'RABBITMQ_PASSWORD',
                    )}@${this.configService.get<string>('RABBITMQ_URL')}`,
                ],
                queue: 'doctor',
            },
        });
    }
}
