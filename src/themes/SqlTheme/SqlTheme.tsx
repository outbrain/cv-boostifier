/// <reference path="./ascii-table.d.ts" />
import React, {PropsWithChildren, useEffect, useRef} from 'react';
import './SqlTheme.css';
import {createDb} from './SqlTheme.helper';
import alasql from 'alasql';
import AsciiTable from 'ascii-table';
import Terminal from './terminal';
import {IProfileProps} from '../../models';

export function SqlTheme(props: PropsWithChildren<IProfileProps>) {
  const CLEAR = 'clear';
  const {profile} = props;
  const termWrapper = useRef(document.getElementById('term-wrapper') as HTMLDivElement);
  const profileDb = useRef(null as any);
  const terminal = useRef(new Terminal('termId'));
  const processCommand = async (command: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let res;
          const table = new AsciiTable();
          if (!command.length) {
            resolve('<br>')
          } else {
            if (command.toLowerCase() === CLEAR) {
              resolve(CLEAR);
            } else if (command.toLowerCase() === 'show tables') {
              Object.keys(profileDb.current.tables).forEach((key: any) => {
                table.addRow(key);
              });
              resolve(table.toString().split('\n').join('<br>'));
            } else if (command.toLowerCase() === 'help') {
              resolve(`<small>Typing "show tables" will print the list of tables.<br>Typing an SQL query will print the results<br>Example: "select * from education"</small>`);
            } else {
              const hasBackslahG = command.indexOf('\\G')
              console.log(`hasBackslahG = ${hasBackslahG}`)
              if (hasBackslahG > 0) {
                command = command.substr(0, hasBackslahG)
              }
              res = profileDb.current.exec(command);
              const keys = Object.keys(res[0]) || ['N/A'];

              if (hasBackslahG > 0) {
                let i=0;
                const output = res.map((row:any)=> {
                  i++;
                  const h = `*************************** ${i}. row ***************************<br>`
                  return h+ keys.map((k)=>{
                    return `${' '.repeat(Math.max(27-k.length,0))}${k}: ${row[k] || 'NULL' }`
                  }).join('<br>')
                }).join('<br>')
                resolve(output);
              } else {
                table.setHeading.apply(table, [...keys])
                res.forEach((row: any) => {
                  table.addRow.apply(table, Object.values(row)
                    .map(val => val || 'NULL')
                    .map(val => typeof val === 'string' ? val.split('\n').join('') : val));
                });
//              console.log(table.toString());
                resolve(table.toString().split('\n').join('<br>'));
              }
              // console.log(JSON.stringify(res));
            }
          }
        } catch (e) {
          console.error(e);
          reject(e);
        }
      }, 200)
    });
  };

  useEffect(() => {
    const inputLoop = (term: any) => {
      term.input('', (command: any) => {
        processCommand(command.trim()).then(res => {
          if (res === CLEAR) {
            term.clear();
          } else {
            term.print(res, true);
          }
          inputLoop(term);
        }).catch(err => {
          console.log(err);
          term.print(`${command}: command not found or wrong sql syntax`);
          inputLoop(term);
        });
      });
    };

    profileDb.current = createDb(alasql,profile);
    const name = profile.basics && profile.basics.name;
    const term = terminal.current;
    const welcomeMessage = `Welcome to ${name} Resume SQL terminal! <br><small>Type "help" to get help</small><br><br>`;
    term.clear();
    (term as any).print(welcomeMessage, true);
    if (termWrapper.current && !termWrapper.current.children.length) {
      termWrapper.current.innerHTML = '';
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


