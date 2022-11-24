import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.useGlobalInterceptors(
        new LoggingInterceptor(),
        new TimeoutInterceptor(),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('Virtumed')
        .setDescription('An api for video calling doctors and patients')
        .setVersion('1.0.0')
        .addTag('status')
        .addTag('access')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    const baseUrl = 'http://localhost:8080';
    console.log(`🚀 Server is running on!  ${baseUrl}/docs`);

    await app.listen(process.env.PORT || 8080);
}

bootstrap();

