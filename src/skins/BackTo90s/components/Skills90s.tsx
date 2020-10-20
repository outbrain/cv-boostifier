import React, {Component} from 'react';
import './Skills90s.scss';
import IconBg from '../images/edu-bg-icons.svg';

interface ISkillsProfile {
    skillsObj?: any[];
}

export class Skills90s extends Component<ISkillsProfile, any> {

    constructor(props: ISkillsProfile) {
        super(props);
        this.state = {
            skillsObj: this.props
        }
    }

    render() {
        return (

            <section>
                <h3>Skills</h3>
                <div className="skills">
                    {
                        (Object.values(this.state.skillsObj) || []).map((skill: any) => {
                            return (
                                <span key={skill.name}>{skill.name}</span>
                            )
                        })
                    }
                </div>
            </section>
        );
    }
}
