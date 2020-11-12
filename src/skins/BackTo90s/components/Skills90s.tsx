import React, {Component} from 'react';
import './Skills90s.scss';
import arrows from '../images/skills-arrows.svg';
import SkillsCardArrowLeft from "../images/skills-slider-arrow-left.png";
import SkillsCardArrowRight from "../images/skills-slider-arrow-right.png";

interface ISkillsProfile {
    skillsObj?: any[];
    langObj?: any[];
}

export class Skills90s extends Component<ISkillsProfile, any> {

    constructor(props: ISkillsProfile) {
        super(props);
        this.state = {
            skillsObj: this.props.skillsObj,
            langObj: this.props.langObj,
            slideNumber: 0,
            width: 50
        }
    }
    nextItem(): any{
        const current = this.state.slideNumber;
        let next = current + 1;
        if (next > this.state.skillsObj.length - 1) {
            next = 0;
        }

        this.goToSlide(next);
    }

    prevItem(): any{
        const current = this.state.slideNumber;
        let prev = current - 1;
        if (prev < 0) {
            prev = this.state.skillsObj.length - 1;
        }
        this.goToSlide(prev);
    }

    goToSlide(index: number){
        this.setState({slideNumber: index, width: Math.random() * 180});
    }
    render() {
        // console.log('this.state.langObj', this.state.langObj);

        const styles: { [key: string]: React.CSSProperties } = {
            width: this.state.width
        };

        return (


            <section className="skills-section">
                <h2>Check Out My <span>Skills</span></h2>
                <img src={arrows} className={"skills-arrows"}/>
                <div className="lang-wrapper">
                    <h4>I Speak the Following Languages: <span></span></h4>
                    <div className="typewriter">
                    {
                        (Object.values(this.state.langObj) || []).map((langItem: any, index: number) => {

                            return(
                                <div className="typewriter-text" key={index}>{langItem.language}</div>
                            )
                        })
                    }
                    </div>
                </div>

                <div className="skills-slider-wrapper">
                    <div className="skills-slider-inner">
                        <div className="skills-slider-display">
                            <div className="skills-slider">

                                {
                                    (Object.values(this.state.skillsObj) || []).map((skillsItem: any, index: number) => {
                                        return(
                                            <div>
                                                <span key={index} className={`${this.state.slideNumber == index ? 'selected': ''}`}>{skillsItem.name}</span>
                                            </div>
                                        )
                                    })
                                }



                            </div>
                            <span className={'skill-bar'} style={styles}></span>
                        </div>
                    </div>
                    {Object.values(this.state.skillsObj).length > 1 &&
                    <div className="skills-control-buttons">
                        <div className="button left" onClick={this.prevItem.bind(this)}>
                            <img src={SkillsCardArrowLeft} alt=""/>
                        </div>
                        <div className="button right" onClick={this.nextItem.bind(this)}>
                            <img src={SkillsCardArrowRight} alt=""/>
                        </div>
                    </div>
                    }
                </div>


            </section>
        );
    }
}
