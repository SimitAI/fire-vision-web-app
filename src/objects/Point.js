class Point {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static screenW = window.innerWidth;
    static screenH = window.innerHeight;
    static screen00 = new Point(0, 0, 0);

}

export default Point;