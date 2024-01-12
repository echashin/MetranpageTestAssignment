import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class ProjectBuildInput {
  @IsNotEmpty()
  @IsNumber()
  @IsDefined()
  projectId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsDefined()
  templateId: number;
}
