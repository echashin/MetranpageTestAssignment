import { Module } from '@nestjs/common';
import { WorkerService } from './services/worker.service';
import { TemplateModule } from '../template/template.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TemplateModule],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
