import React, {Component} from 'react';
import './Basic90s.scss';

interface IBasicProfile {
    basics?: any;
}

export class Basic90s extends Component<IBasicProfile, any> {
    constructor(props: IBasicProfile) {
        super(props);
        const {email, location, phone, website, profiles} = props.basics;
        this.state = {
            email,
            location: this.getLocation(location),
            phone,
            website,
            profiles
        }
    }

    private getLocation(location: any): string{
        let locationText: string = "";
        if(location){
            locationText += (location.city) ? location.city : "";
            locationText += (locationText && location.countryCode) ? ", " : "";
            locationText += (location.countryCode) ? location.countryCode : "";
        }
        return locationText;
    }

    render() {
        return (
            <section className="basic-section">
                <div className="card-box">
                    <div className="card-box-container">
                        <div className={"row-details"}>
                            <span className={`detail location ${(!this.state.location)? "empty" : ""}`}>{this.state.location}</span>
                            {this.state.email &&
                                <a rel={"noopener noreferrer"} target={"_blank"} href={`mailto:${this.state.email}`} className={"detail email"}>{this.state.email}</a>
                            }
                            {!this.state.email &&
                                <span className={"detail email empty"}></span>
                            }
                        </div>
                        <span className={"profile-image"}></span>
                        <div className={"row-details"}>
                            {this.state.website &&
                                <a rel={"noopener noreferrer"} target={"_blank"} href={this.state.website} className={"detail website"}>{this.state.website}</a>
                            }
                            {!this.state.website &&
                                <span className={"detail website empty"}></span>
                            }
                            {this.state.phone &&
                                <a rel={"noopener noreferrer"} target={"_blank"} href={`tel:${this.state.phone}`} className={"detail phone"}>{this.state.phone}</a>
                            }
                            {!this.state.phone &&
                                <span className={"detail phone empty"}></span>
                            }
                        </div>
                    </div>
                    <span className={"social-links"}>
                        {this.state.profiles.map((profile: any, key: number) => {
                            if(profile.network.toLowerCase() === "twitter"){
                                return <a key={key} href={`https://twitter.com/${profile.username}`} target={"_blank"} rel={"noopener noreferrer"} className={"social twitter"}> </a>
                            }
                            if(profile.network.toLowerCase() === "soundcloud"){
                                return <a key={key} href={profile.url} target={"_blank"} rel={"noopener noreferrer"} className={"social soundcloud"}> </a>
                            }
                            return null;
                        })}
                    </span>
                </div>
            </section>
        );
    }

}