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
                            <td><button v-on:click.prevent="removeItem(index, item)" class="pure-button button-error button-xsmall">Remove</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            foodList: [],
            foodListCategories: {},
            groceryCategory: null,
            groceryItem: null,
            groceryList: [],
            groceryListCategories: [],
        }
    },
    mounted: function() {
        this.loadItemsFromStorage()
    },
    watch: {
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
            let id = Date.now()
            if (this.groceryItem !== null && this.category !== null) {
                this.groceryList.push({id: id, groceryItem: this.groceryItem, groceryCategory: this.groceryCategory})
                idb.createEntry('GroceryHistory', {id: id, groceryItem: this.groceryItem, groceryCategory: this.groceryCategory})
            } else {
                alert("Invalid entry.")
            }
        },
        removeItem: function (index, item) {
            this.groceryList.splice(index, 1)
            idb.deleteEntry('GroceryHistory', item.id)
        },
        loadItemsFromStorage: async function() {
            idb.readTable('GroceryHistory')
                .then((table) => {
                    if (table.length > 0) {
                        this.groceryList = table
                    }
                })

            idb.readTable('FavoriteFoods')
                .then((table) => {
                    if (table.length > 0) {
                        table.forEach((element) => {
                            this.foodList.push(element.groceryItem)
                            this.foodListCategories[ element.groceryItem ] = element.groceryCategory
                        })
                    }
                })

            idb.readTable('GroceryCategories')
                .then((table) => {
                    if (table.length > 0) {
                        table.forEach((element) => {
                            this.groceryListCategories.push(element.name)
                        })
                    }
                })
        }
    }
});