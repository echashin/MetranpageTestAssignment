import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectRepositoryService } from '../../project/services/project-repository.service';
import { ProjectDto } from '../../project/dto/project.dto';
import { ProjectBuildInput } from '../../worker/inputs/project-build.input';
import { WorkerService } from '../../worker/services/worker.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectRepositoryService: ProjectRepositoryService,
    private readonly workerService: WorkerService,
  ) {}

  @Get()
  getProjects(): ProjectDto[] {
    return this.projectRepositoryService.getList();
  }

  @Post('build')
  buildProject(
    @Body() request: ProjectBuildInput,
  ): Promise<{ buildedProject: string }> {
    return this.workerService.buildProject(request);
  }
}
