const componentList = Vue.component('c-list', {
    template: `
<div>
<c-prime>
    <div class="header">
        <h1>{{ message }}</h1>
        <h2>{{ message2 }}</h2>
    </div>
    <div class="content">
        <div class="pure-g">
            <div class="pure-u-1-1">
                <h3>Add Item</h3>
                <form class="pure-form" action="input">
                    Food: <input v-model="groceryItem" type="text" placeholder="Apples" name="food_name" id="food_name">
                    Category: <select v-model="groceryCategory">
                        <option v-for="each in groceryListCategories">{{ each }}</option>
                    </select>
                    <input v-on:click.prevent="addItem" class="pure-button" type="submit" value="Add">
                </form>
            </div>
        </div>
        <div class="pure-g">
            <div class="pure-u-1-1">
                <h3>Items List</h3>
                <table class="pure-table pure-table-bordered">
                    <tbody>
                        <tr v-for="(item, index) in groceryList">
                            <td>{{ item.groceryItem }}</td>
                            <td>{{ item.groceryCategory }}</td>
                            <td><button v-on:click.prevent="removeItem(index)" class="pure-button">Remove</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</c-prime>
</div>
    `,
    data: function() {
        return {
            groceryCategory: null,
            groceryId: 1,
            groceryItem: null,
            groceryList: [],
            groceryListCategories: [],
            message: "Grocery List",
            message2: "powered by Vue.js (and magic)"
        }
    },
    mounted: function() {
        this.loadItemsFromStorage()
    },
    watch: {
        groceryList: {
            handler() {
                localStorage.setItem('items', JSON.stringify(this.groceryList))
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
                this.groceryList = JSON.parse(localStorage.getItem('items'))
                this.groceryListCategories = JSON.parse(localStorage.getItem('categories'))
            }
        }
    }
});