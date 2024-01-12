import { Injectable } from '@nestjs/common';
import { TemplateDto } from '../dto/template.dto';

@Injectable()
export class TemplateRepositoryService {
  private readonly templates: TemplateDto[] = [
    {
      id: 1,
      arg1: 'arg1-1',
      arg2: 'arg2-1',
    },
    {
      id: 2,
      arg1: 'arg1-2',
      arg2: 'arg2-2',
    },
    {
      id: 3,
      arg1: 'arg1-3',
      arg2: 'arg2-3',
    },
  ];

  getList(): TemplateDto[] {
    return this.templates;
  }

  getTemplateParams(id: number): Record<string, string> {
    const template: TemplateDto = this.templates.find(
      (template: TemplateDto) => template.id === id,
    );

    if (!template) {
      throw new Error(`Template with id:${id} not found`);
    }

    return Object.fromEntries(
      Object.entries(template).filter(
        ([key]: [string, string | number]) => key !== 'id',
      ),
    );
  }
}
