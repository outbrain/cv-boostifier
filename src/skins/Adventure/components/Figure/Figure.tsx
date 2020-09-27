import React from 'react';

export function Figure(props: {scrollLeft: number}) {
    const FIGURE_IMAGES_COUNT = 18;
    const FIGURE_CHANGE_RATE = 50;
    const getImageByScroll = (scrollPosition : number) => Math.round(scrollPosition / FIGURE_CHANGE_RATE) % FIGURE_IMAGES_COUNT
    return <div className={`figure image-${getImageByScroll(props.scrollLeft)}`}></div>
}
