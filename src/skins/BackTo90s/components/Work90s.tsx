import React, {Component} from 'react';
import './Work90s.scss';

interface IWorkProfile {
    company?: string[];
    position?: string;
    website?: string;
    startDate?: string;
    endDate?: string;
    summary?: string;
    highlights?: string;
}
export class Work90s extends Component<IWorkProfile> {
    render() {
        const {company, position, website, startDate, endDate, summary, highlights} = this.props


        return (
            <div>
                <h2>Careers</h2>
            </div>
        );
    }
}