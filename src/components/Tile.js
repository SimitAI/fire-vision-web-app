import BaseObject from "./BaseObject"
import {useEffect, useState} from "react";
import TileState from "../objects/TileState";

const Tile = (props) => {

    const id = props.id;
    const width = props.width;
    const height = props.height;
    const state = props.state;

    const prevPoint = props.prevPoint;
    const nextPoint = props.nextPoint;

    const isFocused = props.isFocused;
    const prevFocused = props.prevFocused;

    const image = props.image;
    const imageShift = 25;

    const [scalar, setScalar] = useState(1);
    const [zIndex, setZIndex] = useState(1);

    const getColor = () => {
        switch (state) {
            case TileState.UNEXPLORED:
                return "#cfe2de";
            case TileState.EXPLORING:
                return "yellow";
            case TileState.SAFE:
                return "green";
            case TileState.HUMAN:
                return "blue";
            case TileState.FIRE:
                return "red";
            default:
                return "black";
        }
    }

    const tileStyle = {
        margin: 0,
        padding: 0,
        position: "fixed",
        left: prevPoint.x,
        top: prevPoint.y,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: getColor(),
        border: isFocused ? "0.1px dashed black" : "",
        borderRadius: `${width / 6}px`,
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
    }

    const imageStyle = {
        width: width - imageShift,
        height: height - imageShift,
        borderRadius: `${width / 6}px`,
        margin: `${imageShift / 2}px 0px 0px ${imageShift / 2}px`,
    }

    useEffect(() => {
        setScalar(isFocused ? 10 : 1);
        setZIndex(isFocused ? 10 : prevFocused ? 5 : 1);
    }, [isFocused, prevFocused]);

    const onClickHandler = (e) => {
        props.onClickHandler(id);
    }

    const info = () => {
        return (
            <div>
                <div>
                    <img
                        style={imageStyle}
                        src={`${process.env.PUBLIC_URL}/${image}`}
                        alt={"Image"}
                    />
                </div>
            </div>
        );
    }

    return (
        <BaseObject
            style={tileStyle}
            prevPoint={prevPoint}
            nextPoint={nextPoint}
            scalar={scalar}
            opacity={1}
            zIndex={zIndex}
            onClickHandler={onClickHandler}
        >
            {isFocused ? info() : null}
        </BaseObject>
    );
}

export default Tile;