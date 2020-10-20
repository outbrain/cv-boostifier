import React, {Component} from 'react';
import './Edu90s.scss';
import IconBg from '../images/edu-bg-icons.svg';

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
                    <img src={IconBg} alt="" className="icon-bg"/>
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

                            const courseItems = (educationItem.courses || []).map((course: string) => {
                                return (
                                    <li key={course}>{course}</li>
                                );
                            })


                            return (
                                <div className="edu-container">
                                    <article key={ix} className={`eduItem ${!this.isEven(ix) ? 'odd': ''}`}>
                                        <div className={`edu-date ${!this.isEven(ix) ? 'left': ''}`}>{`${startYear[0]} - ${endYear[0]}`}</div>
                                        {/*<hgroup>*/}
                                        {/*    <h4>{educationItem.studyType}, {educationItem.area}, {educationItem.institution}</h4>*/}
                                        {/*    <h6>{educationItem.startDate} - {educationItem.endDate}</h6>*/}
                                        {/*</hgroup>*/}
                                        <div className={`edu-details ${!this.isEven(ix) ? 'left': ''}`}>
                                            <h2>{educationItem.institution}</h2>
                                            <h4>{educationItem.studyType}</h4>
                                            {
                                                (educationItem.studyType) ? educationItem.studyType : courseItems
                                            }
                                        </div>

                                    </article>
                                    <div className="dots"></div>
                                </div>
                            );
                        })
                    }
                    <img src={IconBg} alt="" className="icon-bg reverse"/>

                </section>
        );
    }
}
