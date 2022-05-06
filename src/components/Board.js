import BoardCreator from "../objects/BoardCreator";
import Tile from "./Tile";
import Point from "../objects/Point";
import {useEffect, useState} from "react";

const Board = (props) => {

    const rowStyle = {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start"
    }

    const {
        boardCreator,
        colorMap
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
                                        color={colorMap[tile.id]}
                                        onClickHandler={tileClickHandler}
                                        isFocused={focusedTileId === tile.id}
                                        prevFocused={prevFocusedTileId === tile.id}
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