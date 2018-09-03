import Vue from 'vue';
import Router from 'vue-router';

import login from '@/views/login.vue';
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
    routes: [
        { name: 'home', path: '/', redirect: '/login' },
        { name: 'login', path: '/login', component: login }
    ]
});