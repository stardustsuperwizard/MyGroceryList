const componentButtonLoad = Vue.component('c-button-load', {
    template: `
    <button class="pure-button button-success" v-on:click="load">
        Load
    </button>
`,
    methods: {
        load: function(e) {
            const ipc = require('electron').ipcRenderer
            // ipc.send('printChannel', localStorage.items)
            ipc.send('loadChannel', null)
            ipc.on('loadChannel-reply', async function (event, content) {
                let data = JSON.parse(content)
                for (let key of Object.keys(data)) {
                    if (key === 'filePath') {
                        localStorage.setItem('filePath', JSON.stringify(data.filePath))
                    } else {
                        data[key].forEach(element => {
                            idb.createEntry(key, element)
                        });
                    }
                }
            })
            let filePath = localStorage.getItem('filePath')
            this.$emit('load', filePath)
        },
    }
}) 