import Random from "./Random";

const path = "images";
const SAFE = "/safe";
const MAX_SAFE = -1;
const FIRE = "/fire";
const MAX_FIRE = 485;
const HUMAN = "/human";
const MAX_HUMAN = -1;

class ImageManager {

    constructor() {
        this.path = path;
        this.usedSafe = [];
        this.usedFire = [];
        this.usedHuman = [];
    }

    getUniqueImageId(arr, max) {
        let id = Random.randomInt(0, max);
        while (arr.includes(id)) {
            id = Random.randomInt(0, max);
        }
        return id;
    }

    getRandomImage() {
        if (Random.randPercent(0)) {
            return `${this.path}${SAFE}/${this.getUniqueImageId(this.usedSafe, MAX_SAFE)}.jpg`;
        } else if (Random.randPercent(100)) {
            return `${this.path}${FIRE}/${this.getUniqueImageId(this.usedFire, MAX_FIRE)}.jpg`;
        } else {
            return `${this.path}${HUMAN}/${this.getUniqueImageId(this.usedHuman, MAX_HUMAN)}.jpg`;
        }
    }

}

export default ImageManager;