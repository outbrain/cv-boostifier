<<<<<<< HEAD
import React , {useEffect, useRef} from 'react';

export function Figure(props: {scrollLeft: number, isFemale: boolean, isJumping: boolean}) {
    const FIGURE_CHANGE_RATE = 30;

    const prevScrollRef = useRef(0);
    useEffect(() => {prevScrollRef.current = props.scrollLeft;})

    const getImageByScroll = (scrollPosition : number, isFemale: boolean, isJumping: boolean) : string => `${getCharacterJumping(isJumping)}image-${getCharacterGender(isFemale)}-${Math.round(scrollPosition / FIGURE_CHANGE_RATE) % getFigureImageCount(isFemale)}`;
    const getCharacterGender = (isFemale: boolean) : string => isFemale ? "girl" : "boy";
    const getFigureImageCount = (isFemale: boolean) : number => isFemale ? 20 : 15;
    const getCharacterJumping = (isJumping: boolean) : string => isJumping ? "jump-" : "";
    const getFigureDirection = (scrollPrevPosition: number, scrollCurrentPosition: number) : string  => scrollPrevPosition / FIGURE_CHANGE_RATE <= scrollCurrentPosition / FIGURE_CHANGE_RATE ? "forward" : "backward";
        
    return <div id="Figure" className={`${getFigureDirection(prevScrollRef.current, props.scrollLeft)} ${getCharacterGender(props.isFemale)} ${getImageByScroll(props.scrollLeft, props.isFemale, props.isJumping)}`}></div>
=======
import React, { useEffect, useRef } from "react";

export function Figure(props: {
  scrollLeft: number;
  isFemale: boolean;
  isJumping: boolean;
}) {
  const FIGURE_CHANGE_RATE = 30;

  const prevScrollRef = useRef(0);
  useEffect(() => {
    prevScrollRef.current = props.scrollLeft;
  });

  const getImageByScroll = (
    scrollPosition: number,
    isFemale: boolean,
    isJumping: boolean
  ): string =>
    `${getCharacterJumping(isJumping)}image-${getCharacterGender(isFemale)}-${
      Math.round(scrollPosition / FIGURE_CHANGE_RATE) %
      getFigureImageCount(isFemale)
    }`;

  const getCharacterGender = (isFemale: boolean): string =>
    isFemale ? "girl" : "boy";
  const getFigureImageCount = (isFemale: boolean): number =>
    isFemale ? 20 : 15;
  const getCharacterJumping = (isJumping: boolean): string =>
    isJumping ? "jump-" : "";
  const getFigureDirection = (
    scrollPrevPosition: number,
    scrollCurrentPosition: number
  ): string =>
    scrollPrevPosition / FIGURE_CHANGE_RATE <=
    scrollCurrentPosition / FIGURE_CHANGE_RATE
      ? "forward"
      : "backward";

  return (
    <div
      id="Figure"
      className={`${getFigureDirection(
        prevScrollRef.current,
        props.scrollLeft
      )} ${getCharacterGender(props.isFemale)} ${getImageByScroll(
        props.scrollLeft,
        props.isFemale,
        props.isJumping
      )}`}
    ></div>
  );
>>>>>>> 6ea365a6de000306689ca5361edab37613b1e818
}
