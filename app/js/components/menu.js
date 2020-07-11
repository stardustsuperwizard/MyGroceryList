const componentMenu = Vue.component('c-menu', {
    template: `
    <div>
        <!--<div id="titlebar"></div>-->
        <div class="pure-menu">
            <ul class="pure-menu-list">

                <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/options')}">
                    <router-link to="/options" class="pure-menu-link">Options</router-link>
                </li>


                <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/categories')}">
                    <router-link to="/categories" class="pure-menu-link">Categories</router-link>
                </li>

                <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/food')}">
                    <router-link to="/food" class="pure-menu-link">Favorite Foods</router-link>
                </li>

                <li v-bind:class="{'pure-menu-item':true, 'pure-menu-selected': ($root.currentRoute === '/list')}">
                    <router-link to="/list" class="pure-menu-link">Grocery List</router-link>
                </li>

            </ul>
        </div>
    </div>
    `,
});