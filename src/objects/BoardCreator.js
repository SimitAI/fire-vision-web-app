import Point from "./Point";

class BoardCreator {

    constructor(rowNum, colNum, boardStartPoint, tileWidth, tileHeight, tilePadding, imageManager) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.boardStartPoint = boardStartPoint;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tilePadding = tilePadding;
        this.board = [];
        this.tilePoints = [];
        this.imageManager = imageManager;
    }

    create() {
        this.board = [];
        for (let i = 0; i < this.rowNum; i++) {
            const row = {
                id: `row-${i}`,
                tiles: []
            };
            for (let j = 0; j < this.colNum; j++) {

                let prevPoint = new Point(
                    this.boardStartPoint.x + (this.tileWidth + this.tilePadding) * j,
                    this.boardStartPoint.y + (this.tileHeight + this.tilePadding) * i,
                    this.boardStartPoint.z + 0
                );

                this.tilePoints.push(prevPoint);

                let tileId = 10 * i + j
                let tileImage = this.imageManager.getImage(tileId);

                row.tiles.push({
                    id: tileId,
                    width: this.tileWidth,
                    height: this.tileHeight,
                    prevPoint: prevPoint,
                    nextPoint: new Point(
                        0,
                        0,
                        0
                    ),
                    image: tileImage
                });
            }
            this.board.push(row);
        }
    }

    getTile(id) {
        const i = (id - id % 10) / 10;
        const j = id % 10;
        return this.board[i].tiles[j];
    }

    getTileNextPoint(id, focusedTileId) {
        const i = (id - id % 10) / 10;
        const j = id % 10;
        const tile = this.board[i].tiles[j];

        if (id === focusedTileId) {
            return new Point(
                -tile.prevPoint.x + this.boardStartPoint.x + this.tileWidth * 5 - this.tilePadding * this.rowNum,
                -tile.prevPoint.y + this.boardStartPoint.y + this.tileHeight * 5 - this.tilePadding * this.colNum,
                0);
        }

        return tile.nextPoint;
    }

    getDronePoint(index) {
        let nextPoint = this.tilePoints[index];
        return new Point(
            nextPoint.x - this.boardStartPoint.x,
            nextPoint.y - this.boardStartPoint.y,
            0,
        );
    }

}

export default BoardCreator;