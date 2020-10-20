import React, {Component} from 'react';
import './BackTo90s.scss';
import {IProfileProps} from '../../models';
import CardSideBg from './images/card-side.svg';
import LocIcon from './images/loc-icon.svg';
import PhoneIcon from './images/phone-icon.svg';
import EmailIcon from './images/mail-icon.svg';
import ProfilePicture from './images/profile-picture.svg';
import CenterCircle from './images/about-center-circle.png';
import OuterCircle from './images/about-outer-circle.svg';
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
                    <header>
                        {/*<menu>*/}
                        {/*    Placeholder for menu*/}
                        {/*</menu>*/}
                        <div className="top-card">

                            <div className="card-container">
                                <div className="card-container-left">
                                    <img src={CardSideBg} alt="icon" />
                                </div>
                                <div className="card-container-grid">
                                    <div className="card-box address">
                                        <img src={LocIcon} alt="address" />
                                        {
                                            basics?.location?.city &&
                                            `${basics?.location?.city}, `
                                        }
                                        {
                                            basics?.location?.countryCode &&
                                            basics?.location?.countryCode
                                        }
                                    </div>
                                    <div className="card-box picture">
                                        {
                                            <img src={ProfilePicture} alt="icon" />
                                        }
                                    </div>
                                    <div className="card-box email">
                                        <img src={EmailIcon} alt="email" />
                                        <p><a href={`mailto:${basics?.email}`}>{basics?.email}</a></p>
                                    </div>
                                    <div className="card-box website">

                                        {
                                            basics?.url &&
                                            <p>
                                                <span>{basics?.url}</span>
                                            </p>
                                        }
                                        {
                                            (basics?.profiles || []).map((profile: any, ix: number) => {
                                                return (
                                                    <p key={ix}>
                                                        <span className={profile.network}><a href={profile.url}><img alt="" src={`images/${profile.network}.png`} /></a></span>
                                                    </p>
                                                );
                                            })
                                        }
                                    </div>


                                    <div className="card-box phone">
                                        <img src={PhoneIcon} alt="phone" />

                                        <p>{basics?.phone}</p>
                                    </div>
                                </div>

                                <div className="card-container-right">
                                    <img src={CardSideBg} alt="icon" />
                                </div>
                            </div>
                        </div>


                    </header>
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


