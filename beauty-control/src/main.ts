import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    
    const options = new DocumentBuilder()
    .setTitle('Beauty Control API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('devweb')
    .addBearerAuth()
    .build();
    
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
