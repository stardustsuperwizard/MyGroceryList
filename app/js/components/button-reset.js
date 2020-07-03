const componentButtonReset = Vue.component('c-button-reset', {
    template: `
    <button class="pure-button button-error" v-on:click="clear">
        Reset
    </button>

`,
    methods: {
        clear: function(e) {
            const ipc = require('electron').ipcRenderer
            localStorage.clear()
            // let groceryListCategories = ["Bakery","Cleaning","Deli","Frozen","Grocery","Home and Office","Hygiene","Meat and Seafood","Paper Products","Pets","Pharmacy","Produce"]
            // localStorage.setItem('categories', JSON.stringify(groceryListCategories))
            // localStorage.setItem('filePath', filePath)
            // console.log(JSON.stringify(data))
            ipc.send('clearChannel', null)
            // ipc.on('clearChannel-reply', (event, content) => {
            //     localStorage.setItem('filePath', content)
            // })
            this.$emit('reset', 'None')
        }
    }
})