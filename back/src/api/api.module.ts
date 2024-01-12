import { Module } from '@nestjs/common';
import { TemplateModule } from '../template/template.module';
import { ProjectModule } from '../project/project.module';
import { controllers } from './controllers';
import { WorkerModule } from '../worker/worker.module';

@Module({ imports: [TemplateModule, ProjectModule, WorkerModule], controllers })
export class ApiModule {}
