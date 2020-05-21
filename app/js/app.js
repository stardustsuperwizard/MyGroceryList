const App = Vue.component('App', {
    template: `
<div id="app">
    <div id="layout">
        <div id="menu">
            <c-menu></c-menu>
        </div>

        <div id="main">
            <router-view></router-view>
        </div>
    </div>
</div>
    `,
})