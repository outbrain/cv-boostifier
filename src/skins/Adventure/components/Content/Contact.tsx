import React from 'react';
import {Basics} from "../../../../models";
import {utils} from "../../utils/Utils";
import "./Contact.scss"

export function ContentComponent(props: { data: Basics, screenSize: number, scrollLeft: number, scrollTop: number }) {
  const MOUNTS_MOVEMENT_RATIO = 0.1;
  const MOUNTS_STARTING_OFFSET = 0.9;

  return (

    <div className="lvl-contact night">
      <div>
      </div>
      <div className=" ground-night" >
        <div className="wooden-ground-night" style={{backgroundPositionX: utils.moveElement(props.screenSize * MOUNTS_MOVEMENT_RATIO, props.scrollLeft, 0.2)}}>
        <div className="wooden-ground-night-2"
               style={{backgroundPositionX: utils.moveElement(props.screenSize * MOUNTS_STARTING_OFFSET, props.scrollLeft, 0.2)}}></div>
        </div>
      </div>
      <div className="heading contact">
        <h1>Contact</h1>
      </div>
      <div className="heading contact-list">
        <div><img src={props.data.picture} height={100} width={100}  alt={props.data.name}/></div>
        <ul>
          <li className="skill-item">{props.data?.name}</li>
          <li className="skill-item">{props.data?.email}</li>
          <li className="skill-item">{props.data?.phone}</li>
          <li className="skill-item">{props.data?.picture}</li>
          <li className="skill-item">{props.data?.picture}</li>
          <li className="skill-item">{props.data?.url}</li>
        </ul>
        {props.data.profiles && props.data.profiles.length > 0 &&
          props.data.profiles.map((profile, index) => {
            return  <div className="link-item" key={index}><a href={profile.url}>{profile.network}</a></div>
          })
        }
      </div>
      <div className="cabin"/>
      <div className="rock"></div>
    </div>
  );
}
