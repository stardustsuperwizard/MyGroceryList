const componentFood = Vue.component('c-food', {
    template: `
<div>
<c-prime>
    <div class="content">
        <div class="pure-g">
            <div class="pure-u-1-1">
                <p>Loaded File: {{ filePath || 'None' }}</p>
            </div>
        </div>
        <div class="pure-g">
            <div class="pure-u-1-1">
                <p>Add Item</p>
                <form class="pure-form" action="input">
                    <input @keypress.enter.prevent v-model="groceryItem" type="text" placeholder="Food" name="food_name" id="food_name">
                    <c-input-box @keypress.enter.native.prevent v-bind:elements="groceryListCategories" v-bind:id="('foods')" v-bind:placeholder="('Category')" v-model="groceryCategory"></c-input-box>
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
</c-prime>
</div>
    `,
    data: function() {
        return {
            filePath: null,
            groceryCategory: null,
            groceryId: 1,
            groceryItem: null,
            groceryList: [],
            groceryListCategories: [],
        }
    },
    mounted: function() {
        this.loadItemsFromStorage()
    },
    watch: {
        groceryList: {
            handler() {
                localStorage.setItem('food', JSON.stringify(this.groceryList))
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
            if (localStorage.getItem('food')) {
                this.filePath = localStorage.getItem('filePath')
                this.groceryList = JSON.parse(localStorage.getItem('food'))
                this.groceryListCategories = JSON.parse(localStorage.getItem('categories'))
            }
        },
    }
});