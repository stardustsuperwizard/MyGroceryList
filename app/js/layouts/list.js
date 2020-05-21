const componentList = Vue.component('c-list', {
    template: `
    <div class="content">
        <div class="pure-g">
            <div class="pure-u-1-1">
                <p>Add Item</p>
                <form class="pure-form" action="input">
                    <c-input-box @keypress.enter.native.prevent v-bind:id="('foods')" v-bind:placeholder="('Food')" v-bind:elements="foodList" v-model="groceryItem"></c-input-box>
                    <c-input-box @keypress.enter.native.prevent v-bind:id="('categories')" v-bind:placeholder="('Category')" v-bind:value="groceryCategory" v-bind:elements="groceryListCategories" v-model="groceryCategory"></c-input-box>
                    <input v-on:click.prevent="addItem" class="pure-button pure-button-primary" type="submit" value="Add">
                </form>
            </div>
        </div>
        <div class="pure-g">
            <div class="pure-u-1-1">
                <p>Items List</p>
                <table class="pure-table pure-table-bordered">
                    <tbody>
                        <tr v-for="(item, index) in groceryList">
                            <td>{{ item.groceryItem }}</td>
                            <td>{{ item.groceryCategory }}</td>
                            <td><button v-on:click.prevent="removeItem(index)" class="pure-button button-error button-xsmall">Remove</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            filePath: null,
            foodList: [],
            foodListCategories: {},
            groceryCategory: null,
            groceryId: 1,
            groceryItem: null,
            groceryList: [],
            groceryListCategories: [],
        }
    },
    computed: {

    },
    mounted: function() {
        this.loadItemsFromStorage()
    },
    watch: {
        groceryList: {
            handler() {
                localStorage.setItem('items', JSON.stringify(this.groceryList))
            }
        },
        groceryItem: {
            handler() {
                if (this.foodListCategories.hasOwnProperty(this.groceryItem)) {
                    this.groceryCategory = this.foodListCategories[this.groceryItem]
                }
            }
        }
    },
    methods: {
        addItem: function () {
            if (this.groceryItem !== null && this.category !== null) {
                let tempId = this.groceryList.length + 1
                this.groceryList.forEach((element, index) => {
                    if (element.id === tempId) {
                        tempId++
                    }
                })
                this.groceryList.push({id: tempId, groceryItem: this.groceryItem, groceryCategory: this.groceryCategory})
            } else {
                alert("Invalid entry.")
            }
        },
        removeItem: function (index) {
            this.groceryList.splice(index, 1)
        },
        loadItemsFromStorage: function() {
            if (localStorage.getItem('items')) {
                this.filePath = localStorage.getItem('filePath')
                this.groceryList = JSON.parse(localStorage.getItem('items'))
                this.groceryListCategories = JSON.parse(localStorage.getItem('categories'))
            }
            if (localStorage.getItem('food')) {
                JSON.parse(localStorage.getItem('food')).forEach((element) => {
                    this.foodList.push(element.groceryItem)
                    this.foodListCategories[ element.groceryItem ] = element.groceryCategory
                })
            }
        }
    }
});