import {
    Award,
    Basics,
    Education, Interest,
    Language,
    Profile,
    Project,
    Publication,
    Reference,
    Skill, Volunteer,
    Work
} from "../../../models";

export interface DataDisplayProps{
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
}