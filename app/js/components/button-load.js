const componentButtonLoad = Vue.component('c-button-load', {
    template: `
    <button class="pure-button button-success" v-on:click="load">
        Load
    </button>
`,
    methods: {
        load: function(e) {
            const ipc = require('electron').ipcRenderer;
            ipc.send('loadChannel', null);
            ipc.on('loadChannel-reply', async function (event, content) {
                let data = JSON.parse(content);
                localStorage.setItem('filePath', data.filePath);
                for (let key of Object.keys(data.data)) {
                        data.data[key].forEach(element => {
                            idb.createEntry(key, element);
                    });
                };
            });
        },
    }
});