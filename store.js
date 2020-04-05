const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
    constructor(options) {
        // Main Process = electron.app
        // Renderer = electron.remote.app
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userDataPath, options.fileName + '.json');
        this.data = parseDataFile(this.path);
    }

    load() {
        return this.data;
    }

    save(data) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(data));
        } catch(error) {
            console.log(error)
            fs.writeFileSync(this.path, JSON.stringify({});
        }
    }
}

function parseDataFile(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch(error) {
        console.log(error)
        return null;
    }
}

module.exports = Store;

How to use:
const store = new Store({
    fileName: 'MyFile'
})