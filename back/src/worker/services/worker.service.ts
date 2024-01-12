import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { WorkerResponseDto } from '../dto/woker-response.dto';
import { TemplateRepositoryService } from '../../template/services/template-repository.service';
import { ProjectBuildInput } from '../inputs/project-build.input';

@Injectable()
export class WorkerService {
  private readonly workerUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly templateRepositoryService: TemplateRepositoryService,
  ) {
    this.workerUrl = process.env.WORKER_URL;
  }

  async buildProject({
    projectId,
    templateId,
  }: ProjectBuildInput): Promise<{ buildedProject: string }> {
    const templateParams: Record<string, string> =
      this.templateRepositoryService.getTemplateParams(templateId);

    // TODO actually, there should be queue scheduling, at actual project RabbitMQ is used
    const response = await this.makeRequest(`${this.workerUrl}/build`, {
      id: projectId,
      templateParams,
    });

    if (response) {
      const processedData = response.buildedProject!;
      return {
        buildedProject: `Additionally processed data from worker: ${processedData}`,
      };
    } else {
      throw new Error('Something went wrong');
    }
  }

  private async makeRequest(
    url: string,
    body?: object,
  ): Promise<WorkerResponseDto | false> {
    if (!url) {
      throw new Error('No url');
    }
    return firstValueFrom(
      this.httpService.post(url, {
        ...body,
      }),
    )
      .then((response) => {
        if (response.data.success && response.data.success === true) {
          return response.data;
        }
        console.error(`Request is ok, but service returned an error ${url}:`);
        console.error(response);
        return false;
      })
      .catch((error) => {
        console.error(`Cannot make request ${url}:`);
        console.error(error);

        return false;
      });
  }
}
