import React, {PropsWithChildren, useState} from 'react';
import './Comix.scss';
import {IProfileProps} from '../../models';
import {Image, Transformation} from 'cloudinary-react';

export function Comix(props: PropsWithChildren<IProfileProps>) {
  const {basics, skills, work, education, references, projects, publications, languages} = props.profile;

  const [isFemale, setIsFemale] = useState(true);

  return (
    <div className="comics-skin">
      <div className="select-gender">
        <button type="button" onClick={() => setIsFemale(true)}>Female</button>
        <button type="button" onClick={() => setIsFemale(false)} className="male">Male</button>
      </div>
      <div className="basics-info">
        <img src={require(`./images/pow.png`)} className="pow" alt="pow"/>
        <div className="profile-image">
          {<img src={require(`./images/${isFemale? 'comix-woman.png' : 'comix-man.jpg'}`)} className="profile-pic" alt={basics?.name}/>}
          <div className="speech-bubble">
            <img src={require(`./images/speech-bubble-cloud-rotate.png`)} className="speech-bubble-cloud" alt="pow"/>
            <span>Hello world... ;)</span>
          </div>
        </div>
        <aside className="basics-content">
          <header>
            <h1 className="name">{basics?.name}</h1>
            <h4>{basics?.label}</h4>
          </header>
          <main>
            <div className="personal">
              <section className="details">
                <h3>Details</h3>
                <p>
                  {
                    basics?.location?.address &&
                    `${basics?.location?.address}, `
                  }
                  {
                    basics?.location?.city &&
                    `${basics?.location?.city}, `
                  }
                  {
                    basics?.location?.countryCode &&
                    basics?.location?.countryCode
                  }
                </p>
                <p>{basics?.phone}</p>
                <p><a href={`mailto:${basics?.email}`}>{basics?.email}</a></p>
              </section>
              <section className="links">
                <h3>Links</h3>
                <div className="links">
                  {
                    basics?.url &&
                    <p>
                      <label>Website:</label>
                      <span>{basics?.url}</span>
                    </p>
                  }
                  {
                    (basics?.profiles || []).map((profile, ix) => {
                      return (
                        <p key={ix}>
                          <label>{profile.network}:</label>
                          <span><a href={profile.url}>{profile.username || profile.url}</a></span>
                        </p>
                      );
                    })
                  }
                </div>
              </section>
            </div>

            <div className="skills-list">

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
            </div>
          </main>
        </aside>
      </div>

      <main className="main-info">
        {
          basics?.summary &&
          <section className="summary">
            <h2>Profile</h2>
            <p>
              {basics?.summary}
            </p>
          </section>
        }

        {
          (work || []).length > 0 &&
          <section className="experience">
            <img src={require(`./images/wow.png`)} className="wow" alt="wow"/>
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
        <section className="section-img bg-black experience-image">
          {<img src={require(`./images/${isFemale? 'experience-female.png' : 'experience-male.png'}`)} className="profile-pic" alt=""/>}
          <div className="speech-bubble-2">
            <img src={require(`./images/speech-bubble-2.png`)} className="" alt="pow"/>
            <div className="nerdy-joke">
              <div className="question">
                Q: What is a programmer's favourite hangout place?
              </div>
              <div className="answer">
                A: Foo Bar
              </div>
            </div>
          </div>
        </section>
        {
          (projects || []).length > 0 &&
          <section className="bg-purple">
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
        <div className="education-img-wrapper">
          <section className="section-img education-img">
            {<img src={require(`./images/${isFemale? 'education-female.png' : 'education-male.png'}`)} className="profile-pic" alt=""/>}
          </section>
          <div className="speech-bubble-square">
            <img src={require(`./images/speech-bubble-square.png`)} className="speech-bubble-square" alt=""/>
            <div className="bubble-text">
              <span>{`if (youLookingForAwesome) { `}</span>
              <span className="hire">{`this.hireMe(); `}</span>
              <span>{`}`}</span>
            </div>
          </div>
        </div>

        {
          (education || []).length > 0 &&
          <section className="bg-yellow education">
            <img src={require(`./images/boom.png`)} className="boom" alt=""/>
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
          <section className="bg-light-blue languages">
            <img src={require(`./images/bubble-bg.jpg`)} className="bubble-bg" alt="pow"/>
            <div className="text-wrapper">
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
            </div>
          </section>
        }
        {
          (references || []).length > 0 &&
          <section className="bg-purple">
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
          <section className="bg-pink">
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
        <section className="bg-light-blue cartoon-image" >
          <img src={require(`./images/bazinga-2.png`)} className="bazinga-2" alt="pow"/>
          <img src={require(`./images/bazinga.png`)} className="bazinga" alt="pow"/>
          <img src={require(`./images/baloon-bg.jpg`)} className="baloon-bg" alt="pow"/>
          <div className="profile-image-container">

            <Image className="profile-image-cartoon" cloudName="dgfwxhzgo"  publicId={basics?.picture} type="fetch">
              <Transformation effect="cartoonify" />
              {/*<Transformation effect="colorize:50" color="blue"/>*/}
            </Image>
            <Image className="profile-image-regular" cloudName="dgfwxhzgo"  publicId={basics?.picture} type="fetch">
            </Image>
          </div>



        </section>
      </main>

    </div>
  );

}
