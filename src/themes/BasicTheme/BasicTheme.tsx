import React, {PropsWithChildren} from 'react';
import './BasicTheme.scss';
import {IProfileProps, Resume} from '../../models';

export function BasicTheme(props: PropsWithChildren<IProfileProps>) {
  const {basics} = props.profile;
  
  return (
    <div className="basic-theme">
      <aside>
        <header>
          {
            basics?.image &&
            <img src={basics?.image} alt={basics?.name} />
          }
          <h1>{basics?.name}</h1>
          <h4>{basics?.label}</h4>
        </header>
      </aside>
    </div>
  );
}

export const basicImage = require('./Basic.png');