const componentMenu = Vue.component('c-menu', {
    template: `
<div>
    <div class="pure-menu">
        <ul class="pure-menu-list">
            <li class="pure-menu-item">
                <c-link href="/list">List</c-link>
            </li>

            <li class="pure-menu-item">
                <c-link href="/map">Map</c-link>
            </li>
        </ul>
    </div>
</div>
    `,
    computed: {
        isActive() {
            return this.href === this.$root.currentRoute
        }
    }
});

// figure out how to do this dynamically:
// <li class="pure-menu-item menu-item-divided pure-menu-selected">