import BaseObject from "./BaseObject";
import DroneIcon from "../icons/DroneIcon";

const Drone = (props) => {

    const {
        id,
        boardCreator,
        index,
        scale,
        width,
        height,
        color
    } = {...props}

    const prevPoint = boardCreator.boardStartPoint;
    const nextPoint = boardCreator.getMovingObjectNextPoint(index);

    const shiftLeft = (width - width * scale) / 2;
    const shiftTop = (height - height * scale) / 2;

    const movingTileStyle = {
        margin: 0,
        padding: 0,
        position: "fixed",
        left: prevPoint.x + shiftLeft,
        top: prevPoint.y + shiftTop,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "transparent",
        border: "none",
        overflow: "visible !important"
    }

    const drawMovingTile = () => {
        boardCreator.create();
        return (
            <BaseObject
                style={movingTileStyle}
                prevPoint={prevPoint}
                nextPoint={nextPoint}
                scalar={1}
                opacity={1}
                zIndex={3}
                onClickHandler={() => {}}
            >
                {
                    <DroneIcon
                        alternative={false}
                        width={width * scale}
                        height={height * scale}
                        color={color}
                        filter={"drop-shadow(75px -50px 100px rgba(0, 0, 0, 0.75))"}
                        stroke={"black"}
                        strokeWidth={"10"}
                    />
                }
            </BaseObject>
        );
    }

    return drawMovingTile();

}

export default Drone;