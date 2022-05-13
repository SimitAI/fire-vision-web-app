import Tile from "./Tile";
import {useState} from "react";

const Board = (props) => {

    const rowStyle = {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start"
    }

    const {
        boardCreator,
        tileStateMap
    } = {...props}

    const [focusedTileId, setFocusedTileId] = useState(null);
    const [prevFocusedTileId, setPrevFocusedTileId] = useState(null);

    const tileClickHandler = (id) => {
        if (focusedTileId === id) {
            setFocusedTileId(null);
            setPrevFocusedTileId(id);
        } else {
            setFocusedTileId(id);
        }
    }

    const drawBoard = () => {
        boardCreator.create();
        console.log(boardCreator.board);
        return (
            <div
                id={"board"}
            >
                {
                    boardCreator.board.map(row =>
                        <div
                            key={row.id}
                            id={row.id}
                            style={rowStyle}
                        >
                            {
                                row.tiles.map(tile =>
                                    <Tile
                                        key={tile.id}
                                        id={tile.id}
                                        width={tile.width}
                                        height={tile.height}
                                        prevPoint={tile.prevPoint}
                                        nextPoint={boardCreator.getTileNextPoint(tile.id, focusedTileId)}
                                        state={tileStateMap[tile.id]}
                                        onClickHandler={tileClickHandler}
                                        isFocused={focusedTileId === tile.id}
                                        prevFocused={prevFocusedTileId === tile.id}
                                        image={tile.image}
                                    />
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    }

    return drawBoard();
}

export default Board;