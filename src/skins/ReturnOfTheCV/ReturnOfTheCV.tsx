import React, { PropsWithChildren } from "react";
import "./ReturnOfTheCV.scss";
import { IProfileProps } from "../../models";

export function ReturnOfTheCV(props: PropsWithChildren<IProfileProps>) {
  // const {
  //   basics,
  //   skills,
  //   work,
  //   education,
  //   references,
  //   projects,
  //   publications,
  //   languages,
  // } = props.profile;
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
    <>
      <canvas
        ref={canvasRef}
        className="stretch"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <div id="crawl-container" className="stretch">
        <div id="crawl">
          <div id="crawl-content">
            <h1>Episode IV</h1>
            <h2>A NEW HOPE</h2>
            <p>
              It is a period of civil war. Rebel spaceships, striking from a
              hidden base, have won their first victory against the evil
              Galactic Empire.
            </p>
            <p>
              During the battle, rebel spies managed to steal secret plans to
              the Empire’s ultimate weapon, the DEATH STAR, an armored space
              station with enough power to destroy an entire planet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
