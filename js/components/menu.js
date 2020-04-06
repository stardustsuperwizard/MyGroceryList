const componentMenu = Vue.component('c-menu', {
    template: `
    <div class="pure-menu">
        <ul class="pure-menu-list">

            <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/categories')}">
                <c-link href="/categories">Categories</c-link>
            </li>

            <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/food')}">
                <c-link href="/food">Food</c-link>
            </li>

            <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/list')}">
                <c-link href="/list">List</c-link>
            </li>

            <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/map')}">
                <c-link href="/map">Map</c-link>
            </li>

        </ul>
    </div>
    `,
});