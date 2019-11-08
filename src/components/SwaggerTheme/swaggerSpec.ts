const capitalize = (str: string) => str[0].toUpperCase() + str.substring(1).toLowerCase();

const getPath = (section: string) => {
  const sectionCapitalized = capitalize(section);
  return {
    "get": {
      "tags": ['/api'],
      "summary": `${sectionCapitalized} info`,
      "description": `Returns an object with my ${sectionCapitalized} info`,
      "operationId": `get${sectionCapitalized}Data`,
      "produces": ["application/json"],
      "responses": {
        "200": { "description": "successful operation" }
      }
    }
  }
};

export const getSpec = (resume: any) => {
  const sections = Object.keys(resume);
  const name = resume.basics && resume.basics.name;

  return {
    "swagger": "2.0",
    "host": "https://cv.geekifier.io",
    "basePath": "",
    "info": {
      "description": `Fully working Swagger API for ${name} Resume`,
      "version": "1.0.3",
      "title": `${name} Resume API`
    },
    tags: {
      "name": '/api',
      "description": ''
    },
    paths: sections.reduce((prev, section) => {
      return Object.assign(prev,{
        [`/${section}`]: getPath(section)
      });
    }, {})
  }
};

