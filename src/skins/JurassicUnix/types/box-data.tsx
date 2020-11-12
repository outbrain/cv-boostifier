import { Basics, Profile, Skill, Work, Education, Reference, Project, Publication, Language, Award, Interest, Volunteer } from "../../../models";

export interface BoxData{
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
    children: BoxData[],
}
