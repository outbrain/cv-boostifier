import React, {Component} from 'react';
import './Work90s.scss';
import {Work} from "../../../models";

// interface IWorkProfile {
//     workObj?: any;
// }

// interface IWorkItem {
//     company?: string[];
//     position?: string;
//     website?: string;
//     startDate?: string;
//     endDate?: string;
//     summary?: string;
//     highlights?: string;
// }


export class Work90s extends Component<Work> {

    constructor(props: any) {
        super(props);
        console.log(props);
        // const workObj:Work = this.props;
    }
    render() {
        // const {workObj} = this.props
        const workObj:Work = this.props;
        console.log(workObj);


        return (
            <div className="career-card">
                <h2>Career</h2>
                <div className="career-slider-holder">
                    <div className="building-image"></div>
                    <div className="card-slider">
                        {
                            // (workObj || []).map((workItem: any) => {
                            //     // console.log(workItem);
                            //     return(
                            //         <ul>
                            //             <li className="company"> <span>Work</span> {workItem.company}</li>
                            //             <li className="dates">{workItem.startDate} - {workItem.endDate}</li>
                            //             <li className="position"> <span>Position</span> {workItem.position}</li>
                            //         </ul>
                            //     )
                            // })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
