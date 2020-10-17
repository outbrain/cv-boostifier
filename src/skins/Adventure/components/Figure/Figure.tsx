import React , {useEffect, useRef} from 'react';

export function Figure(props: {scrollLeft: number}) {
    const FIGURE_IMAGES_COUNT = 18;
    const FIGURE_CHANGE_RATE = 50;

    const prevScrollRef = useRef(0);
    useEffect(() => {prevScrollRef.current = props.scrollLeft;})

    const getImageByScroll = (scrollPosition : number) : string => `image-${Math.round(scrollPosition / FIGURE_CHANGE_RATE) % FIGURE_IMAGES_COUNT}`
    const getFigureDirection = (scrollPrevPosition: number, scrollCurrentPosition: number) : string  => scrollPrevPosition / FIGURE_CHANGE_RATE <= scrollCurrentPosition / FIGURE_CHANGE_RATE ? "forward" : "backward"

    return <div className={`figure ${getFigureDirection(prevScrollRef.current, props.scrollLeft)} ${getImageByScroll(props.scrollLeft)}`}></div>

}
