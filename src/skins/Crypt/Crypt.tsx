import React, {PropsWithChildren, useState} from 'react';
import './Crypt.scss';
import {IProfileProps} from '../../models';
import crypto from 'crypto';

var key = 0

function crypt(text?: string) {
  let d1 = key ? key % 26 : 0
  let d2 = key ? key / 26 % 26 : 0
  return text?.split('').map((c, j) => {
    let d = j % 2 === 0 ? d1 : d2
    var i = c.charCodeAt(0)
    if (i >= 65 && i <= 90) i = (i - 65 + d) % 26 + 65
    else if (i >= 97 && i <= 122) i = (i - 97 + d) % 26 + 97
    return String.fromCharCode(i)
  }).join('')
}

export function Crypt(props: PropsWithChildren<IProfileProps>) {
  const {basics, skills, work, education, references, projects, publications, languages} = props.profile;

  const [value, setValue] = useState(0);
  let update = (event: React.FormEvent<HTMLInputElement>) => {
    const orig = event.currentTarget.value
    const update = orig.split('').filter(c => c >= '0' && c <= '9').join('')
    if (orig !== update)
      event.currentTarget.value = update
    const nv = parseInt(update)
    if (!isNaN(nv))
      setValue(value => nv)
  }

  key = ((crypto.createHash('sha256').update(basics?.name || "Anonymous").digest().readUInt16BE(0) - value) % 676 + 676 ) % 676

  return (
    <div className="crypt-skin">
      <main>
      Enter key: <input type='password' name='key' onChange={update}/>

      <section>
        <h1>{crypt(basics?.name)}</h1>
        <h4>{crypt(basics?.label)}</h4>
      </section>
      <section>
        <h3>Details</h3>
        <p>
          {
            basics?.location?.address &&
            `${crypt(basics?.location?.address)}, `
          }
          {
            basics?.location?.city &&
            `${crypt(basics?.location?.city)}, `
          }
          {
            basics?.location?.countryCode &&
            crypt(basics?.location?.countryCode)
          }
        </p>
        <p>{basics?.phone}</p>
        <p><a href={`mailto:${basics?.email}`}>{crypt(basics?.email)}</a></p>
      </section>
      <section>
        <h3>Links</h3>
        <div className="links">
          {
            basics?.url &&
            <p>
              <label>Website:</label>
              <span>{crypt(basics?.url)}</span>
            </p>
          }
          {
            (basics?.profiles || []).map((profile, ix) => {
              return (
                <p key={ix}>
                  <label>{profile.network}:</label>
                  <span><a href={profile.url}>{crypt(profile.username) || crypt(profile.url)}</a></span>
                </p>
              );
            })
          }
        </div>
      </section>
      {
        (skills || []).length > 0 &&
        <section>
          <h3>Skills</h3>
          <div className="skills">
            {
              (skills || []).map((skill) => {
                return (
                  <span key={skill.name}>{crypt(skill.name)}<br/></span>
                )
              })
            }
          </div>
        </section>
      }
        {
          basics?.summary &&
          <section>
            <h2>Profile</h2>
            <p>
              {crypt(basics?.summary)}
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
                      <h4>{crypt(workItem.position)}{crypt(workItem.position) && workItem.name ? ', ' : ''}{crypt(workItem.name)}</h4>
                      <h6>{workItem.startDate} - {workItem.endDate}</h6>
                    </hgroup>
                    <p>{crypt(workItem.summary)}</p>
                    <ul>
                      {
                        (workItem.highlights || []).map((highlight) => {
                          return (
                            <li key={highlight}>{crypt(highlight)}</li>
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
                      <h4>{crypt(project.name)}, {crypt(project.entity)}</h4>
                      <h6>{project.startDate} - {project.endDate}</h6>
                    </hgroup>
                    <p>{crypt(project.description)}</p>
                    <ul>
                      {
                        (project.highlights || []).map((highlight) => {
                          return (
                            <li>{crypt(highlight)}</li>
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
                      <h4>{crypt(educationItem.studyType)}, {crypt(educationItem.area)}, {crypt(educationItem.institution)}</h4>
                      <h6>{educationItem.startDate} - {educationItem.endDate}</h6>
                    </hgroup>
                    <ul>
                      {
                        (educationItem.courses || []).map((course) => {
                          return (
                            <li key={course}>{crypt(course)}</li>
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
                    {crypt(language.language)} - {crypt(language.fluency)}
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
                    <h4>{crypt(reference.name)}</h4>
                    <p>{crypt(reference.reference)}</p>
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
                    <h4>{crypt(publication.name)}, {crypt(publication.publisher)}</h4>
                    <p>{crypt(publication.summary)}</p>
                    <p><a href={publication.website}>{crypt(publication.website)}</a></p>
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
