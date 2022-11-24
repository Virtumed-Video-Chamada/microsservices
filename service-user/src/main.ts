import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { RpcExceptionFilter } from './common/filters/rpc-exception.filter';

const logger = new Logger('Main');

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.URL],
                noAck: false,
                queue: 'clinic',
            },
        },
    );

    app.useGlobalFilters(new RpcExceptionFilter());

    await app.listen().then(() => logger.log('Microservice is listening'));
}

bootstrap();
