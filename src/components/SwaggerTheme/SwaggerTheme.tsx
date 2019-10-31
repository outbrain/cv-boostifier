import React, {PropsWithChildren, useEffect, useRef} from 'react';
import './SwaggerTheme.css';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export function SwaggerTheme(props: PropsWithChildren<any>) {
  const {profile} = props;
  const generateSpec = (profile: any) => {
    return {"tags":[{"name":"personal","description":"personal info about me"},{"name":"education","description":"List of institutes"},{"name":"experience","description":"Jobs and Projects"},{"name":"skills","description":"My skills"}],"swagger":"2.0","host":"https://cv.geekifier.io","basePath":"","info":{"description":"This is an API for my CV","version":"1.0.3","title":"CV API"},"paths":{"/personal":{"get":{"tags":["personal"],"summary":"My personal info","description":"Returns an object with my info","operationId":"getPersonalData","produces":["application/json"],"responses":{"200":{"description":"successful operation"}}}},"/education":{"get":{"tags":["education"],"summary":"My education info","description":"Returns an Array of institutes","operationId":"getEducationData","produces":["application/json"],"responses":{"200":{"description":"successful operation"}}}},"/experience":{"get":{"tags":["experience"],"summary":"My experience info","description":"Returns an Array of jobs","operationId":"getExperienceData","produces":["application/json"],"responses":{"200":{"description":"successful operation"}}}},"/skills":{"get":{"tags":["experience"],"summary":"My experience info","description":"Returns an Array of skills","operationId":"getSkillsData","produces":["application/json"],"responses":{"200":{"description":"successful operation"}}}}}};
  };

  const requestInterceptor = (req: any) => {
    const type = req.url.split('/').reverse()[0];
    req.url = `https://api.flickr.com/services/rest?format=json&t=${type}`;
    return req;
  };
  const responseInterceptor = (res: any) => {
    const type = res.url.split('=').reverse()[0];
    res.body = res.text = res.data = res.obj = JSON.stringify(profile[type], null, 2);
    return res;
  };

  return (
    <>
      <div id="swagger-wrapper">
        <SwaggerUI spec={generateSpec(profile)}
                   docExpansion="none"
                   requestInterceptor={requestInterceptor}
                   responseInterceptor={responseInterceptor}
        />
      </div>
    </>
  )
}


