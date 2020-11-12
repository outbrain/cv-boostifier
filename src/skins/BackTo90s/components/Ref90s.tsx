import React, {Component} from 'react';
import './Ref90s.scss';

interface IRegProfile {
    refObj?: any[];
}

export class Ref90s extends Component<IRegProfile, any> {
    constructor(props: IRegProfile) {
        super(props);
        this.state = {
            refObj: this.props
        }
    }
    render() {
        return (

            <section>
                <h3>References</h3>
                <div className="skills">
                    {
                        (Object.values(this.state.refObj)  || []).map((reference: any) => {
                            return (
                                <li key={reference.name}>
                                    <h4>{reference.name}</h4>
                                    <p>{reference.reference}</p>
                                </li>
                            );
                        })
                    }
                </div>
            </section>
        );
    }

}