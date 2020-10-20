import React, {Component} from 'react';
import './Edu90s.scss';
import {Work} from "../../../models";

interface IEduProfile {
    eduObj?: any[];
}

export class Edu90s extends Component<IEduProfile, any> {

    constructor(props: IEduProfile) {
        super(props);
        this.state = {
            eduObj: this.props
        }
    }
    isEven(x: number) {
        return x & 1;
    };
    render() {
        return (

                <section className="edu-section">
                    <div className="edu-top">
                        <img src="images/giphy.gif" className="animated-gif" />
                        <div className="marquee">
                            <div className="marquee-group">
                                <span>Education</span>
                                <span>Education</span>
                                <span>Education</span>
                                <span>Education</span>
                            </div>

                        </div>
                    </div>
                    {
                        (Object.values(this.state.eduObj) || []).map((educationItem: any, ix: number) => {
                            const startYear = educationItem.startDate.split('-');
                            const endYear = educationItem.startDate.split('-');

                            return (
                                <div>
                                    <article key={ix} className={`eduItem ${!this.isEven(ix) ? 'odd': ''}`}>
                                        <div className={`edu-date ${!this.isEven(ix) ? 'left': ''}`}>{`${startYear[0]} - ${endYear[0]}`}</div>
                                        {/*<hgroup>*/}
                                        {/*    <h4>{educationItem.studyType}, {educationItem.area}, {educationItem.institution}</h4>*/}
                                        {/*    <h6>{educationItem.startDate} - {educationItem.endDate}</h6>*/}
                                        {/*</hgroup>*/}
                                        <div className={`edu-details ${!this.isEven(ix) ? 'left': ''}`}>
                                            <h2>{educationItem.institution}</h2>
                                            <h4>{educationItem.studyType}</h4>
                                        </div>
                                        {/*<ul>*/}
                                        {/*    {*/}
                                        {/*        (educationItem.courses || []).map((course: string) => {*/}
                                        {/*            return (*/}
                                        {/*                <li key={course}>{course}</li>*/}
                                        {/*            );*/}
                                        {/*        })*/}
                                        {/*    }*/}
                                        {/*</ul>*/}
                                    </article>
                                    <div className="dots"></div>
                                </div>
                            );
                        })
                    }
                </section>
        );
    }
}
