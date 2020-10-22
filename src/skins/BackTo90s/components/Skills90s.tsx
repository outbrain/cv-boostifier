import React, {Component} from 'react';
import './Skills90s.scss';
import arrows from '../images/skills-arrows.svg';
import SkillsCardArrowLeft from "../images/skills-slider-arrow-left.png";
import SkillsCardArrowRight from "../images/skills-slider-arrow-right.png";

interface ISkillsProfile {
    skillsObj?: any[];
}

export class Skills90s extends Component<ISkillsProfile, any> {

    constructor(props: ISkillsProfile) {
        super(props);
        this.state = {
            skillsObj: this.props,
            slideNumber: 0
        }
    }
    nextItem(): any{
        var current = this.state.slideNumber;
        var next = current + 1;
        if (next > this.state.skillsObj.length - 1) {
            next = 0;
        }
        //this.state.slideNumber = next;
        console.log('next', next)
        this.goToSlide(next);
    }

    prevItem(): any{
        var current = this.state.slideNumber;
        var prev = current - 1;
        if (prev < 0) {
            prev = this.state.skillsObj.length - 1;
        }
        //this.state.slideNumber = prev;
        console.log('prev', prev)

        this.goToSlide(prev);
    }


    goToSlide(index: number){
        this.setState({slideNumber: index});
    }
    render() {
        return (


            <section className="skills-section">
                <h2>Check Out My <span>Skills</span></h2>
                <img src={arrows} className={"skills-arrows"}/>

                <div className="skills-slider-wrapper">
                    <div className="skills-slider-inner">
                        <div className="skills-slider-display">
                            <div className="skills-slider">

                                {
                                    (Object.values(this.state.skillsObj) || []).map((skillsItem: any, index: number) => {
                                        return(
                                            <span key={index} className={`${this.state.slideNumber == index ? 'selected': ''}`}>{skillsItem.name}</span>
                                        )
                                    })
                                }
                            </div>
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
