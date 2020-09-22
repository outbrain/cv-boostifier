import * as React from 'react'
import {createContext, PropsWithChildren, useState} from 'react';
import {getURLParam} from '../utils';
import {SKINS} from '../skins/skins';
import {ISkin} from '../skins/models';

interface ISkinContext {
  skin: ISkin;
  skins: ISkin[];
  setSkin: (skin: ISkin) => void;
  getSkin: (name: string) => ISkin | undefined;
}

const SkinContext = createContext({} as ISkinContext);

function SkinProvider(props: PropsWithChildren<any>) {
  const skins = SKINS;
  const getSkin = (name: string) => skins.find(s => s.name === name);
  const initialSkin = getSkin(getURLParam('skin')) || skins[0];
  const [skin, setSkin] = useState(initialSkin);

  return (
    <SkinContext.Provider value={{
      skin,
      skins,
      setSkin,
      getSkin
    }}>
      {props.children}
    </SkinContext.Provider>
  )
}

export {
  SkinProvider,
  SkinContext
}
