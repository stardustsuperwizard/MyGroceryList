const componentCategories = Vue.component('c-categories', {
    template: `
    <div class="content">
        <div class="pure-g">
            <div class="pure-u-1-1">
                <p>Add Item</p>
                <form class="pure-form" action="input">
                    <input v-model="categoryName" type="text" placeholder="Category" name="food_type" id="food_type">
                    <input v-on:click.prevent="addCategory" class="pure-button pure-button-primary" type="submit" value="Add">
                </form>
            </div>
        </div>
        <div class="pure-g">
            <div class="pure-u-1-1">
                <p>Items List</p>
                <table class="pure-table pure-table-bordered">
                    <tbody>
                        <tr v-for="(item, index) in categoryList">
                            <td>{{ item.name }}</td>
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
            categoryName: null,
            categoryList: [],
        }
    },
    mounted: function() {
        this.loadItemsFromStorage()
        // this.categoryList.sort()
    },
    methods: {
        addCategory: function () {
            let id = Date.now()
            if (this.categoryName !== null) {
                this.categoryList.push({name: this.categoryName, id: id})
                idb.createEntry('GroceryCategories', {name: this.categoryName, id: id})
            } else {
                alert("Invalid entry.")
            }
        },
        removeItem: function (index, item) {
            if (localStorage.getItem('categories') === null) {
                this.categoryList = []
            } else {
                this.categoryList.splice(index, 1)
            }
            idb.deleteEntry('GroceryCategories', item.id)
        },
        loadItemsFromStorage: async function() {
            let table = await idb.readTable('GroceryCategories')
            if (table.length === 0) {
                this.categoryList = []
            } else {
                this.categoryList = table
            }
        }
    }
});