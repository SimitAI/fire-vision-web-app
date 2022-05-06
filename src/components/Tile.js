import {Motion, spring} from "react-motion";
import Point from "../objects/Point";
import {useEffect, useState} from "react";

const Tile = (props) => {

    const id = props.id;
    const width = props.width;
    const height = props.height;
    const color = props.color;

    const prevPoint = props.prevPoint;
    const nextPoint = props.nextPoint;

    const isFocused = props.isFocused;
    const prevFocused = props.prevFocused;

    const [scalar, setScalar] = useState(1);
    const [zIndex, setZIndex] = useState(1);

    const tileStyle = {
        margin: 0,
        padding: 0,
        position: "fixed",
        left: prevPoint.x,
        top: prevPoint.y,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        border: id >= 10000 ? "10px outset white" : isFocused ? "0.1px dashed black" : "",
        borderRadius: "4px",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
    }

    useEffect(() => {
        setScalar(isFocused ? 10 : 1);
        setZIndex(isFocused ? 10: prevFocused ? 5 : 1);
    }, [isFocused, prevFocused]);

    const onClickHandler = (e) => {
        props.onClickHandler(id);
    }

    const info = () => {
        return (
          <div>
              <div>
                  <img width={width} height={height} src={"https://emojipedia-us.s3.amazonaws.com/source/skype/289/fire_1f525.png"}/>
              </div>
          </div>
        );
    }

    return (
        <Motion
            defaultStyle={{
                x: prevPoint.x,
                y: prevPoint.y,
                z: prevPoint.z,
                s: 1,
                o: 0,
                zIndex: 0
            }}
            style={{
                x: spring( nextPoint.x, {damping: 12}),
                y: spring( nextPoint.y, {damping: 12}),
                z: spring( nextPoint.z, {damping: 12}),
                s: spring(scalar),
                o: spring(1),
                zIndex: zIndex
            }}
        >
            {(args) => (
                <div
                    style={{
                        ...tileStyle,
                        zIndex: `${args.zIndex}`,
                        transform: `translate3d(${args.x}px, ${args.y}px, ${args.z}px) scale(${args.s})`,
                        opacity: `${args.o}`
                    }}
                    onClick={onClickHandler}
                >
                    {isFocused ? info() : null}
                </div>

            )}
        </Motion>
    );
}

export default Tile;