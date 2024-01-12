import { ModuleMetadata } from '@nestjs/common';
import { TemplatesController } from './templates.controller';
import { ProjectsController } from './projects.controller';

export const controllers: ModuleMetadata['controllers'] = [
  TemplatesController,
  ProjectsController,
];
