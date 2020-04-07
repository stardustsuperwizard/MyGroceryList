const componentOptions = Vue.component('c-options', {
    template: `
<div>
<c-prime>
    <div class="content">
        <div class="pure-g">
            <div class="pure-u-1-1">
                <p>Loaded File: {{ filePath }}</p>
            </div>
        </div>
        <div class="pure-g">
            <div class="pure-u-1-1">
                <p><c-button-saveas></c-button-saveas> <c-button-save></c-button-save> <c-button-load v-on:load="changeFilePath"></c-button-load> <c-button-print></c-button-print> <c-button-reset v-on:reset="changeFilePath"></c-button-reset></p>
            </div>
        </div>
    </div>
</c-prime>
</div>
    `,
    data: function() {
        return {
            filePath: localStorage.getItem('filePath') || 'None',
        }
    },
    methods: {
        changeFilePath: function(e) {
            this.filePath = e
        }
    }
});