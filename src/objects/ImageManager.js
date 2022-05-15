import Random from "./Random";

const path = "images";
const SAFE = "/safe";
const MAX_SAFE = 99;
const FIRE = "/fire";
const MAX_FIRE = 121;
const HUMAN = "/human";
const MAX_HUMAN = 131;
const DANGER = "/danger";
const MAX_DANGER = 10;

class ImageManager {

    constructor() {
        this.path = path;
        this.usedSafe = [];
        this.usedFire = [];
        this.usedHuman = [];
        this.usedDanger = [];
        this.imageMap = new Map();
    }

    getUniqueImageId(arr, max) {
        let id = Random.randomInt(0, max);
        while (arr.includes(id)) {
            id = Random.randomInt(0, max);
        }
        return id;
    }

    getImage(tileId) {
        if (this.imageMap.has(tileId)) {
            return this.imageMap.get(tileId);
        }

        let imageId;
        let imagePath;
        if (Random.randPercent(75)) {
            imageId = this.getUniqueImageId(this.usedSafe, MAX_SAFE);
            this.usedSafe.push(imageId);
            imagePath = `${this.path}${SAFE}/${imageId}.jpg`;
            this.imageMap.set(tileId, imagePath);
            return imagePath;
        } else if (Random.randPercent(20)) {
            imageId = this.getUniqueImageId(this.usedFire, MAX_FIRE);
            this.usedFire.push(imageId);
            imagePath = `${this.path}${FIRE}/${imageId}.jpg`;
            this.imageMap.set(tileId, imagePath);
            return imagePath;
        } else if (Random.randPercent(20)) {
            imageId = this.getUniqueImageId(this.usedDanger, MAX_DANGER);
            this.usedDanger.push(imageId);
            imagePath = `${this.path}${DANGER}/${imageId}.jpg`;
            this.imageMap.set(tileId, imagePath);
            return imagePath;
        } else {
            imageId = this.getUniqueImageId(this.usedHuman, MAX_HUMAN);
            this.usedHuman.push(imageId);
            imagePath = `${this.path}${HUMAN}/${imageId}.jpg`;
            this.imageMap.set(tileId, imagePath);
            return imagePath;
        }
    }

}

export default ImageManager;