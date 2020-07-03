const componentButtonSave = Vue.component('c-button-save', {
    template: `
    <button class="pure-button button-success" v-on:click="save()">
        Save
    </button>
`,
    methods: {
        save: async function(e) {
            // console.log(e)
            const ipc = require('electron').ipcRenderer;
            let data = {
                filePath: localStorage.getItem('filePath')
            };
            let tables = await idb.getTables();
            for (let [key, value] of Object.entries(tables)) {
                data[value] = await idb.readTable(value);
            };
            // console.log(JSON.stringify(data))
            ipc.send('saveChannel', JSON.stringify(data))
            ipc.on('saveChannel-reply', (event, content) => {
                localStorage.setItem('filePath', content);
            });
            let filePath = localStorage.getItem('filePath');
            this.$emit('filepath', filePath);
        }
    }
}) 