import {SqlTheme} from './SqlTheme/SqlTheme';
import sqlImage from './SqlTheme/sql.png';
import {SwaggerTheme} from './SwaggerTheme/SwaggerTheme';
import swaggerImage from './SwaggerTheme/swagger.png';

export interface ITheme {
  name: string;
  displayName: string;
  component: any;
  image?: any;
}

export const THEMES: ITheme[] = [
  {
    name: 'sql',
    displayName: 'SQL Terminal',
    component: SqlTheme,
    image: sqlImage
  },
  {
    name: 'swagger',
    displayName: 'Swagger',
    component: SwaggerTheme,
    image: swaggerImage
  }
];
