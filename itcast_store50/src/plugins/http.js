// 引入axios插件
import axios from 'axios';

const myhttp = {};

myhttp.install = function(Vue) {
    Vue.prototype.$http = axios;
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
}

export default myhttp;