import React, {PropsWithChildren, useState} from 'react';
import './Crypt.scss';
import {IProfileProps} from '../../models';
import crypto from 'crypto';
import ReactTooltip from 'react-tooltip';

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
      <ReactTooltip multiline={true} textColor='#33FF00'/>
      <main>
      Enter key: <input type='password' name='key' onChange={update}/>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" width="22" data-tip="This CV has been protected with a secret key.<br/>Please enter the numeric key provided to decrypt it."><defs><clipPath><path d="m22.2 686.12h1447.73v-667.19h-1447.73v667.19"/></clipPath><clipPath><path fill="#f2f2f2" d="m7 1023.36h1v1h-1z"/></clipPath><clipPath><path d="m0 706.47h1490.93v-706.47h-1490.93v706.47"/></clipPath><clipPath><path fill="#aade87" fillOpacity=".472" d="m-6 1028.36h32v32h-32z"/></clipPath><clipPath><path fill="#00f" fillOpacity=".514" d="m-7 1024.36h34v34h-34z"/></clipPath><clipPath><path fill="#f2f2f2" d="m7 1023.36h1v1h-1z"/></clipPath></defs><path d="M11 3A8 8 0 0 0 3 11 8 8 0 0 0 11 19 8 8 0 0 0 19 11 8 8 0 0 0 11 3M10.994 6.5C11.758 6.5 12.379 6.719 12.857 7.158 13.336 7.589 13.576 8.142 13.576 8.816 13.576 9.109 13.495 9.406 13.336 9.707 13.176 10.01 13.03 10.223 12.908 10.354 12.791 10.475 12.623 10.635 12.404 10.83L12.342 10.891C11.83 11.338 11.572 11.785 11.572 12.232V12.719H10.389V12.146C10.389 11.781 10.469 11.467 10.629 11.207 10.788 10.939 11.07 10.625 11.473 10.268 11.699 10.06 11.859 9.914 11.951 9.816 12.05 9.711 12.148 9.569 12.24 9.391 12.341 9.204 12.393 9.01 12.393 8.816 12.393 8.442 12.266 8.142 12.01 7.914 11.77 7.686 11.431 7.572 10.994 7.572 10.272 7.572 9.776 7.964 9.508 8.744L8.424 8.305C8.6 7.841 8.904 7.426 9.332 7.06 9.769 6.687 10.322 6.5 10.994 6.5M10.98 13.842C11.224 13.842 11.426 13.923 11.586 14.09 11.754 14.249 11.838 14.442 11.838 14.67 11.838 14.898 11.754 15.09 11.586 15.256 11.426 15.418 11.224 15.5 10.98 15.5 10.737 15.5 10.531 15.418 10.363 15.256 10.204 15.09 10.125 14.898 10.125 14.67 10.125 14.442 10.204 14.249 10.363 14.09 10.531 13.923 10.737 13.842 10.98 13.842" transform="translate(0-.002)" fill="#33FF00" fillRule="evenodd"/></svg>

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
