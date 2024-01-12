export type Project = {
  id: number;
};

export type Template = {
  id: number;
  arg1: string;
  arg2: string;
};

export type ProjectResponse = {
  projects: Project[];
};

export type TemplateResponse = {
  projects: Template[];
};

export type BuildResponse = {
  buildedProject: string;
}
