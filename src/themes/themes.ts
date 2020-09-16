export interface ITheme {
  name: string;
  displayName: string;
  createdBy?: string;
  component: string;
  createdByLink?: string;
}

export const THEMES: ITheme[] = [
  {
    name: 'csstyper',
    displayName: 'CSS Typer',
    component: 'CssTyperTheme',
    createdBy: 'Tsachi Shushan',
    createdByLink: 'https://github.com/tsachis'
  },
  {
    name: 'sql',
    displayName: 'SQL Terminal',
    component: 'SqlTheme',
    createdBy: 'Tsachi Shushan',
    createdByLink: 'https://github.com/tsachis'
  },
  {
    name: 'swagger',
    displayName: 'Swagger',
    component: 'SwaggerTheme',
  }
];
