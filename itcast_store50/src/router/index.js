import Vue from 'vue';
import Router from 'vue-router';

import login from '@/views/login.vue';

import home from '@/views/home.vue';
// import HelloWorld from '@/components/HelloWorld'
import users from '@/views/users/list.vue';
import Rights from '@/views/rights/Rights';
import Roles from '@/views/rights/Roles';
Vue.use(Router);

export default new Router({
    routes: [{
            name: 'home',
            path: '/home',
            component: home,
            children: [{
                name: 'users',
                path: '/users',
                component: users
            }, {
                name: 'rights',
                path: '/rights',
                component: Rights
            }, {
                name: 'roles',
                path: '/roles',
                component: Roles
            }]
        },
        { name: 'login', path: '/login', component: login },
        { name: 'home', path: '/', component: home }
    ]
});