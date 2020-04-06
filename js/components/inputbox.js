const componentInput = Vue.component('c-input-box', {
    template: `
    <span>
        <input v-bind:list="id" v-bind:value="value" v-on:input="$emit('input', $event.target.value)"></input>
        <datalist v-bind:id="id">
            <option v-for="element in elements">{{ element }}</option>
        </datalist>
    </span>
    `,
    props: {
        elements: Array,
        id: String,
        value: String
    }
})
