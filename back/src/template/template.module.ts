import { Module } from '@nestjs/common';
import { TemplateRepositoryService } from './services/template-repository.service';

@Module({
  providers: [TemplateRepositoryService],
  exports: [TemplateRepositoryService],
})
export class TemplateModule {}
