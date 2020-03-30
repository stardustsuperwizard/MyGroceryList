let app = new Vue({
    el: '#app',
    data: {
        currentRoute: '/'
    },
    computed: {
        ViewComponent () {
            return routes[this.currentRoute] || NotFound
            // return routes[this.currentRoute] || Home
        }
    },
    render (h) { return h(this.ViewComponent) }
})