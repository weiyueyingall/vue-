// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import ElementUI from 'element-ui';
import '@/assets/css/index.css';
import 'element-ui/lib/theme-chalk/index.css';

import http from '@/plugins/http.js';

Vue.use(http);
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});