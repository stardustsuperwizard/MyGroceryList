const componentPrime = Vue.component('c-prime', {
    template: `
<div id="layout">
    <!-- Menu toggle -->
    <a href="#menu" id="menuLink" class="menu-link">
        <!-- Hamburger icon -->
        <span></span>
    </a>

    <div id="menu">
        <c-menu></c-menu>
    </div>

    <div id="main">
        <slot></slot>
    </div>
</div>
    `,
})