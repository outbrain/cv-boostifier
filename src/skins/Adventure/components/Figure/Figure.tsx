import React , {useEffect, useRef} from 'react';

export function Figure(props: {scrollLeft: number}) {
    const FIGURE_IMAGES_COUNT = 18;
    const FIGURE_CHANGE_RATE = 50;

    const prevScrollRef = useRef(0);
    useEffect(() => {prevScrollRef.current = props.scrollLeft;})

    const getImageByScroll = (scrollPosition : number) => Math.round(scrollPosition / FIGURE_CHANGE_RATE) % FIGURE_IMAGES_COUNT

    return <div className={`figure ${prevScrollRef.current / FIGURE_CHANGE_RATE <= props.scrollLeft / FIGURE_CHANGE_RATE ? "" : "backward"} image-${getImageByScroll(props.scrollLeft)}`}></div>
}
