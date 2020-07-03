const componentButtonReset = Vue.component('c-button-reset', {
    template: `
    <button class="pure-button button-error" v-on:click="clear">
        Reset
    </button>

`,
    methods: {
        clear: function(e) {
            localStorage.clear()
            this.$emit('reset', 'None')
        }
    }
})