import React from "react";
import { Language } from "../../../../models";
import { utils } from "../../utils/Utils";

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

      <div className="half-slide">
        <div className="half-box ">
          {languages &&
            languages.length > 0 &&
            languages.map((language: Language, index: number) => (
              <li key={index} className="space-between">
                <div className="dates margin-right"> {utils.mapLanguageCodeToName(language?.language)}</div>
                <div className="summary"> {language?.fluency}</div>
              </li>
            ))}
        </div>
      </div>
    </div>
  );
}
