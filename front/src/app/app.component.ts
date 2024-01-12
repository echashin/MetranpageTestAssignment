import {Component, OnInit} from "@angular/core";
import {BehaviorSubject, map, Observable, Subscription} from "rxjs";
import {ApiService} from "./api.service";
import {Project, Template} from "./models";

export type ProjectState = {
  project: Project;
  templateId: number | null;
  buildedProject: string;
  error: string;
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  private sub: Subscription = new Subscription();
  private projectsSubject: BehaviorSubject<ProjectState[]> = new BehaviorSubject<ProjectState[]>([]);
  projects: Observable<ProjectState[]> = this.projectsSubject.asObservable();
  templates: Template[] = [];

  constructor(private readonly appService: ApiService) {
  }

  ngOnInit() {
    this.loadTemplates();
    this.loadProjects();
  }

  private loadProjects(): void {
    this.sub.add(
      this.appService
        .getProjects()
        .pipe(map((projects: Project[]) => projects.map((project) => ({project, buildedProject: "", error: "",templateId:null}))))
        .subscribe((projectData) => {
          this.projectsSubject.next(projectData);
        }),
    );
  }

  onTemplateSelect(projectId: number, $event: any): void {
    this.setProjectTemplate(projectId, $event.target.value);
  }

  private setProjectTemplate(projectId: number, templateId: number): void {
    this.projectsSubject.next(this.projectsSubject.value.map((p) => ({
      ...p,
      templateId: p.project.id === projectId ? templateId : p.templateId
    })))

  }


  private loadTemplates(): void {
    this.sub.add(
      this.appService
        .getTemplates()
        .subscribe((templates) => {
          this.templates = templates;
        }),
    );
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async buildProject(id: number) {
    const project = this.projectsSubject.value.find((p: ProjectState) => p.project.id === id);
    if (!project || !project.templateId) {
      return;
    }


    try {
      const result = await this.appService.buildProject(id, project.templateId);

      project.buildedProject = result.buildedProject;
    } catch (e) {
      console.error(e);
      project.error = "Something went wrong";
    }
  }
}
