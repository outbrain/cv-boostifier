import {BasicTheme, basicImage} from './BasicTheme/BasicTheme';
import {SqlTheme, sqlImage} from './SqlTheme/SqlTheme';
import {SwaggerTheme, swaggerImage} from './SwaggerTheme/SwaggerTheme';
import {CssTyperTheme, cssTyperImage} from './CssTyperTheme/CssTyperTheme';

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
    name: 'basic',
    displayName: 'Basic',
    component: BasicTheme,
    image: basicImage,
    createdBy: 'Daniel Sternlicht',
    createdByLink: 'https://github.com/dsternlicht'
  },
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
