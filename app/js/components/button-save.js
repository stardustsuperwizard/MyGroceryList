const componentButtonSave = Vue.component('c-button-save', {
    template: `
    <button class="pure-button button-success" v-on:click="save()">
        Save
    </button>
`,
    methods: {
        save: function(e) {
            // console.log(e)
            const ipc = require('electron').ipcRenderer
            let data = {};
            for (let key of Object.keys(localStorage)) {
                // console.log(localStorage.getItem(key))
                if (key != 'filePath') {
                    data[key] = JSON.parse(localStorage.getItem(key))
                } else {
                    data[key] = localStorage.getItem(key)
                }
            }
            // console.log(JSON.stringify(data))
            ipc.send('saveChannel', JSON.stringify(data))
            ipc.on('saveChannel-reply', (event, content) => {
                localStorage.setItem('filePath', content)
            })
        }
    }
}) 