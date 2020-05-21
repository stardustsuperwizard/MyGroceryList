const componentButtonPrint = Vue.component('c-button-print', {
    template: `
    <button class="pure-button button-secondary" v-on:click="print">
        Print
    </button>
`,
    methods: {
        print: function(e) {
            const ipc = require('electron').ipcRenderer
            // ipc.send('printChannel', localStorage.items)
            ipc.send('printChannel', null)
        }
    }
})