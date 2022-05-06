import BoardCreator from "../objects/BoardCreator";
import Point from "../objects/Point";
import Tile from "./Tile";

const MovingTile = (props) => {

    const {
        id,
        boardCreator,
        index,
        color
    } = {...props}

    const drawMovingTile = () => {
        boardCreator.create();
        return (
            <Tile
                id={id + 10000}
                width={32}
                height={32}
                prevPoint={boardCreator.boardStartPoint}
                nextPoint={boardCreator.getMovingObjectNextPoint(index)}
                color={color}
                onClickHandler={ () => {}}
                isFocused={false}
                prevFocused={false}
            />
        );
    }

    return drawMovingTile();

}

export default MovingTile;