import React, {Component} from 'react';
import './Work90s.scss';

interface IWorkProfile {
    workObj?: any[];
}

export class Work90s extends Component<IWorkProfile, any> {

    constructor(props: IWorkProfile) {
        super(props);
        this.state = {
            workObj: this.props
        }
    }
    render() {

        return (

            <div className="career-card">
                <h2>Career</h2>
                <div className="career-slider-holder">
                    <div className="building-image"></div>
                    <div className="card-slider-wrapper">
                        <div className="card-slider">

                            {
                                (Object.values(this.state.workObj) || []).map((workItem: any) => {
                                    return(
                                        <ul>
                                            <li className="company item-holder"> <span className="item-title">Work</span> <span>{workItem.company}</span></li>
                                            <li className="dates"><div className="dates-inner">{workItem.startDate} - {workItem.endDate}</div></li>
                                            <li className="position item-holder"> <span className="item-title">Position</span> {workItem.position}</li>
                                        </ul>
                                    )
                                })
                            }
                        </div>
                        <div className="card-slider-controls">
                            <div className="indexes">indexes</div>
                            <div className="buttons">
                                <div className="button left">left</div>
                                <div className="button right">right</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
