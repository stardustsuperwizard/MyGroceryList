const componentButtonPrint = Vue.component('c-button-print', {
    template: `
    <button class="pure-button button-secondary" v-on:click="print">
        Print
    </button>
`,
    methods: {
        print: async function(e) {
            const ipc = require('electron').ipcRenderer
            let groceryList = await idb.readTable('GroceryHistory')
            localStorage.setItem('items', JSON.stringify(groceryList))
            ipc.send('printChannel', null)
        }
    }
})