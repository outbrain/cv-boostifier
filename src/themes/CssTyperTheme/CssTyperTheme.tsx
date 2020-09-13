import React, {PropsWithChildren} from 'react';
import './CssTyperTheme.css';
import {IProfileProps, Resume} from '../../models';

export function CssTyperTheme(props: PropsWithChildren<IProfileProps>) {
  const {profile} = props;
  const url = profile.basics?.url || (profile.basics as any).website;
  setTimeout(() => run(profile), 2000);
  return (
    <div className='ct-container'>
      <style id="style-tag">
      </style>
      <pre id="style-text"></pre>
      <div className="ct-output">
        <header className="ct-header-container">
          <div className="ct-header">
            <div className="ct-header-name">{profile.basics?.name}</div>
            <div className="ct-header-label">{profile.basics?.label}</div>
          </div>
        </header>
        <div className="ct-body-container">
          <div className="ct-body">
            <section id="contact">
              <aside>Contact</aside>
              <div className="ct-section-body">
                {profile.basics?.email && <div className="ct-detail">
                  <div className="ct-detail-title">Email</div>
                  <div className="email"><a href={'mailto:' + profile.basics?.email}>{profile.basics?.email}</a></div>
                </div>}
                {profile.basics?.phone && <div className="ct-detail">
                  <div className="ct-detail-title">Phone</div>
                  <div className="phone">{profile.basics?.phone}</div>
                </div>}
                {url && <div className="ct-detail">
                  <div className="ct-detail-title">Website</div>
                  <div className="website"><a href={url}>{url}</a></div>
                </div>}
                {profile.basics?.location?.address && <div className="ct-detail">
                  <div className="ct-detail-title">Location</div>
                  <div>{profile.basics?.location?.address}</div>
                </div>}
              </div>
            </section>
            {profile.basics?.summary && <section id="about">
              <aside>About</aside>
              <div className="ct-section-body about">
                <p>{profile.basics?.summary}</p>
              </div>
            </section>}
            <section id="work">
              <aside>Work</aside>
              <div className="ct-section-body">
                {profile.work?.map(w => <div className="ct-wrapper">
                                                    <div className="ct-title">
                                                      <span>{w.name || (w as any).company}</span>
                                                      <span className="date">{w.startDate} — {w.endDate || 'Current'}</span>
                                                    </div>
                                                    <div className="work-details">
                                                      <div className="position">{w.position}</div>
                                                      <div className="website"><a href={w.url || (w as any).website}>{w.url || (w as any).website}</a></div>
                                                    </div>
                                                    {w.summary && <div className="summary"><p>{w.summary}</p></div>}
                                                    {w.highlights && !!w.highlights.length && <div className="work-highlights">
                                                      <h4>Highlights</h4>
                                                      <ul className="highlights">
                                                        {w.highlights?.map(h => <li className="bullet">{h}</li>)}
                                                      </ul>
                                                    </div>}
                                                  </div>)
              }
              </div>
            </section>
            <section id="education">
              <aside>Education</aside>
              <div className="ct-section-body">
                {profile.education?.map(edu => <div className="ct-wrapper">
                  <div className="ct-title">
                    <span>{edu.institution}</span>
                    <span className="date">{edu.startDate} — {edu.endDate || 'Current'}</span>
                  </div>
                  <div className="education-details">
                    <div className="ct-area">{edu.area}</div>
                    <div className="ct-study-type">{edu.studyType}</div>
                  </div>
                  {edu.courses && !!edu.courses.length && <div className="work-highlights">
                    <h4>Courses</h4>
                    <ul className="highlights">
                      {edu.courses?.map(c => <li className="bullet">{c}</li>)}
                    </ul>
                  </div>}
                </div>)
                }
              </div>
            </section>

            <section id="skills">
              <aside>Skills</aside>
              <div className="ct-section-body-skills">
                {profile.skills?.map(s => <div className="work-highlights">
                  <div className="skill">{s.name}</div>
                </div>)
                }
              </div>
            </section>

            <section id="languages">
              <aside>Languages</aside>
              <div className="ct-section-body">
                {profile.languages?.map(l => <div className="ct-detail">
                  <div className="ct-detail-title">{l.language && getLanguage(l.language)}</div>
                  <div>{l.fluency}</div>
                </div>)}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}



function run(profile: Resume) {
  const styles = `


/*
*
* Hi! It's me, ${profile.basics?.name}
*
* I'm styling my CV right now, want to watch?
*
* First, let's make some room for my page
*/

pre { left: 70%; }


/*
 * Now let's add some data
 */

.ct-output {
    display: block;
    position: fixed;
    width: 70vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    color: #333;
    overflow: auto;
}

/*
 * OK, That's really ugly...
 * let's take care of the header
 */

.ct-header-container {
    background: #f4f6f6;
    padding: 50px 0;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
}

.ct-header {
    width: 274px;
}

.ct-header-name {
    font-size: 36px;
}

.ct-header-label {
    color: #95a5a6;
    font-size: 24px;
    white-space: nowrap;
}

/*
 * That's better. Now let's add some styles to the body
 */

.ct-body {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ct-body section {
    width: 500px;
    position: relative;
    margin-left: 225px;
    margin-bottom: 10px;
}

.ct-section-body {
    padding-top: 10px;
}

.ct-detail {
    padding-bottom: 10px;
}

.ct-detail-title {
    font-weight: bold;
}

.ct-body a {
    color: #2ecc71;
}

#contact .ct-section-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
section aside {
    position: absolute;
    top: 0px;
    left: -150px;
    color: #f1c40f;
    font-size: 26px;
    width: 120px;
    text-align: right;
}

.about {
    line-height: 1.8;
}

.ct-wrapper {
    margin-bottom: 30px;
}
.ct-title {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #f4f6f6;
    height: 20px;
    margin-top: 12px;
    margin-bottom: -2px;
    align-items: center;
}

.ct-title span:first-child {
    color: #000;
    font-weight: bold;
    font-size: 18px;
    margin-top: -22px;
}

.ct-title .date {
    font-size: 14px;
    margin-top: -22px;
}

/*
 * So far so good. Now the work section needs some touch...
 */

.work-details {
    display: flex;
    justify-content: space-between;
}

.work-details .position {
    font-weight: bold;
    margin-bottom: 8px;
}

.work-details .summary {
    line-height: 1.5;
}

.work-highlights h4 {
    font-size: 18px;
    margin-top: 12px;
    margin-bottom: 10px;
}

.highlights {
    margin-bottom: 10px;
    padding-inline-start: 40px;
}

.bullet {
    line-height: 1.8;
    list-style: none;
}

.bullet::before {
    content: "●";
    float: left;
    font-size: 15px;
    margin-top: -4px;
    margin-left: -19px;
    opacity: .1;
    position: absolute;
}

.ct-area {
    font-weight: bold;
}

/*
 *  skills are important, let's make them a bit prettier
 */
.ct-section-body-skills {
    display: flex;
    flex-flow: wrap;
}

.skill {
    font-size: 12px;
    margin-top: 8px;
    margin-right: 10px;
    padding: 3px 7px;
    border: 1px solid #eee;
    border-radius: 4px;
    background: #eff9f0;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

/*
 *  Much better now, isn't it?
 *
 *
 *  ***This was heavily inspired by the awesome work 
 *     of Jake Albaugh (https://codepen.io/jakealbaugh) 
 */



  `;

  let openComment = false

  const writeStyleChar = (which: string) => {
    let styleText: any = document.getElementById('style-text') || {};
    let styleTag: any = document.getElementById('style-tag') || {};
    let html: string;
    html = styleText.innerHTML;
    if (which === '/' && !openComment) {
      openComment = true;
      html += which;
    } else if (which === '/' && openComment) {
      openComment = false;
      html = html.replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
    } else if (which === ':') {
      html = html.replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
    } else if (which === ';') {
      html = html.replace(/([^:]*)$/, '<em class="value">$1</em>;');
    } else if (which === '{') {
      html = html.replace(/(.*)$/, '<em class="selector">$1</em>{');
    } else {
      html += which;
    }
    styleText.innerHTML = html;
    styleTag.innerHTML += which;

    return openComment;
  }

  const writeStyles = (message: string, index: number, interval: number) => {
    if (index < message.length) {
      const pre: any = document.getElementById( 'style-text');
      pre.scrollTop = pre.scrollHeight;
      writeStyleChar(message[index++]);
      setTimeout(() => writeStyles(message, index, interval), interval * (openComment ? 4 : 1));
    }
  }


  writeStyles(styles, 0, 15)
}

function getLanguage(lang: string): string {
  const langMap: {[key: string]: string} = {
    'en': 'English',
    'he': 'Hebrew'
  };
  return langMap[lang] || lang;
}
