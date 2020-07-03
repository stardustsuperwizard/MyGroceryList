const componentButtonSaveAs = Vue.component('c-button-saveas', {
    template: `
    <button class="pure-button button-success" v-on:click="save()">
        Save as
    </button>
`,
    methods: {
        save: async function(e) {
            // console.log(e)
            const ipc = require('electron').ipcRenderer
            let data = {};
            let tables = await idb.getTables()
            for (let [key, value] of Object.entries(tables)) {
                data[value] = await idb.readTable(value)
            }

            ipc.send('saveAsChannel', JSON.stringify(data))
            ipc.on('saveChannel-reply', (event, content) => {
                localStorage.setItem('filePath', content)
            })
            let filePath = localStorage.getItem('filePath')
            this.$emit('filepath', filePath)
        }
    }
}) 