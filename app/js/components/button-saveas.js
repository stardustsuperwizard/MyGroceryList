const componentButtonSaveAs = Vue.component('c-button-saveas', {
    template: `
    <button class="pure-button button-success" v-on:click="save()">
        Save as
    </button>
`,
    methods: {
        save: async function(e) {
            const ipc = require('electron').ipcRenderer;

            let data = {'data': {}};
            let tables = await idb.getTables();
            for (let [key, value] of Object.entries(tables)) {
                data.data[value] = await idb.readTable(value);
            };

            ipc.send('saveAsChannel', JSON.stringify(data));
            ipc.on('saveChannel-reply', (event, content) => {
                localStorage.setItem('filePath', content);
                this.$emit('filepath', content);
            });
        }
    }
});