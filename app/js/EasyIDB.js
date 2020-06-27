/*!
 * EasyIDB v0.0.1
 * (c) 2020 Michael Miller
 * Released under the MIT License.
 */

class EasyIDB {
    constructor(name, tables, version) {
        this.name = name;
        this.tables = tables;
        this.version = version;
        this.db = null;
    }

    async getDB() {
        return new Promise((resolve, reject) => {
            if (this.db) { return resolve(this.db); }

            // console.log(`Database: ${DB}`)
            let request = window.indexedDB.open(this.name, this.version);

            request.onerror = error => {
                console.log(`Error opening database: ${error.target.errorCode}`);
                reject('Error');
            };

            request.onsuccess = event => {
                // console.log(`is this the db: ${this.db}`)
                this.db = event.target.result;
                // console.log(`or is this the db: ${this.db}`)
                resolve(this.db);
            };

            request.onupgradeneeded = event => {
                // console.log(`upgrading DB: ${this.name}, version: ${this.version}`)
                this.db = event.target.result;
                this.tables.forEach(element => {
                    if (!this.db.objectStoreNames.contains(element.name)) {
                        this.db.createObjectStore(element.name, element.options);
                    }
                });
                // console.log(this.db);
            };
        });
    }

    async createEntry(table, entry) {
        let db = await this.getDB()
        return new Promise(resolve => {
            let trans = db.transaction([table], 'readwrite');
            trans.oncomplete = () => {
                resolve();
            };

            let store = trans.objectStore(table);
            store.put(entry);
        });
    }

    async createTable(table, variables) {
        let db = await this.getDB()
        return new Promise(resolve => {
            db.createObjectStore(table, variables)
            resolve("done")
        });
    }

    async deleteEntry(table, id) {
        let db = await this.getDB();
        return new Promise (resolve => {
            let trans = db.transaction([table], 'readwrite');
            trans.oncomplete = () => {
                resolve()
            };

            let store = trans.objectStore(table);
            store.delete(id);
        })
    }

    async readTable(table) {
        let db = await this.getDB();
        return new Promise(resolve => {
            let trans = db.transaction([table], 'readonly');
            trans.oncomplete = () => {
                resolve(entries);
            };
            
            let store = trans.objectStore(table);
            let entries = [];

            store.openCursor().onsuccess = event => {
                let cursor = event.target.result;
                if (cursor) {
                    entries.push(cursor.value)
                    cursor.continue();
                }
            };
        });
    }
}