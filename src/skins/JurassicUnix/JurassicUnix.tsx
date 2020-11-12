import './JurassicUnix.scss';

import React, {PropsWithChildren} from 'react';
import {IProfileProps} from '../../models';
import {THEME_MOVIE} from './JurassicUnix.config';
import {BOX_MARGIN, HUE_INCREMENT, SCENE_WIDTH, SIZE_UNIT} from './JurassicUnix.constants';
import {BoxData} from './types/box-data';
import {
    getPerspectiveFor,
    addCoordinates,
    get3DTranslation,
    get3DRotation,
    mapBoxData,
    capitalize,
} from './JurassicUnix.helpers';
import {PerspectiveType} from "./types/perspective-type";
import {Perspective} from "./types/perspective";
import {JurassicUnixState} from "./types/jurassic-unix-state";
import {SceneContainerProps} from "./types/scene-container-props";
import {BoxDataGroupProps} from "./types/box-data-group-props";
import {BoxProps} from "./types/box-props";
import {PositionedContainerProps} from "./types/positioned-container-props";
import {DataDisplayProps} from "./types/data-display-props";


export function JurassicUnix(props: PropsWithChildren<IProfileProps>) {
    const SELECTED_THEME = THEME_MOVIE;
    const DEFAULT_PERSPECTIVE: Perspective = getPerspectiveFor(
        0,
        0,
        SCENE_WIDTH,
        SCENE_WIDTH,
        PerspectiveType.SIDE_VIEW
    );

    const BOX_STRUCTURE: BoxData[] = mapBoxData(props.profile);

    class SceneContainer extends React.Component<SceneContainerProps, JurassicUnixState> {
        constructor(props: SceneContainerProps) {
            super(props);
            this.state = {
                perspective: { ...DEFAULT_PERSPECTIVE },
                focusedBoxId: undefined,
            };
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick(boxProps: BoxProps, e: MouseEvent) {
            e.preventDefault();
            e.stopPropagation();
            if (
                this.state.focusedBoxId === undefined ||
                this.state.focusedBoxId !== boxProps.id
            ) {
                const perspectiveType: PerspectiveType = boxProps.data ? PerspectiveType.TOP_VIEW : PerspectiveType.SIDE_VIEW;
                // Focus on the clicked box
                const newState = {
                    perspective: getPerspectiveFor(
                        boxProps.absolutePosition.x,
                        boxProps.absolutePosition.y,
                        boxProps.absolutePosition.z + boxProps.width,
                        boxProps.width,
                        perspectiveType
                    ),
                    focusedBoxId: boxProps.id,
                };
                this.setState(newState)
            } else {
                // The clicked box was already focused, zoom out to wide view
                const newState = {
                    perspective: { ...DEFAULT_PERSPECTIVE },
                    focusedBoxId: undefined,
                };
                this.setState(newState)
            }
        }

        render() {
            const themeClass = SELECTED_THEME.name;
            return (
                <div className={"jurassic-unix__wrapper " + themeClass}>
                    <div className="jurassic-unix__three-d-container jurassic-unix__translated-to-screen-centre">
                        <PositionedContainer
                            position={this.state.perspective.viewPoint}
                            viewRotation={this.state.perspective.perspectiveType===PerspectiveType.SIDE_VIEW?-35:-90}
                            animated={true}
                        >
                            <Box
                                position={{ x: 0, y: 0, z: 0 }}
                                absolutePosition={{ x: 0, y: 0, z: 0 }}
                                width={SCENE_WIDTH}
                                height={SCENE_WIDTH / 5}
                                hue={SELECTED_THEME.baseHue}
                                name={""}
                                id={"base"}
                                key={"base"}
                                onClick={this.handleClick}
                            >
                                <BoxDataGroup
                                    data={BOX_STRUCTURE}
                                    groupWidth={SCENE_WIDTH}
                                    hue={SELECTED_THEME.baseHue + SELECTED_THEME.hueIncrement}
                                    onClick={this.handleClick}
                                />
                            </Box>
                        </PositionedContainer>
                    </div>
                </div>
            );
        }
    }

    class BoxDataGroup extends React.Component<BoxDataGroupProps> {
        render() {
            const boxes: JSX.Element[] = [];
            const boxCount = this.props.data.length;
            const boxesInWidth = Math.ceil(Math.sqrt(boxCount));
            const boxSpace = this.props.groupWidth / boxesInWidth;
            const boxWidth = (1 - 2 * BOX_MARGIN) * boxSpace;
            const boxHeight = boxWidth / 5;

            this.props.data.forEach((box: BoxData, index: number) => {
                const xPos = index % boxesInWidth;
                const zPos = Math.floor(index / boxesInWidth);
    
                const boxPosition = {
                    x: (xPos + BOX_MARGIN) * boxSpace,
                    y: 0 - boxHeight,
                    z: (zPos + BOX_MARGIN) * boxSpace,
                };
    
                const boxAbsolutePosition = addCoordinates(
                    boxPosition,
                    this.props.absolutePosition
                );
    
                const childGroup = box.children ? (
                    <BoxDataGroup
                        absolutePosition={boxAbsolutePosition}
                        data={box.children}
                        groupWidth={boxWidth}
                        hue={this.props.hue + HUE_INCREMENT}
                        onClick={this.props.onClick}
                    />
                ) : undefined;
    
                boxes.push(
                    <Box
                        position={boxPosition}
                        absolutePosition={boxAbsolutePosition}
                        width={boxWidth}
                        height={boxHeight}
                        hue={this.props.hue}
                        name={box.name}
                        id={box.id}
                        key={box.id}
                        data={box.data}
                        onClick={this.props.onClick}
                    >
                        {childGroup}
                    </Box>
                );
            });
    
            return <>{boxes}</>;
        }
    }

    class Box extends React.Component<BoxProps> {
        render() {
            const dataDisplay = this.props.data ? <DataDisplay data={this.props.data}></DataDisplay> : undefined;
            const shouldUseSmallFont: boolean = this.props.name.length>10 && this.props.name !== 'Publications';
            const labelClass: string = "jurassic-unix__box-label" + (shouldUseSmallFont?' jurassic-unix__box-label--smallfont':'')
            return (
                <PositionedContainer position={this.props.position}>
                    <div
                        className="jurassic-unix__box"
                        onClick={(e) => this.props.onClick(this.props, e as any)}
                        style={{
                            "--box-length": this.props.width + SIZE_UNIT,
                            "--box-width": this.props.width + SIZE_UNIT,
                            "--box-height": this.props.height + SIZE_UNIT,
                            "--hue": this.props.hue,
                        } as any}
                    >
                        {this.props.children}
                        <div className="jurassic-unix__box-side jurassic-unix__box-top">
                            {dataDisplay}
                        </div>
                        <div className="jurassic-unix__box-side jurassic-unix__box-back"></div>
                        <div className="jurassic-unix__box-side jurassic-unix__box-front"></div>
                        <div className="jurassic-unix__box-side jurassic-unix__box-right"></div>
                        <div className="jurassic-unix__box-side jurassic-unix__box-left"></div>
                        <div className="jurassic-unix__box-side jurassic-unix__box-bottom"></div>
                        <div className={labelClass}>{this.props.name}</div>
                    </div>
                </PositionedContainer>
            );   
        }
    }

    class DataDisplay extends React.Component<DataDisplayProps>{
        // TODO: Display data differently for each kind of object
        render() {
            const data: any = this.props.data||{};
            return <div className="jurassic-unix__box-text">
              {data.picture && <div className="jurassic-unix__box-text-picture"><img src={data.picture}></img></div>}
              {Object.keys(data).map(key =>{
                if(key!=='picture'){
                  return <div key={key}>{capitalize(key) + ": "}{this.formatProp(data[key])}</div>
                }
                })}
              </div>;
        }

        formatProp(prop: string): any{
            if(typeof prop === 'string' && prop.startsWith('http')){
                return <a href={prop} target="_blank" rel="noopener noreferrer" onClick={e=> {
                    e.stopPropagation();
                }}>{prop}</a>;
            } else if(Array.isArray(prop)){
                return prop.join(', ');
            } else{
                return prop;
            }
        }
    }

    class PositionedContainer extends React.Component<PositionedContainerProps> {
        render() {
            const className = "jurassic-unix__three-d-container" + (this.props.animated ? " jurassic-unix__animated" : "");
            return (
                <div
                    className={className}
                    style={{
                        transform: get3DRotation('x', this.props.viewRotation||0) + get3DTranslation(this.props.position),
                    }}
                >{this.props.children}</div>
            );
        }
    }

    return (
        <SceneContainer/>
    );
}
