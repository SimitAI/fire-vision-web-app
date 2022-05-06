import Tile from "./components/Tile";
import Point from "./objects/Point";
import BoardCreator from "./objects/BoardCreator";
import {useEffect, useState} from "react";
import Board from "./components/Board";
import MovingTile from "./components/MovigTile";

function App() {

    const appStyle = {
        width: "100%",
        height: "100%",
    }

    const rowNum = 8;
    const colNum = 8;
    const boardPadding = 100;
    const tileWidth = 52;
    const tileHeight = 52;
    const defaultTileColor = "lightblue";
    const tilePadding = 8;
    const boardStartPoint = new Point(
        Point.screen00.x + boardPadding,
        Point.screen00.y + boardPadding,
        0
    );
    const boardCreator = new BoardCreator(rowNum, colNum, boardStartPoint, tileWidth, tileHeight, tilePadding, defaultTileColor);
    

    const movingTiles = [
        {
            id: 0,
            path: [
                0, 1, 2, 3,
                11, 10, 9, 8,
                16, 17, 18, 19,
                27, 26, 25, 24
            ],
            color: "Teal"
        },
        {
            id: 1,
            path: [
                7, 6, 5, 4,
                12, 13, 14, 15,
                23, 22, 21, 20,
                28, 29, 30, 31
            ],
            color: "DarkSalmon"
        },
        {
            id: 2,
            path: [
                56, 57, 58, 59,
                51, 50, 49, 48,
                40, 41, 42, 43,
                35, 34, 33, 32,
            ],
            color: "DimGrey"
        },
        {
            id: 3,
            path: [
                63, 62, 61, 60,
                52, 53, 54, 55,
                47, 46, 45, 44,
                36, 37, 38, 39
            ],
            color: "Orchid"
        }
    ];

    const [movingTileIndices, setMovingTileIndices] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0
    });

    const [changedTileColors, setChangedTileColors] = useState({});

    const randomColor = () => {
        let rnd = Math.random();
        if (rnd >= 0 && rnd < 0.8) {
            return "green";
        } else if (rnd >= 0.8 && rnd <= 0.9) {
            return "red";
        } else {
            return "blue";
        }
        return
    }

    const btnClickHandler = (e) => {
        movingTiles.forEach(movingTile => {
            let currIndex = movingTileIndices[movingTile.id];
            let currPos = movingTile.path[currIndex];
            let id = Math.floor(currPos / 8) * 10 + currPos % 8;

            setMovingTileIndices(prevState=> ({
                ...prevState,
                [movingTile.id]: (currIndex + 1) % movingTile.path.length
            }));
            setChangedTileColors(prevState=> ({
                ...prevState,
                [id]: randomColor()
            }));
        });
    }

    const createTileColorMap = () => {
        let colorMap = {}
        for (let i = 0; i <= rowNum * colNum; i++) {
            for (let j = 0; j <= colNum; j++) {
                let changedColor = changedTileColors[i * 10 + j];
                colorMap[i * 10 + j] = changedColor ? changedColor :"lightblue";
            }  
        }
        return colorMap;
    }

    const drawApp = () => {
        return (
            <div
                id={"app"}
                style={appStyle}
            >
                <div>
                    <Board
                        boardCreator={boardCreator}
                        colorMap={createTileColorMap()}
                    />
                </div>
                <div>
                    {
                        movingTiles.map(movingTile => 
                            <div 
                                key={movingTile.id}
                            >
                                <MovingTile
                                    id={movingTile.id}
                                    boardCreator={boardCreator}
                                    index={movingTile.path[
                                        movingTileIndices[movingTile.id]
                                    ]}
                                    color={movingTile.color}
                                />
                            </div>
                        )
                    }
                    
                </div>
                <div>
                    <button
                        onClick={btnClickHandler}
                    >
                        Click
                    </button>
                </div>
    
            </div>
    
        );
    }

    return drawApp();
    
}

export default App;
