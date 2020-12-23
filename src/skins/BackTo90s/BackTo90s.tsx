import React, {Component} from 'react';
import './BackTo90s.scss';
import CenterCircle from './images/about-center-circle.png';
import OuterCircle from './images/about-outer-circle.svg';
import {Basic90s} from "./components/Basic90s";
import {Work90s} from "./components/Work90s";
import {Edu90s} from "./components/Edu90s";
import {Skills90s} from "./components/Skills90s";

export class BackTo90s extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            readLess: true,
            height: 0
        }


    }
    readMore(): any {

        this.setState(
        {
            readLess: !this.state.readLess,
            height: document.querySelector('.extra-summary')
        })

    }
    render() {
        const {basics, skills, work, education, languages} = this.props.profile;
        const lastIndex = this.props.profile.basics.label.lastIndexOf("at");
        const labelTitle = this.props.profile.basics.label.substring(0, lastIndex);

        let readMoreClass = this.state.readLess ? "" : "visible";

        let extraHeight = this.state.height;

        const styles: { [key: string]: React.CSSProperties } = {
            height: !(readMoreClass) ? '7.7vw' : extraHeight.clientHeight
        };

        return (

            <div className="BackTo90s-skin">
                    <Basic90s basics={basics} />

                    <section className="user-info">
                        <div className="about-circle">
                            <img alt="" src={OuterCircle} className='outer'/>
                            <img alt="" src={CenterCircle} className='center'/>
                        </div>
                        <span className="blue-triangle"></span>
                        <h1>{basics?.name}</h1>
                        <h4>{(labelTitle) ? labelTitle : basics?.label}</h4>
                    </section>


                <main className={"main-section"}>
                    <div className="main-description">
                        <span className="main-divider"></span>
                        {
                            basics?.summary &&
                            <div className={`extra-summary-wrapper  ${readMoreClass}`} style={styles}>
                                <div className={`extra-summary`}>
                                    {basics?.summary}
                                </div>
                            </div>
                        }
                        {
                            basics?.summary &&
                                <div className={`read-more`}  onClick={this.readMore.bind(this)}>
                                    { readMoreClass ? 'Read less' : 'Read more' }
                                </div>
                        }

                    </div>
                    {
                        //Put work experience component here
                        (work || []).length > 0 &&
                            <div className={"work-section"} >
                                <Work90s {...work} />
                            </div>
                    }
                    {
                        (education || []).length > 0 &&
                        <Edu90s {...education} />
                    }
                    {
                        (skills || []).length > 0 &&
                        <Skills90s skillsObj={skills} langObj={languages} />
                    }

                </main>
            </div>

        );
    }
}


