import React, {Component} from 'react';
import './Lang90s.scss';

interface ILangProfile {
    langObj?: any[];
}

export class Lang90s extends Component<ILangProfile, any> {
    constructor(props: ILangProfile) {
        super(props);
        this.state = {
            langObj: this.props
        }
    }
    render() {
        return (

            <section>
                <h3>Languages</h3>
                <div className="skills">
                    {
                        (Object.values(this.state.langObj) || []).map((language: any) => {
                            return (
                                <li key={language.language}>
                                    {language.language} - {language.fluency}
                                </li>
                            );
                        })
                    }
                </div>
            </section>
        );
    }

}