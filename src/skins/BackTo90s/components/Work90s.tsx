import React, {Component} from 'react';
import './Work90s.scss';

import CareerCardArrowRight from '../images/career-card-slider-arrow-right.png';
import CareerCardArrowLeft from '../images/career-card-slider-arrow-left.png';

interface IWorkProfile {
    workObj?: any[];
    slideNumber?: number;
}

export class Work90s extends Component<IWorkProfile, any> {

    constructor(props: IWorkProfile) {
        super(props);
        this.state = {
            workObj: this.props,
            slideNumber: 0
        }
    }

    nextItem(): any{
        const index: number = (this.state.slideNumber >= Object.values(this.state.workObj).length - 1) ? 0 : this.state.slideNumber + 1;
        this.goToSlide(index);
    }

    prevItem(): any{
        const index: number = (this.state.slideNumber <= 0) ? Object.values(this.state.workObj).length - 1 : this.state.slideNumber - 1;
        this.goToSlide(index);
    }


    goToSlide(index: number){
        this.setState({slideNumber: index});
    }




    render() {

        return (

            <div className="career-card">
                <h2>Career</h2>
                <div className="career-slider-holder">
                    <div className="building-image"></div>
                    <div className="card-slider-wrapper">
                        <div className="card-slider-inner">
                            <div className={`card-slider`}  style={{transform: `translate(-${this.state.slideNumber * 550}px, 0)`}}>

                                {
                                    (Object.values(this.state.workObj) || []).map((workItem: any, key: number) => {
                                        return(
                                            <ul key={key}>
                                                <li className="company item-holder"> <span className="item-title">Work</span> <span>{workItem.company}</span></li>
                                                <li className="dates"><div className="dates-inner">{workItem.startDate} - {workItem.endDate}</div></li>
                                                <li className="position item-holder"> <span className="item-title">Position</span> {workItem.position}</li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="card-slider-controls">
                            <div className="indexes">
                                {Object.values(this.state.workObj).length > 1 &&
                                    <ul>
                                        {
                                            (Object.values(this.state.workObj) || []).map((workItem: any, index: number) => {
                                                return(
                                                    <li onClick={this.goToSlide.bind(this, index)} key={index} className={`${this.state.slideNumber === index ? "activeIndex" : ""}`}></li>
                                                )
                                            })
                                        }
                                    </ul>
                                }
                            </div>
                            {Object.values(this.state.workObj).length > 1 &&
                                <div className="buttons">
                                    <div className="button left" onClick={this.prevItem.bind(this)}>
                                        <img src={CareerCardArrowLeft} alt=""/>
                                    </div>
                                    <div className="button right" onClick={this.nextItem.bind(this)} data-button-click="-1">
                                        <img src={CareerCardArrowRight} alt=""/>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

