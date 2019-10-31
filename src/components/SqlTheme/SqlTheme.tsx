import React, {PropsWithChildren, useEffect, useRef} from 'react';
import './SqlTheme.css';
import {IProfile} from '../../models';
declare const Terminal: any;
declare const alasql: any;

export function SqlTheme(props: PropsWithChildren<any>) {
  const {profile} = props;

  const termWrapper = useRef( document.getElementById('term-wrapper') as HTMLDivElement);
  const profileDb = useRef(null as any);
  const initDB = (profile: IProfile) => {
    const db = new alasql.Database();
    db.exec('CREATE TABLE personal (firstName string, lastName string, email string, github string, phone string)');
    db.exec('CREATE TABLE experience (companyName string, fromDate string, toDate string, title string, description string)');
    db.exec('CREATE TABLE education (schoolName string, fromDate string, toDate string, field string, description string)');
    db.exec('CREATE TABLE skills (skill string)');
    db.tables.personal.data = [profile.personal];
    db.tables.experience.data = profile.experience;
    db.tables.education.data = profile.education;
    db.tables.skills.data = profile.skills.map(skill => ({skill}));
    console.log('db initialized!')
    return db;
  };
  const processCommand = async (command: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let res;
          if (command.toLowerCase() === 'show tables') {
            res = Object.keys(profileDb.current.tables);
            resolve(res.join('<br>'));
          } else {
            res = profileDb.current.exec(command);
            resolve(JSON.stringify(res));
          }
        } catch {
          reject('error');
        }
      }, 300)
    });
  };

  const inputLoop = (term: any) => {
    term.input('', (command: any) => {
      processCommand(command.substring(1).trim()).then(res => {
        term.print(res, true);
        inputLoop(term);
      }).catch(err => {
        term.print(`${command}: command not found`);
        inputLoop(term);
      });
    });
  };

  useEffect(() => {
    const term = new Terminal();
    term.print(`Welcome to CV SQL terminal! You can use SQL syntax here. <br><small>*Print "show tables" to view tables</small><br><br>`, true);
    profileDb.current = initDB(profile);
    if (termWrapper.current) {
      termWrapper.current.appendChild(term.html);
      inputLoop(term);
    }
  },[profile]);

  return (
    <>
      <div id="term-wrapper" ref={termWrapper}></div>
    </>
  )
}


