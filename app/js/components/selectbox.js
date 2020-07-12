const componentSelect = Vue.component('c-select-box', {
    template: `
    <span>
        <select v-model="selected">
            <option v-if="placeholder" selected disabled hidden value="">{{ placeholder }}</option>
            <option v-else selected disabled hidden value="">Macro</option>
            <option v-for="element in elements">{{ element }}</option>
        </select>
    </span>
    `,
    props: {
        elements: Array,
        id: String,
        placeholder: String
    },
    data: function() {
        return {
            selected: ''
        }
    },
    watch: {
        selected: function() {
            this.$emit('selected', this.selected);
        }
    }
});
