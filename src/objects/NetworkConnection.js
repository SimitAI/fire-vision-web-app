const serverURL = "http://44.203.36.22:8000/image";

class NetworkConnection {

    async getImage(url) {
        return await fetch(`${process.env.PUBLIC_URL}/${url}`, { method: "GET"})
            .then(response => response.body)
            .then(body => body.getReader().read().then( ({done, value}) => value))
            .then(value => new Blob([value], {type: "image/jpg"}));
    }

    async sendRequest(longitude, latitude, url) {
        const data = new FormData();
        const image = await this.getImage(url);
        data.append('file', image);
        data.append('longitude', longitude);
        data.append('latitude', latitude);

        return await fetch(serverURL, { method: 'POST', body: data })
            .then(response => response.body)
            .then(body => body.getReader().read().then( ({done, value}) => value))
            .then(value => String.fromCharCode(...Array.from(value)));
    }
}

export default NetworkConnection;