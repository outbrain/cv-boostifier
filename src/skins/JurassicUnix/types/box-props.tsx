import { Basics, Profile, Skill, Work, Education, Reference, Project, Publication, Language, Award, Interest, Volunteer } from "../../../models";
import {Coordinates} from "./coordinates";

export interface BoxProps{
    position: Coordinates,
    absolutePosition: Coordinates,
    width: number,
    height: number,
    hue: number,
    id: string,
    name: string,
    data?:
        Basics |
        Profile | 
        Skill | 
        Work | 
        Education | 
        Reference |
        Project |
        Publication |
        Language |
        Award |
        Interest |
        Volunteer |
        Work,
    onClick: (boxProps: BoxProps, e: MouseEvent)=>void
}
