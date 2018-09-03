import Vue from 'vue';
import Router from 'vue-router';

import login from '@/views/login.vue';

import home from '@/views/home.vue';
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
    routes: [
        { name: 'home', path: '/', component: home },
        { name: 'login', path: '/login', component: login }
    ]
});