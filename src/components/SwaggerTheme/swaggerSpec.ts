export const swaggerSpec = {
  "tags": [
    {
      "name": "personal",
      "description": "personal info about me"
    },
    {
      "name": "education",
      "description": "List of institutes"
    },
    {
      "name": "experience",
      "description": "Jobs and Projects"
    },
    {
      "name": "skills",
      "description": "My skills"
    }
  ],
  "swagger": "2.0",
  "host": "https://cv.geekifier.io",
  "basePath": "",
  "info": {
    "description": "This is an API for Tsachi CV",
    "version": "1.0.3",
    "title": "CV API"
  },
  "paths": {
    "/personal": {
      "get": {
        "tags": [
          "personal"
        ],
        "summary": "My personal info",
        "description": "Returns an object with my info",
        "operationId": "getPersonalData",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "successful operation"
          }
        }
      }
    },
    "/education": {
      "get": {
        "tags": [
          "education"
        ],
        "summary": "My education info",
        "description": "Returns an Array of institutes",
        "operationId": "getEducationData",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "successful operation"
          }
        }
      }
    },
    "/experience": {
      "get": {
        "tags": [
          "experience"
        ],
        "summary": "My experience info",
        "description": "Returns an Array of jobs",
        "operationId": "getExperienceData",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "successful operation"
          }
        }
      }
    },
    "/skills": {
      "get": {
        "tags": [
          "skills"
        ],
        "summary": "My experience info",
        "description": "Returns an Array of skills",
        "operationId": "getSkillsData",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "successful operation"
          }
        }
      }
    }
  }
};
