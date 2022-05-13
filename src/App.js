import Point from "./objects/Point";
import BoardCreator from "./objects/BoardCreator";
import {useEffect, useState} from "react";
import Board from "./components/Board";
import Drone from "./components/Drone";
import TileState from "./objects/TileState";
import Random from "./objects/Random";

function App() {

    const appStyle = {
        width: "100%",
        height: "100%",
        backgroundImage: "linear-gradient(180deg, rgba(157,177,164,1) 5%, rgba(101,117,112,1) 40%, rgba(55,72,69,1) 75%, rgba(8,27,25,1) 100%)"
    }

    const rowNum = 8;
    const colNum = 8;
    const minSide = Math.min(Point.screenW, Point.screenH);
    const tilePadding = minSide / 100;
    const tileWidth = (minSide / (rowNum + 2)) - tilePadding;
    const tileHeight = (minSide / (colNum + 2)) - tilePadding;
    const boardPadding = (tileWidth + tileHeight) / 2 + tilePadding;
    const boardStartPoint = new Point(
        Point.screen00.x + boardPadding,
        Point.screen00.y + boardPadding,
        0
    );
    const boardCreator = new BoardCreator(rowNum, colNum, boardStartPoint, tileWidth, tileHeight, tilePadding);

    const droneColor = "gainsboro";
    const droneScale = 0.75;
    const [drones, setDrones] = useState([]);
    const [changedTileStates, setChangedTileStates] = useState({});
    const [tilesBeingExplored, setTilesBeingExplored] = useState([]);

    const randomState = () => {
        if (Random.randPercent(80)) {
            return TileState.SAFE;
        } else if (Random.randPercent(30)) {
            return TileState.FIRE;
        } else {
            return TileState.HUMAN;
        }
    }

    useEffect(() => {
        setDrones([
            {
                id: 0,
                path: [
                    0, 1, 2, 3,
                    11, 10, 9, 8,
                    16, 17, 18, 19,
                    27, 26, 25, 24
                ],
                index: 0
            },
            {
                id: 1,
                path: [
                    7, 6, 5, 4,
                    12, 13, 14, 15,
                    23, 22, 21, 20,
                    28, 29, 30, 31
                ],
                index: 0
            },
            {
                id: 2,
                path: [
                    56, 57, 58, 59,
                    51, 50, 49, 48,
                    40, 41, 42, 43,
                    35, 34, 33, 32,
                ],
                index: 0
            },
            {
                id: 3,
                path: [
                    63, 62, 61, 60,
                    52, 53, 54, 55,
                    47, 46, 45, 44,
                    36, 37, 38, 39
                ],
                index: 0
            }
        ]);
    }, []);

    useEffect(() => {
        const startExploringTiles = () => {
            const newTilesBeingExploredState = [];

            drones.forEach(drone => {
                let nextPos = drone.path[drone.index];
                let id = Math.floor(nextPos / 8) * 10 + nextPos % 8;
                newTilesBeingExploredState.push(id);
            });

            setTilesBeingExplored(newTilesBeingExploredState);
        }

        startExploringTiles();
    }, [drones]);

    useEffect(() => {
        tilesBeingExplored.forEach(id => {
            setChangedTileStates(prevState => ({
                ...prevState,
                [id]: TileState.EXPLORING
            }));
        })
    }, [tilesBeingExplored]);

    const btnClickHandler = (e) => {
        const newDronesState = [];

        drones.forEach(drone => {
            let currPos = drone.path[drone.index];
            let id = Math.floor(currPos / 8) * 10 + currPos % 8;
            drone.index = (drone.index + 1) % drone.path.length;

            newDronesState.push(drone);

            setChangedTileStates(prevState => ({
                ...prevState,
                [id]: randomState()
            }));
        });

        setDrones(newDronesState);
    }

    const createTileStateMap = () => {
        let stateMap = {}
        for (let i = 0; i <= rowNum * colNum; i++) {
            for (let j = 0; j <= colNum; j++) {
                let changedState = changedTileStates[i * 10 + j];
                stateMap[i * 10 + j] = changedState ? changedState : TileState.UNEXPLORED;
            }
        }
        return stateMap;
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
                        tileStateMap={createTileStateMap()}
                    />
                </div>
                <div>
                    {
                        drones.map(drone =>
                            <div
                                key={drone.id}
                            >
                                <Drone
                                    id={drone.id}
                                    boardCreator={boardCreator}
                                    index={drone.path[drone.index]}
                                    scale={droneScale}
                                    width={tileWidth}
                                    height={tileHeight}
                                    color={droneColor}
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
