import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';
import login from '@/views/login.vue';

import home from '@/views/home.vue';
// import HelloWorld from '@/components/HelloWorld'
import users from '@/views/users/list.vue';
import Rights from '@/views/rights/Rights.vue';
import Roles from '@/views/rights/Roles.vue';
import Categories from '@/views/goods/Categories.vue';
import goods from '@/views/goods/goods.vue';
Vue.use(Router);

const router = new Router({
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
    },
    {
      name: 'Categories',
      path: '/categories',
      component: Categories
    }, {
      name: 'goods',
      path: '/goods',
      component: goods
    }
    ]
  },
  { name: 'login', path: '/login', component: login }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next();
  } else {
    const token = sessionStorage.getItem('token');
    if (token) {
      next();
    } else {
      // router.push('/login');
      Message.warning('请先登录');
    }
  }
});
export default router;
