import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';

const login = () =>
    import('@/views/login.vue');
const home = () =>
    import('@/views/home.vue');
const users = () =>
    import('@/views/users/list.vue');
const Rights = () =>
    import('@/views/rights/Rights.vue');
const Roles = () =>
    import('@/views/rights/Roles.vue');
const Categories = () =>
    import('@/views/goods/Categories.vue');
const goods = () =>
    import('@/views/goods/goods.vue');
const goodsadd = () =>
    import('@/views/goods/goodsadd.vue');
const params = () =>
    import('@/views/goods/params');
const order = () =>
    import('@/views/order/order.vue');
const reports = () =>
    import('@/views/reports/reports.vue');
Vue.use(Router);

const router = new Router({
  routes: [{
    name: 'home',
    path: '/',
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
    }, {
      name: 'categories',
      path: '/categories',
      component: Categories
    }, {
      name: 'goods',
      path: '/goods',
      component: goods
    }, {
      name: 'goodsadd',
      path: '/goods/add',
      component: goodsadd
    }, {
      name: 'params',
      path: '/params',
      component: params
    }, {
      name: 'order',
      path: '/orders',
      component: order
    }, {
      name: 'reports',
      path: '/reports',
      component: reports
    }]
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
      router.push('/login');
      Message.warning('请先登录');
    }
  }
});
export default router;
