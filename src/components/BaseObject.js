import {Motion, spring} from "react-motion";

const BaseObject = (props) => {

    const style = props.style;

    const prevPoint = props.prevPoint;
    const nextPoint = props.nextPoint;

    const scalar = props.scalar;
    const opacity = props.opacity;
    const zIndex = props.zIndex;

    const onClickHandler = props.onClickHandler;

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
                x: spring(nextPoint.x, {damping: 12}),
                y: spring(nextPoint.y, {damping: 12}),
                z: spring(nextPoint.z, {damping: 12}),
                s: spring(scalar),
                o: spring(opacity),
                zIndex: zIndex
            }}
        >
            {(args) => (
                <div
                    style={{
                        ...style,
                        zIndex: `${args.zIndex}`,
                        transform: `translate3d(${args.x}px, ${args.y}px, ${args.z}px) scale(${args.s})`,
                        opacity: `${args.o}`
                    }}
                    onClick={onClickHandler}
                >
                    {props.children}
                </div>
            )}
        </Motion>
    );
}

export default BaseObject;