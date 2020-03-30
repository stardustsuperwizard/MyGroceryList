const componentLink = Vue.component('c-link', {
    template: `
<a
    v-bind:href="href"
    v-on:click="go"
    class="pure-menu-link"
>
    <slot></slot>
</a>
`,
    methods: {
        go (event) {
            event.preventDefault()
            this.$root.currentRoute = this.href
        }
    },
    props: {
        href: {
            type: String,
            required: true
        }
    }
}) 