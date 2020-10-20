import React, {Component} from 'react';
import './BackTo90s.scss';
import {IProfileProps} from '../../models';
import CenterCircle from './images/about-center-circle.png';
import OuterCircle from './images/about-outer-circle.svg';
import {Basic90s} from "./components/Basic90s";
import {Work90s} from "./components/Work90s";
import {Edu90s} from "./components/Edu90s";
import {Skills90s} from "./components/Skills90s";
import {Lang90s} from "./components/Lang90s";
import {Ref90s} from "./components/Ref90s";


export class BackTo90s extends Component<any, IProfileProps> {

    readMore() {

        console.log('clicked read more', );

    }
    render() {
        const {basics, skills, work, education, references, languages} = this.props.profile;
        const lastIndex = this.props.profile.basics.label.lastIndexOf("at");
        const labelTitle = this.props.profile.basics.label.substring(0, lastIndex);

        return (

            <div className="BackTo90s-skin">
                    <Basic90s basics={basics} />

                    <section className="main-section">
                        <span className="blue-triangle"></span>
                        <h1>{basics?.name}</h1>
                        <h4>{(labelTitle) ? labelTitle : basics?.label}</h4>

                        <div className="about-circle">
                            <img alt="" src={OuterCircle} className='outer'/>
                            <img alt="" src={CenterCircle} className='center'/>
                        </div>

                        <div className="main-description">
                            <span className="main-divider"></span>
                            {
                                basics?.summary &&
                                <div className={`extra-summary `}>
                                    {basics?.summary}
                                </div>
                            }
                            <div className="read-more" onClick={()=>this.readMore()}>
                                {
                                    basics?.summary && basics?.summary.length > 255 ? 'Read more' : 'Read less'
                                }
                            </div>


                        </div>
                        <div className="color-background"></div>
                    </section>


                <main>
                    {
                        //Put work experience component here
                        (work || []).length > 0 &&
                        <Work90s {...work} />
                    }
                    {
                        (education || []).length > 0 &&
                        <Edu90s {...education} />
                    }
                    {
                        (skills || []).length > 0 &&
                        <Skills90s {...skills} />
                    }
                    {
                        (languages || []).length > 0 &&
                        <Lang90s {...languages} />
                    }
                    {
                        (references || []).length > 0 &&
                        <Ref90s {...references} />
                    }
                </main>
            </div>

        );
    }
}


