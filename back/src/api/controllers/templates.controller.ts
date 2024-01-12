import { Controller, Get } from '@nestjs/common';
import { TemplateRepositoryService } from '../../template/services/template-repository.service';
import { TemplateDto } from '../../template/dto/template.dto';

@Controller('templates')
export class TemplatesController {
  constructor(
    private readonly templateRepositoryService: TemplateRepositoryService,
  ) {}

  @Get()
  getTemplates(): TemplateDto[] {
    return this.templateRepositoryService.getList();
  }
}
