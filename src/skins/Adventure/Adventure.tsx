import React, {PropsWithChildren} from 'react';
import './Adventure.scss';
import {IProfileProps} from '../../models';

export function Adventure(props: PropsWithChildren<IProfileProps>) {
  const {basics, skills, work, education, references, projects, publications, languages} = props.profile;

  return (
    <div>
      <div className="figure"></div>
      <div className="adventure outer-wrapper">
        <div className="wrapper">
          <section className="lvl-basics slide one"></section>
          <section className="lvl-awards slide"></section>
          <section className="lvl-education slide"></section>
          <section className="lvl-interests slide"></section>
          {/*<section className="languages"></section>*/}
          {/*<section className="meta"></section>*/}
          {/*<section className="projects"></section>*/}
          {/*<section className="publications"></section>*/}
          {/*<section className="references"></section>*/}
          {/*<section className="skills"></section>*/}
          {/*<section className="volunteer"></section>*/}
          {/*<section className="work"></section>*/}
        </div>
      </div>
    </div>
  );
}
