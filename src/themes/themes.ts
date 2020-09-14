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
}

export const THEMES: ITheme[] = [
  {
    name: 'csstyper',
    displayName: 'CSS Typer',
    component: CssTyperTheme,
    image: cssTyperImage,
    createdBy: 'Tsachi Shushan'
  },
  {
    name: 'sql',
    displayName: 'SQL Terminal',
    component: SqlTheme,
    image: sqlImage,
    createdBy: 'Tsachi Shushan'
  },
  {
    name: 'swagger',
    displayName: 'Swagger',
    component: SwaggerTheme,
    image: swaggerImage
  }
];
