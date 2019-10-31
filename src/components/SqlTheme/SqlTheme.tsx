import React, {PropsWithChildren, useEffect, useRef} from 'react';
import './SqlTheme.css';
import {IProfile} from '../../models';

declare const Terminal: any;
declare const alasql: any;
declare const AsciiTable: any;

export function SqlTheme(props: PropsWithChildren<any>) {
  const {profile} = props;

  const termWrapper = useRef( document.getElementById('term-wrapper') as HTMLDivElement);
  const profileDb = useRef(null as any);
  const initDB = (profile: IProfile) => {
    const db = new alasql.Database();
    db.exec('CREATE TABLE personal (firstName string, lastName string, email string, github string, phone string)');
    db.exec('CREATE TABLE experience (companyName string, fromDate string, toDate string, title string, description string)');
    db.exec('CREATE TABLE education (schoolName string, fromDate string, toDate string, field string, description string)');
    db.exec('CREATE TABLE skills (name string)');
    db.tables.personal.data = [profile.personal];
    db.tables.experience.data = profile.experience;
    db.tables.education.data = profile.education;
    db.tables.skills.data = profile.skills;
    console.log('db initialized!');
    return db;
  };
  const processCommand = async (command: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let res;
          const table = new AsciiTable();
          if (command.toLowerCase() === 'show tables') {
            Object.keys(profileDb.current.tables).forEach((key: any) => {
              table.addRow(key);
            });
            resolve(table.toString().split('\n').join('<br>'));
          } else if (command.toLowerCase() === 'help') {
            resolve(`<small>Typing "show tables" will print the list of tables.<br>Typing an SQL query will print the results<br>Example: "select * from education"</small>`);
          } else {
            res = profileDb.current.exec(command);
            const keys = Object.keys(res[0]) || ['N/A'];
            table.setHeading.apply(table, [...keys])
            res.forEach((row: any) => {
              table.addRow.apply(table, Object.values(row).map(val => val || 'NULL'));
            });

            console.log(table.toString());
            resolve(table.toString().split('\n').join('<br>'));
            // resolve(JSON.stringify(res));
          }
        } catch (e) {
          console.error(e);
          reject(e);
        }
      }, 300)
    });
  };

  const inputLoop = (term: any) => {
    term.input('', (command: any) => {
      processCommand(command.trim()).then(res => {
        term.print(res, true);
        inputLoop(term);
      }).catch(err => {
        console.log(err);
        term.print(`${command}: command not found or wrong sql syntax`);
        inputLoop(term);
      });
    });
  };

  useEffect(() => {
    const term = new Terminal();
    term.print(`Welcome to CV SQL terminal! <br><small>Type "help" to get help</small><br><br>`, true);
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


