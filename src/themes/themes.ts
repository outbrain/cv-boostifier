import {SqlTheme} from './SqlTheme/SqlTheme';
import sqlImage from './SqlTheme/sql.png';
import {SwaggerTheme} from './SwaggerTheme/SwaggerTheme';
import swaggerImage from './SwaggerTheme/swagger.png';
import {CssTyperTheme} from './CssTyperTheme/CssTyperTheme';
import cssTyperImage from './CssTyperTheme/CssTyper.png';

export interface ITheme {
  name: string;
  displayName: string;
  createdBy?: string;
  component: any;
  image?: any;
  previewImage?: any;
  createdByLink?: string;
}

export const THEMES: ITheme[] = [
  {
    name: 'csstyper',
    displayName: 'CSS Typer',
    component: CssTyperTheme,
    image: cssTyperImage,
    createdBy: 'Tsachi Shushan',
    createdByLink: 'https://github.com/tsachis'
  },
  {
    name: 'sql',
    displayName: 'SQL Terminal',
    component: SqlTheme,
    image: sqlImage,
    createdBy: 'Tsachi Shushan',
    createdByLink: 'https://github.com/tsachis'
  },
  {
    name: 'swagger',
    displayName: 'Swagger',
    component: SwaggerTheme,
    image: swaggerImage
  }
];
