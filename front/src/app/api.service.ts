import {HttpClient} from "@angular/common/http";
import {BuildResponse, Project, ProjectResponse, Template} from "./models";
import {Injectable} from "@angular/core";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private readonly backendUrl: string = "http://localhost:4443";

  constructor(private readonly http: HttpClient) {
  }

  getTemplates() {
    return this.http.get<Template[]>(`${this.backendUrl}/templates`);
  }

  getProjects() {
    return this.http.get<Project[]>(`${this.backendUrl}/projects`);
  }

  async buildProject(projectId: number, templateId: number) {
    return firstValueFrom(
      this.http.post<BuildResponse>(`${this.backendUrl}/projects/build`, {
        projectId,
        templateId
      }),
    );
  }
}
