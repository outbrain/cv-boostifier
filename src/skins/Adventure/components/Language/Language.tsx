import React from "react";
import { Language } from "../../../../models";

export function LanguageComponent(props: {
  data: Language[];
  screenSize: number;
  scrollLeft: number;
  scrollTop: number;
}) {
  const languages = props.data;
  console.log(languages);

  return (
    <div>
      <div>
        <h1>Languages</h1>
      </div>

      <div className="slide">
        <div className="half-box ">
          {languages &&
            languages.length &&
            languages.map((language: Language, index: number) => (
              <div key={index} className="space-between dates">
                <div className="margin-right"> {language.language}</div>
                <div> {language.fluency}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
