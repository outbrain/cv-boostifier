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
                    <div className="card-slider">
                        {(Object.values(this.state.workObj) || []).map((workItem: any, key: number) =>
                            (
                                <ul key={key}>
                                    <li className="company"> <span>Work</span> {workItem.company}</li>
                                    <li className="dates">{workItem.startDate} - {workItem.endDate}</li>
                                    <li className="position"> <span>Position</span> {workItem.position}</li>
                                </ul>
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
