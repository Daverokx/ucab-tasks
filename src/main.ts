import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configuración de Swagger (Documentación)
  const config = new DocumentBuilder()
    .setTitle('UCAB Tasks API')
    .setDescription('API para la gestión de notas de texto')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // 2. Aquí le decimos que Swagger viva en la ruta '/api'
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();