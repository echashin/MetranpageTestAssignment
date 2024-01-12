import { Module } from '@nestjs/common';
import { ProjectRepositoryService } from './services/project-repository.service';

@Module({
  providers: [ProjectRepositoryService],
  exports: [ProjectRepositoryService],
})
export class ProjectModule {}
