import React, {PropsWithChildren} from 'react';
import './JurassicUnix.scss';
import {IProfileProps} from '../../models';

export function JurassicUnix(props: PropsWithChildren<IProfileProps>) {
    const {basics, skills, work, education, references, projects, publications, languages} = props.profile;

    interface Coordinates{
        x: number, y: number, z: number
    }

    interface BoxProps{
        id: string,
        children?: BoxProps[]
    }

    const THEME_NICE = { name: "jurassic-unix__theme-nice", baseHue: 200, hueIncrement: 90 };
    const THEME_DEPRESSING = {
        name: "jurassic-unix__theme-depressing",
        baseHue: 340,
        hueIncrement: -130,
    };
    const SELECTED_THEME = THEME_DEPRESSING;
    const SIZE_UNIT = "vw";
    const SCENE_WIDTH = 1000;
    const DEFAULT_PERSPECTIVE = getPerspectiveFor(
        0,
        0,
        SCENE_WIDTH,
        SCENE_WIDTH
    );
    const BASE_HUE = 340;
    const HUE_INCREMENT = -130;
    const BOX_MARGIN = 0.2; // How much extra space there is around each box
    const BOX_STRUCTURE: BoxProps[] = [
        { id: "box0" },
        {
            id: "box1",
            children: [
                {
                    id: "box10",
                    children: [
                        {
                            id: "box100",
                            children: [
                                {
                                    id: "box1000",
                                    children: [
                                        { id: "box10000", children: [{ id: "box100000" }] },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: "box2",
            children: [
                { id: "box20" },
                {
                    id: "box21",
                    children: [
                        { id: "box210" },
                        { id: "box211" },
                        { id: "box212" },
                        { id: "box213" },
                        { id: "box214" },
                    ],
                },
            ],
        },
        { id: "box3" },
        { id: "box4" },
        { id: "box5" },
        { id: "box6" },
        { id: "box7" },
        { id: "box8" },
        { id: "box9" },
    ];

    let state = {
        perspective: { ...DEFAULT_PERSPECTIVE },
        focusedBoxId: undefined,
    };

    function getPerspectiveFor(x: number, y: number, z: number, width: number): Coordinates {
        // x, y, z: coordinates of the lower left corner of the object closest to the observer (with maximum z)
        // width: the width of the object we're looking at (size in direction x)
        // output: offset to which we need to move the view in order to see the object
        return { x: -width / 2 - x, y: width / 2.5 - y, z: -width / 3.5 - z };
    }

    function get3DTranslation(offset: Coordinates): string {
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

    function addPositions(position1: Coordinates, position2: Coordinates): Coordinates {
        const pos1 = position1 || { x: 0, y: 0, z: 0 };
        const pos2 = position2 || { x: 0, y: 0, z: 0 };

        return {
            x: pos1.x + pos2.x,
            y: pos1.y + pos2.y,
            z: pos1.z + pos2.z,
        };
    }

    function isBrowserFirefox() {
        return navigator.userAgent.includes("Firefox");
    }

    class SceneContainer extends React.Component {
        render() {
            const themeClass = SELECTED_THEME.name;
            return (
                <div className={"jurassic-unix__wrapper " + themeClass}>
                    <div className="jurassic-unix__three-d-container jurassic-unix__translated-to-screen-centre">
                        <PositionedContainer
                            position={state.perspective}
                            animated={!isBrowserFirefox()}
                        >
                            <Box
                                position={{ x: 0, y: 0, z: 0 }}
                                absolutePosition={{ x: 0, y: 0, z: 0 }}
                                width={SCENE_WIDTH}
                                height={SCENE_WIDTH / 5}
                                hue={SELECTED_THEME.baseHue}
                                id={"base"}
                                key={"base"}
                            >
                                <BoxDataGroup
                                    data={BOX_STRUCTURE}
                                    groupWidth={SCENE_WIDTH}
                                    hue={SELECTED_THEME.baseHue + SELECTED_THEME.hueIncrement}
                                />
                            </Box>
                        </PositionedContainer>
                    </div>
                </div>
            );
        }
    }

    function BoxDataGroup(props: any): JSX.Element {
        const boxes: JSX.Element[] = [];
        const boxCount = props.data.length;
        const boxesInWidth = Math.ceil(Math.sqrt(boxCount));
        const boxSpace = props.groupWidth / boxesInWidth;

        const boxWidth = (1 - 2 * BOX_MARGIN) * boxSpace;
        const boxHeight = boxWidth / 5;

        props.data.forEach((box: BoxProps, index: number) => {
            const xPos = index % boxesInWidth;
            const zPos = Math.floor(index / boxesInWidth);

            const boxPosition = {
                x: (xPos + BOX_MARGIN) * boxSpace,
                y: 0 - boxHeight,
                z: (zPos + BOX_MARGIN) * boxSpace,
            };

            const boxAbsolutePosition = addPositions(
                boxPosition,
                props.absolutePosition
            );

            const childGroup = box.children ? (
                <BoxDataGroup
                    absolutePosition={boxAbsolutePosition}
                    data={box.children}
                    groupWidth={boxWidth}
                    hue={props.hue + HUE_INCREMENT}
                />
            ) : undefined;

            boxes.push(
                <Box
                    position={boxPosition}
                    absolutePosition={boxAbsolutePosition}
                    width={boxWidth}
                    height={boxHeight}
                    hue={props.hue}
                    id={box.id}
                    key={box.id}
                >
                    {childGroup}
                </Box>
            );
        });

        return <>{boxes}</>;
    }

    function PositionedContainer(props: any): JSX.Element {
        const className =
            "jurassic-unix__three-d-container" + (props.animated ? " jurassic-unix__animated" : "");
        return (
            <div
                className={className}
                style={{
                    transform: get3DTranslation(props.position),
                }}
            >
                {props.children}
            </div>
        );
    }

    function Box(props: any): JSX.Element {
        return (
            <PositionedContainer position={props.position}>
                <div
                    className="jurassic-unix__box"
                    onClick={(e) => handleClick(props, e as any)}
                    style={{
                        "--box-length": props.width + SIZE_UNIT,
                        "--box-width": props.width + SIZE_UNIT,
                        "--box-height": props.height + SIZE_UNIT,
                        "--hue": props.hue,
                    } as any}
                >
                    {props.children}
                    <div className="jurassic-unix__box-side jurassic-unix__box-top"></div>
                    <div className="jurassic-unix__box-side jurassic-unix__box-back"></div>
                    <div className="jurassic-unix__box-side jurassic-unix__box-front"></div>
                    <div className="jurassic-unix__box-side jurassic-unix__box-right"></div>
                    <div className="jurassic-unix__box-side jurassic-unix__box-left"></div>
                    <div className="jurassic-unix__box-side jurassic-unix__box-bottom"></div>
                    <div className="jurassic-unix__box-label">{props.id}</div>
                </div>
            </PositionedContainer>
        );
    }

    function handleClick(boxProps: any, e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (
            state.focusedBoxId === undefined ||
            state.focusedBoxId !== boxProps.id
        ) {
            // Focus on the clicked box
            state = {
                perspective: getPerspectiveFor(
                    boxProps.absolutePosition.x,
                    boxProps.absolutePosition.y,
                    boxProps.absolutePosition.z + boxProps.width,
                    boxProps.width
                ),
                focusedBoxId: boxProps.id,
            };
        } else {
            // The clicked box was already focused, zoom out to wide view
            state = {
                perspective: { ...DEFAULT_PERSPECTIVE },
                focusedBoxId: undefined,
            };
        }
        //renderScene();
    }

    /*function renderScene() {
        ReactDOM.render(<SceneContainer />, document.getElementById("root"));
    }*/

    return (
        <SceneContainer />
    );
}
