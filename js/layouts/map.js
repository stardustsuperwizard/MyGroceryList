const componentMap = Vue.component('c-map', {
    template: `
<div>
<c-prime>
    <div class="header">
        <h1>{{ message }}</h1>
        <h2>{{ message2 }}</h2>
    </div>
    <div class="content">
        <div class="pure-g">
            <div class="pure-u-1">
                <p>If map is correct then click: <button class="pure-button" v-on:click="printList()">Print</button></p>
            </div>
        </div>
        <div class="pure-g" id="entireList">
            <div v-for="element in groceryCategoryList">
                <div class="pure-u-1 pure-md-u-1-3">
                    <div class="l-box">
                        <h3>{{ element }}</h3>
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