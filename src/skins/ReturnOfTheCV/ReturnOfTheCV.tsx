import React, { PropsWithChildren } from "react";
import "./ReturnOfTheCV.scss";
import { IProfileProps } from "../../models";

export function ReturnOfTheCV(props: PropsWithChildren<IProfileProps>) {
  const {
    basics,
    skills,
    work,
    education,
    references,
    projects,
    publications,
    languages,
  } = props.profile;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");

      const crawl = document.getElementById("crawl");
      const crawlContent = document.getElementById("crawl-content");

      if (canvasContext && crawl && crawlContent) {
        let width: number;
        let height: number;

        const setCanvasExtents = () => {
          width = document.body.clientWidth;
          height = document.body.clientHeight;
          canvas.width = width;
          canvas.height = height;
        };

        setCanvasExtents();

        const crawlContentStyle = crawlContent.style;
        // start crawl at bottom of 3d plane
        let crawlPosition = crawl.clientHeight;

        const moveCrawl = (distance: number) => {
          crawlPosition -= distance;
          crawlContentStyle.top = crawlPosition + "px";

          // if we've scrolled all content past the top edge
          // of the plane, reposition content at bottom of plane
          if (crawlPosition < -crawlContent.clientHeight) {
            crawlPosition = crawl.clientHeight;
          }
        };

        window.onresize = () => {
          setCanvasExtents();
        };

        const makeStars = (count: number) => {
          const out = [];
          for (let i = 0; i < count; i++) {
            const s = {
              x: Math.random() * 1600 - 800,
              y: Math.random() * 900 - 450,
              z: Math.random() * 1000,
            };
            out.push(s);
          }
          return out;
        };

        let stars = makeStars(10000);

        const clear = () => {
          canvasContext.fillStyle = "black";
          canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        };

        const putPixel = (x: number, y: number, brightness: number) => {
          const intensity = brightness * 255;
          const rgb = `rgb(${intensity},${intensity},${intensity})`;
          canvasContext.fillStyle = rgb;
          canvasContext.fillRect(x, y, 1, 1);
        };

        const moveStars = (distance: number) => {
          const count = stars.length;
          for (var i = 0; i < count; i++) {
            const star = stars[i];
            star.z -= distance;
            while (star.z <= 1) {
              star.z += 1000;
            }
          }
        };

        const paintStars = () => {
          const cx = canvas.width / 2;
          const cy = canvas.height / 2;

          const count = stars.length;
          for (var i = 0; i < count; i++) {
            const star = stars[i];

            const x = cx + star.x / (star.z * 0.001);
            const y = cy + star.y / (star.z * 0.001);

            if (x < 0 || x >= width || y < 0 || y >= height) {
              continue;
            }

            const d = star.z / 1000.0;
            const b = 1 - d * d;

            putPixel(x, y, b);
          }
        };

        let prevTime: number;
        const init = (time: number) => {
          prevTime = time;
          requestAnimationFrame(tick);
        };

        const tick = (time: number) => {
          let elapsed = time - prevTime;
          prevTime = time;

          moveStars(elapsed * 0.1);

          // time-scale of crawl, increase factor to go faster
          moveCrawl(elapsed * 0.06);

          clear();
          paintStars();

          requestAnimationFrame(tick);
        };

        requestAnimationFrame(init);
      }
    }
  });

  return (
    <div className="return-of-the-cv-skin">
      <canvas
        ref={canvasRef}
        className="stretch"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <div id="crawl-container" className="stretch">
        <div id="crawl">
          <div id="crawl-content">
            <h1>{basics?.name}</h1>
            <h2>{basics?.label}</h2>
            <p>{basics?.summary}</p>
            <section>
              <h3>Details</h3>
              <p>
                {basics?.location?.address && `${basics?.location?.address}, `}
                {basics?.location?.city && `${basics?.location?.city}, `}
                {basics?.location?.countryCode && basics?.location?.countryCode}
              </p>
              <p>{basics?.phone}</p>
              <p>{basics?.email}</p>
            </section>
            {(skills || []).length > 0 && (
              <section>
                <h3>Skills</h3>
                <p className="skills">
                  {(skills || []).map((skill) => {
                    return <span key={skill.name}>{skill.name}</span>;
                  })}
                </p>
              </section>
            )}
            {basics?.summary && (
              <section>
                <h2>Profile</h2>
                <p>{basics?.summary}</p>
              </section>
            )}
            {(work || []).length > 0 && (
              <section>
                <h2>Experience</h2>
                {(work || []).map((workItem, ix) => {
                  return (
                    <article key={ix}>
                      <hgroup>
                        <h4>
                          {workItem.position}
                          {workItem.position && workItem.name ? ", " : ""}
                          {workItem.name}
                        </h4>
                        <h6>
                          {workItem.startDate} - {workItem.endDate}
                        </h6>
                      </hgroup>
                      <p>{workItem.summary}</p>
                      <ul>
                        {(workItem.highlights || []).map((highlight) => {
                          return <li key={highlight}>{highlight}</li>;
                        })}
                      </ul>
                    </article>
                  );
                })}
              </section>
            )}
            {(projects || []).length > 0 && (
              <section>
                <h2>Projects</h2>
                {(projects || []).map((project) => {
                  return (
                    <article>
                      <hgroup>
                        <h4>
                          {project.name}, {project.entity}
                        </h4>
                        <h6>
                          {project.startDate} - {project.endDate}
                        </h6>
                      </hgroup>
                      <p>{project.description}</p>
                      <ul>
                        {(project.highlights || []).map((highlight) => {
                          return <li>{highlight}</li>;
                        })}
                      </ul>
                    </article>
                  );
                })}
              </section>
            )}
            {(education || []).length > 0 && (
              <section>
                <h2>Education</h2>
                {(education || []).map((educationItem, ix) => {
                  return (
                    <article key={ix}>
                      <hgroup>
                        <h4>
                          {educationItem.studyType}, {educationItem.area},{" "}
                          {educationItem.institution}
                        </h4>
                        <h6>
                          {educationItem.startDate} - {educationItem.endDate}
                        </h6>
                      </hgroup>
                      <ul>
                        {(educationItem.courses || []).map((course) => {
                          return <li key={course}>{course}</li>;
                        })}
                      </ul>
                    </article>
                  );
                })}
              </section>
            )}
            {(languages || []).length > 0 && (
              <section>
                <h2>Languages</h2>
                <ul>
                  {(languages || []).map((language) => {
                    return (
                      <li key={language.language}>
                        {language.language} - {language.fluency}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
            {(references || []).length > 0 && (
              <section>
                <h2>References</h2>
                <ul>
                  {(references || []).map((reference) => {
                    return (
                      <li key={reference.name}>
                        <h4>{reference.name}</h4>
                        <p>{reference.reference}</p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
            {(publications || []).length > 0 && (
              <section>
                <h2>Publications</h2>
                <ul>
                  {(publications || []).map((publication, ix) => {
                    return (
                      <li key={ix}>
                        <h4>
                          {publication.name}, {publication.publisher}
                        </h4>
                        <p>{publication.summary}</p>
                        <p>
                          <a href={publication.website}>
                            {publication.website}
                          </a>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
