import { Injectable } from '@nestjs/common';
import { ProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectRepositoryService {
  private readonly projects: ProjectDto[] = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];

  getList(): ProjectDto[] {
    return this.projects;
  }
}
