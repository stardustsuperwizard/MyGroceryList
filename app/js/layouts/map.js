const componentMap = Vue.component('c-map', {
    template: `
<div>
<c-prime>
    <div class="content">
        <div class="pure-g">
            <div class="pure-u-1 pure-md-u-1-3">
                <p>Options<br>Loaded File: {{ filePath || 'None' }}</p>
                <p><button class="pure-button pure-button-primary" v-on:click="printList()">Print</button></p>
            </div>
        </div>
        <div class="pure-g">
            <div class="pure-u-1 pure-md-u-1-3">
                <p>Groceries</p>
            </div>
        </div>
        <div class="pure-g" id="entireList">
            <div v-for="element in groceryCategoryList">
                <div class="pure-u-1 pure-md-u-1-3">
                    <div class="l-box">
                        <p>{{ element }}</p>
                        <ul>
                            <li v-for="item in filterGroceries(element)">{{ item.groceryItem }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</c-prime>
</div>
    `,
    data: function() {
        return {
            filePath: localStorage.getItem('filePath') || null,
            groceryList: [],
            grocerySet: new Set(),
            groceryCategoryList: null,
            message: "Grocery Map",
            message2: "powered by Vue.js (and magic)"
        }
    },
    mounted: function() {
        this.loadItemsFromStorage()
    },
    methods: {
        loadItemsFromStorage: function() {
            if (localStorage.getItem('items') === null) {
                this.groceryList = []
            } else {
                this.groceryList = JSON.parse(localStorage.getItem('items'))
            }
            this.groceryList.forEach((element) => {
                this.grocerySet.add(element.groceryCategory)
            })
            this.groceryCategoryList = Array.from(this.grocerySet)
        },
        filterGroceries: function(category) {
            return this.groceryList.filter(element => {
                if (element.groceryCategory === category) {
                    return element
                }
            })
        },
        printList: function(e) {
            const ipc = require('electron').ipcRenderer
            // ipc.send('printChannel', localStorage.items)
            ipc.send('printChannel', null)
        }
    }
});