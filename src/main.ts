import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AnyExceptionFilter } from './any-exception/any-exception.filter';
import { AllResponseInterceptor } from './all-response/all-response.interceptor';
import { ApolloClient, InMemoryCache } from '@apollo/client';

// https://docs.nestjs.com/openapi/introduction
// https://docs.nestjs.com/recipes/prisma
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apolloClient = new ApolloClient({
    uri: 'http://example.com/graphql',
    cache: new InMemoryCache(),
  });

  app.useGlobalInterceptors(new AllResponseInterceptor()); //使用自定义的全局拦截器，对数据做处理
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AnyExceptionFilter());
  app.use(cookieParser()); // 使用cookie格式化插件
  app.enableCors({ origin: true, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('API documentation')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); //访问文档时，直接访问/api
  await app.listen(3000);
}
bootstrap();
