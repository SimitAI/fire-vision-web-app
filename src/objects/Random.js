class Random {

    randPercent(percent) {
        let rnd = Math.random();
        return rnd < (percent / 100)
    }

    randomInt(start, end) {
        let range = end - start;
        return Math.floor(Math.random() * range + start);
    }

}

export default new Random();