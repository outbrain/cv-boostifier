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
        offset= { x: 0, y: width*1.2, z: 0 };
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
    return navigator.userAgent.includes("Firefox");
}

export function isPrimitive(value: any) {
    return value !== Object(value);
}

export function capitalize(str: string) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export function mapBoxData(root: any): BoxData[] {
    let result: BoxData[] = [];
    const keys = Object.keys(root)
    keys.forEach((key) => {
        const node = mapBoxDataChildren(root[key], key + '-' + keys.indexOf(key), capitalize(key))
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
        Education=>area
        Interest=>name
        Language=>language
        Project=>name
        Publication=>name
        Reference=>name
        Skill=>name
        Volunteer=>organization
        Work=>name
        Profile=>network*/

    const nameAttr: string|undefined = ['awarder', 'area', 'name', 'language', 'name', 'organization', 'network'].find(nameAttr=>item[nameAttr]!==undefined);

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
    const hasProperties = keys.some(key => {return !Array.isArray(root[key])});
    const childrenKeys = keys.filter(key => {return Array.isArray(root[key]) && root[key].length > 0 && !isPrimitive(root[key][0])});

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
        return mapBoxDataChildren(root[childrenKeys[0]], childBoxKey + '-' + 0, "");
    }

    const node: BoxData = {
        id: boxKey,
        name: boxName,
        children: [],
    };

    if (hasProperties) {
        const childBoxKey = boxKey + '-' + 0;
        node.children.push({
            id: childBoxKey,
            name: "Info",
            data: root,
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
