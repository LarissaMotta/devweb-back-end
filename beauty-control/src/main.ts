import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';

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

    const configService: ConfigService = app.get(ConfigService);
    // Set the config options
    const adminConfig: ServiceAccount = {
        "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
        "privateKey": configService.get<string>('FIREBASE_PRIVATE_KEY')
            .replace(/\\n/g, '\n'),
        "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    };

    // Initialize the firebase admin app
    admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
        storageBucket: configService.get<string>('FIREBASE_STORAGE_BUCKER'),
    }); 


    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
