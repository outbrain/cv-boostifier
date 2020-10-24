import {SIZE_UNIT} from "./JurassicUnix.constants";
import {Coordinates} from './types/coordinates';
import {PerspectiveType} from "./types/perspective-type";
import {Perspective} from "./types/perspective";
import {BoxData} from "./types/box-data";

export function getPerspectiveFor(x: number, y: number, z: number, width: number, perspectiveType: PerspectiveType): Perspective {
    // x, y, z: coordinates of the lower left corner of the object closest to the observer (with maximum z)
    // width: the width of the object we're looking at (size in direction x)
    // output: offset to which we need to move the view in order to see the object

    // First we determine where the centre of the object's top side is (For the sake of simplicity we assume the object's width equals its length)
    const objectTopCentre: Coordinates = { x: -width*0.5 - x, y: -y, z: width*0.5 - z };
    let offset: Coordinates;

    if(perspectiveType===PerspectiveType.SIDE_VIEW){
        offset= { x: 0, y: width*0.4, z: -width*0.8 };
    } else{
        const windowAspectRatio: number = window.innerWidth/window.innerHeight;
        offset= { x: 0, y: width*Math.max(1, windowAspectRatio)*0.6, z: 0 };
    }

    return {viewPoint:addCoordinates(objectTopCentre, offset), perspectiveType};
}

export function get3DTranslation(offset: Coordinates): string {
    return (
        "translate3d(" +
        offset.x +
        SIZE_UNIT +
        ", " +
        offset.y +
        SIZE_UNIT +
        ", " +
        offset.z +
        SIZE_UNIT +
        ")"
    );
}

export function get3DRotation(direction: 'x'|'y'|'z', degrees: number): string {
    return (
        "rotate"+direction.toUpperCase()+"(" +
        degrees+
        "deg)"
    );
}

export function addCoordinates(position1?: Coordinates, position2?: Coordinates): Coordinates {
    const pos1 = position1 || { x: 0, y: 0, z: 0 };
    const pos2 = position2 || { x: 0, y: 0, z: 0 };

    return {
        x: pos1.x + pos2.x,
        y: pos1.y + pos2.y,
        z: pos1.z + pos2.z,
    };
}

export function isBrowserFirefox() {
    return false; // navigator.userAgent.includes("Firefox");
}

export function isPrimitive(value: any) {
    return value !== Object(value);
}

function isPrimitiveProperty(prop: any) {
    return !Array.isArray(prop) && isPrimitive(prop)
}

function isCompoundProperty(prop: any) {
    return !Array.isArray(prop) && !isPrimitive(prop)
}

function isCompoundArray(prop: any) {
    return Array.isArray(prop) && prop.length > 0 && !isPrimitive(prop[0])
}

export function capitalize(str: string) {
    const spaced: string = str.split('').reduce((newString, nextChar)=>newString+(isUpperCase(nextChar)?(' '+nextChar.toLowerCase()):nextChar), '');
    return `${spaced.charAt(0).toUpperCase()}${spaced.slice(1)}`;
}

function isUpperCase(char: string){
    return char === char.toUpperCase() && char !== char.toLowerCase();
}

export function mapBoxData(root: any): BoxData[] {
    let result: BoxData[] = [];
    const keys = Object.keys(root)
    keys.forEach((key) => {
        const node: BoxData|null = mapBoxDataChildren(root[key], key + '-' + keys.indexOf(key), capitalize(key))
        if (node) {
            result.push(node);
        }
    });
    return result;
}

function getItemName(item: any): string {
    // TODO: figure out a nicer way to get the box name

    // The box name is in one of these attributes, depending on what kind of data we have:
    /*Award=>awarder
        Education=>area or studyType
        Interest=>name
        Language=>language
        Project=>name
        Publication=>name
        Reference=>name
        Skill=>name
        Volunteer=>organization
        Work=>name
        Profile=>network*/

    const nameAttr: string|undefined = ['awarder', 'area', 'studyType', 'name', 'language', 'name', 'organization', 'network'].find(nameAttr=>item[nameAttr]!==undefined);

    return nameAttr?item[nameAttr]:'';
}

function mapBoxDataChildren(root: any, boxKey: string, boxName: string): BoxData | null {
    if (isPrimitive(root)) {
        return null;
    }

    if (Array.isArray(root)) {
        if (root.length === 0) {
            return null;
        }
        if (root.length === 1) {
            return mapBoxDataChildren(root[0], boxKey, boxName);
        }

        const node: BoxData = {
            id: boxKey,
            name: boxName,
            children: [],
        };
        root.forEach(item => {
            const childBoxKey = boxKey + '-' + root.indexOf(item);
            const itemName = getItemName(item)
            const childNode = mapBoxDataChildren(item, childBoxKey, itemName);
            if (childNode) {
                node.children.push(childNode);
            }
        });

        return node;
    }

    const keys = Object.keys(root);
    const hasProperties = keys.some(key => isPrimitiveProperty(root[key]));
    const childrenKeys = keys.filter(key => (isCompoundProperty(root[key]) || isCompoundArray(root[key])));

    if (hasProperties && childrenKeys.length === 0) {
        return {
            id: boxKey,
            name: boxName,
            data: root,
            children: [],
        };
    }

    if (!hasProperties && childrenKeys.length === 1) {
        const childBoxKey = boxKey + '-' + childrenKeys[0];
        const onlyChild = root[childrenKeys[0]];
        return mapBoxDataChildren(onlyChild, childBoxKey + '-' + 0, getItemName(onlyChild));
    }

    const node: BoxData = {
        id: boxKey,
        name: boxName,
        children: [],
    };

    if (hasProperties) {
        const propsBoxKey = boxKey + '-' + 0;
        const dataWithoutChildren={...root}
        childrenKeys.forEach(key=>delete dataWithoutChildren[key]); // We are going to add childrenKeys as separate boxes, so we can remove them from here

        node.children.push({
            id: propsBoxKey,
            name: "Info",
            data: dataWithoutChildren,
            children: [],
        });
    }

    childrenKeys.forEach(childKey => {
        const childBoxKey = boxKey + '-' + childKey + '-' + childrenKeys.indexOf(childKey);
        const childNode = mapBoxDataChildren(root[childKey], childBoxKey, capitalize(childKey));
        if (childNode) {
            node.children.push(childNode);
        }
    });

    return node;
}
