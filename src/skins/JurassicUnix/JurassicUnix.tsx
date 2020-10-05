import React, {PropsWithChildren} from 'react';
import './JurassicUnix.scss';
import {IProfileProps} from '../../models';

export function JurassicUnix(props: PropsWithChildren<IProfileProps>) {
    const {basics, skills, work, education, references, projects, publications, languages} = props.profile;

    return (
        <div className="jurassic-unix">
            TODO!
        </div>
    );
}
