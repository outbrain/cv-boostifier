import React, {PropsWithChildren} from 'react';
import './BackTo90s.scss';
import {IProfileProps} from '../../models';
import CardSideBg from './images/card-side.svg';
import ProfilePicture from './images/profile-picture.svg';

export function BackTo90s(props: PropsWithChildren<IProfileProps>) {
    const {basics, skills, work, education, references, projects, publications, languages} = props.profile;

    return (
        <div className="BackTo90s-skin">
            <aside>
                <header>
                    {/*<menu>*/}
                    {/*    Placeholder for menu*/}
                    {/*</menu>*/}
                    <div className="top-card">
                        <div className="social-icons">
                            <span className="twitter"></span>
                            <span className="linkedin"></span>
                        </div>
                        <div className="card-container">
                            <div className="card-container-left">
                                <img src={CardSideBg} alt="icon" />
                            </div>
                            <div className="card-container-grid">
                                <div className="card-box address">
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
                                        (basics?.profiles || []).map((profile, ix) => {
                                            return (
                                                <p key={ix}>
                                                    <span><a href={profile.url}>{profile.username || profile.url}</a></span>
                                                </p>
                                            );
                                        })
                                    }
                                </div>


                                <div className="card-box phone">
                                    <p>{basics?.phone}</p>
                                </div>
                            </div>

                            <div className="card-container-right">
                                <img src={CardSideBg} alt="icon" />
                            </div>
                        </div>
                    </div>

                    <h1>{basics?.name}</h1>
                    <h4>{basics?.label}</h4>
                </header>





                {
                    (skills || []).length > 0 &&
                    <section>
                        <h3>Skills</h3>
                        <div className="skills">
                            {
                                (skills || []).map((skill) => {
                                    return (
                                        <span key={skill.name}>{skill.name}</span>
                                    )
                                })
                            }
                        </div>
                    </section>
                }
            </aside>
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
                    (work || []).length > 0 &&
                    <section>
                        <h2>Experience</h2>
                        {
                            (work || []).map((workItem, ix) => {
                                return (
                                    <article key={ix}>
                                        <hgroup>
                                            <h4>{workItem.position}{workItem.position && workItem.name ? ', ' : ''}{workItem.name}</h4>
                                            <h6>{workItem.startDate} - {workItem.endDate}</h6>
                                        </hgroup>
                                        <p>{workItem.summary}</p>
                                        <ul>
                                            {
                                                (workItem.highlights || []).map((highlight) => {
                                                    return (
                                                        <li key={highlight}>{highlight}</li>
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
                    (projects || []).length > 0 &&
                    <section>
                        <h2>Projects</h2>
                        {
                            (projects || []).map((project) => {
                                return (
                                    <article>
                                        <hgroup>
                                            <h4>{project.name}, {project.entity}</h4>
                                            <h6>{project.startDate} - {project.endDate}</h6>
                                        </hgroup>
                                        <p>{project.description}</p>
                                        <ul>
                                            {
                                                (project.highlights || []).map((highlight) => {
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
                            (education || []).map((educationItem, ix) => {
                                return (
                                    <article key={ix}>
                                        <hgroup>
                                            <h4>{educationItem.studyType}, {educationItem.area}, {educationItem.institution}</h4>
                                            <h6>{educationItem.startDate} - {educationItem.endDate}</h6>
                                        </hgroup>
                                        <ul>
                                            {
                                                (educationItem.courses || []).map((course) => {
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
                                (languages || []).map((language) => {
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
                                (references || []).map((reference) => {
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
                                (publications || []).map((publication, ix) => {
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
