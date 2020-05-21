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
            ipc.on('loadChannel-reply', (event, content) => {
                let data = JSON.parse(content)
                localStorage.clear()
                for (let key of Object.keys(data)) {
                    localStorage.setItem(key, JSON.stringify(data[key]))
                }
                let filePath = localStorage.getItem('filePath')
                this.$emit('load', filePath)
            })
        },
    }
}) 