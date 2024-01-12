import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { WorkerModule } from './worker/worker.module';
import { TemplateModule } from './template/template.module';
import { ApiModule } from './api/api.module';
import { ProjectModule } from './project/project.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),

    WorkerModule,
    TemplateModule,
    ProjectModule,
    ApiModule,
  ],
})
export class AppModule {}
