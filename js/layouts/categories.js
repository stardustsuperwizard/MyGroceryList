const componentCategories = Vue.component('c-categories', {
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
                <h3>Options</h3>
                <p>Loaded File: {{ filePath || 'None' }}</p>
            </div>
        </div>
        <div class="pure-g">
            <div class="pure-u-1-1">
                <h3>Add Item</h3>
                <form class="pure-form" action="input">
                    Category: <input v-model="categoryName" type="text" placeholder="Produce" name="food_type" id="food_type">
                    <input v-on:click.prevent="addCategory" class="pure-button pure-button-primary" type="submit" value="Add">
                </form>
            </div>
        </div>
        <div class="pure-g">
            <div class="pure-u-1-1">
                <h3>Items List</h3>
                <table class="pure-table pure-table-bordered">
                    <tbody>
                        <tr v-for="(item, index) in categoryList">
                            <td>{{ item }}</td>
                            <td><button v-on:click.prevent="removeItem(index, item)" class="pure-button button-error button-xsmall">Remove</button></td>
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
            categoryName: null,
            categoryList: [],
            filePath: localStorage.getItem('filePath') || null,
            message: "Category List",
            message2: "powered by Vue.js (and magic)"
        }
    },
    mounted: function() {
        this.loadItemsFromStorage()
        this.categoryList.sort()
    },
    methods: {
        addCategory: function () {
            if (this.categoryName !== null) {
                this.categoryList.push(this.categoryName)
                this.categoryList.sort()
                // this.$emit('addCategory', this.categoryName)
            } else {
                alert("Invalid entry.")
            }
            localStorage.setItem('categories', JSON.stringify(this.categoryList))
        },
        removeItem: function (index, categoryName) {
            if (localStorage.getItem('categories') === null) {
                this.categoryList = []
            } else {
                this.categoryList.splice(index, 1)
                // this.$emit('delCategory', categoryName)
            }
            localStorage.setItem('categories', JSON.stringify(this.categoryList))
        },
        loadItemsFromStorage: function() {
            if (localStorage.getItem('categories') === null) {
                this.categoryList = []
            } else {
                this.categoryList = JSON.parse(localStorage.getItem('categories'))
            }
        }
    }
});