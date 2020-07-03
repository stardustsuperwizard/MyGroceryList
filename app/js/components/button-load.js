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
            ipc.on('loadChannel-reply', (event, content) => {
                let data = JSON.parse(content);
                this.$emit('filepath', data.filePath);
                localStorage.setItem('filePath', data.filePath);
                this.loadData(data.data);
            });
        },
        loadData: async function (data) {
            for (let key of Object.keys(data)) {
                idb.clearTable(key);
                data[key].forEach(element => {
                    idb.createEntry(key, element);
                });
            };
        }
    },
});