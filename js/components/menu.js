const componentMenu = Vue.component('c-menu', {
    template: `
    <div class="pure-menu">
        <ul class="pure-menu-list">

            <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/options')}">
                <c-link href="/options">Options</c-link>
            </li>

            <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/categories')}">
                <c-link href="/categories">Categories</c-link>
            </li>

            <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/food')}">
                <c-link href="/food">Favorite Foods</c-link>
            </li>

            <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/list')}">
                <c-link href="/list">Grocery List</c-link>
            </li>

        </ul>
    </div>
    `,
});