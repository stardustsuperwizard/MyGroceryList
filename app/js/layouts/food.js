const componentFood = Vue.component('c-food', {
    template: `
    <div class="content">
        <div class="pure-g">
            <div class="pure-u-1-1">
                <p>Add Item</p>
                <form class="pure-form" action="input">
                    <input @keypress.enter.prevent v-model="groceryItem" type="text" placeholder="Food" name="food_name" id="food_name">
                    <c-input-box @keypress.enter.native.prevent v-bind:elements="groceryListCategories" v-bind:id="('foods')" v-bind:placeholder="('Category')" v-model="groceryCategory"></c-input-box>
                    <c-select-box @keypress.enter.native.prevent v-bind:id="('macros')" v-bind:placeholder="('Macro')" v-bind:elements="macroList" v-on:selected="getMarco"></c-select-box>
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
                            <td>{{ item.macroName }}</td>
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
            groceryCategory: null,
            groceryItem: null,
            groceryList: [],
            groceryListCategories: [],
            macroName: null,
            macroList: ["Protein", "Fat", "Carbs", "Vegtables"]
        }
    },
    mounted: function() {
        this.loadItemsFromStorage();
    },
    methods: {
        addItem: function () {
            let id = Date.now();
            if (this.groceryItem !== null && this.groceryCategory !== null) {
                if (this.groceryListCategories.includes(this.groceryCategory)) {
                    this.groceryList.push({id: id, groceryItem: this.groceryItem, groceryCategory: this.groceryCategory, macroName: this.macroName});
                    idb.createEntry('FavoriteFoods', {id: id, groceryItem: this.groceryItem, groceryCategory: this.groceryCategory, macroName: this.macroName});
                } else {
                    alert("Category not found. Please add it.");
                }
            } else {
                alert("Invalid entry.");
            }
        },
        getMarco: function(event) {
            this.macroName = event;
        },
        removeItem: function (index, item) {
            this.groceryList.splice(index, 1);
            idb.deleteEntry('FavoriteFoods', item.id);
        },
        loadItemsFromStorage: async function() {
            idb.readTable('FavoriteFoods')
                .then((table) => {
                    if (table.length > 0) {
                        this.groceryList = table;
                    }
                });

            idb.readTable('GroceryCategories')
                .then((table) => {
                    if (table.length > 0) {
                        table.forEach(element => {
                            this.groceryListCategories.push(element.name);
                        });
                    }
                    this.groceryListCategories.sort();
                });
        },
    }
});