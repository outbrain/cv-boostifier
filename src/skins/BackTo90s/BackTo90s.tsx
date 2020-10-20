import React, {Component, PropsWithChildren} from 'react';
import './BackTo90s.scss';
import {IProfileProps, Work} from '../../models';
import CardSideBg from './images/card-side.svg';
import LocIcon from './images/loc-icon.svg';
import PhoneIcon from './images/phone-icon.svg';
import PlayIcon from './images/play-icon.svg';
import EmailIcon from './images/mail-icon.svg';
import ProfilePicture from './images/profile-picture.svg';
import CenterCircle from './images/about-center-circle.png';
import OuterCircle from './images/about-outer-circle.svg';
import {Work90s} from "./components/Work90s";


export class BackTo90s extends Component<any, IProfileProps> {
    constructor(props: any) {
        super(props);
    }
    readMore() {

        console.log('clicked read more', );

    }
    render() {
        const {basics, skills, work, education, references, projects, publications, languages} = this.props.profile;

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
                                                        <span className={profile.network}><a href={profile.url}><img src={`images/${profile.network}.png`} /></a></span>
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
                        <h4>{basics?.label}</h4>

                        <div className="about-circle">
                            <img src={OuterCircle} className='outer'/>
                            <img src={CenterCircle} className='center'/>
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

                    {
                        (skills || []).length > 0 &&
                        <section>
                            <h3>Skills</h3>
                            <div className="skills">
                                {
                                    (skills || []).map((skill: any) => {
                                        return (
                                            <span key={skill.name}>{skill.name}</span>
                                        )
                                    })
                                }
                            </div>
                        </section>
                    }
                <main>
                    {
                        basics?.summary &&
                        <section>
                            <h2>Profile</h2>
                            <p>
                                {basics?.summary}
                            </p>
                        </section>
                    }

                    {
                        //Put work experience component here
                        (work || []).length > 0 &&
                        <section>
                            <Work90s {...work} />
                        </section>
                    }

                    {
                        (projects || []).length > 0 &&
                        <section>
                            <h2>Projects</h2>
                            {
                                (projects || []).map((project: any) => {
                                    return (
                                        <article>
                                            <hgroup>
                                                <h4>{project.name}, {project.entity}</h4>
                                                <h6>{project.startDate} - {project.endDate}</h6>
                                            </hgroup>
                                            <p>{project.description}</p>
                                            <ul>
                                                {
                                                    (project.highlights || []).map((highlight: string) => {
                                                        return (
                                                            <li>{highlight}</li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </article>
                                    );
                                })
                            }
                        </section>
                    }
                    {
                        (education || []).length > 0 &&
                        <section>
                            <h2>Education</h2>
                            {
                                (education || []).map((educationItem: any, ix: number) => {
                                    return (
                                        <article key={ix}>
                                            <hgroup>
                                                <h4>{educationItem.studyType}, {educationItem.area}, {educationItem.institution}</h4>
                                                <h6>{educationItem.startDate} - {educationItem.endDate}</h6>
                                            </hgroup>
                                            <ul>
                                                {
                                                    (educationItem.courses || []).map((course: string) => {
                                                        return (
                                                            <li key={course}>{course}</li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </article>
                                    );
                                })
                            }
                        </section>
                    }
                    {
                        (languages || []).length > 0 &&
                        <section>
                            <h2>Languages</h2>
                            <ul>
                                {
                                    (languages || []).map((language: any) => {
                                        return (
                                            <li key={language.language}>
                                                {language.language} - {language.fluency}
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </section>
                    }
                    {
                        (references || []).length > 0 &&
                        <section>
                            <h2>References</h2>
                            <ul>
                                {
                                    (references || []).map((reference: any) => {
                                        return (
                                            <li key={reference.name}>
                                                <h4>{reference.name}</h4>
                                                <p>{reference.reference}</p>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </section>
                    }
                    {
                        (publications || []).length > 0 &&
                        <section>
                            <h2>Publications</h2>
                            <ul>
                                {
                                    (publications || []).map((publication: any, ix: number) => {
                                        return (
                                            <li key={ix}>
                                                <h4>{publication.name}, {publication.publisher}</h4>
                                                <p>{publication.summary}</p>
                                                <p><a href={publication.website}>{publication.website}</a></p>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </section>
                    }

                </main>
            </div>

        );
    }
}

