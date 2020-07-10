import Vue from 'vue';
import ElementUI from "element-ui"
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import { SOCKET_URL, API_URL } from './config/api';

console.clear();


const socket = io("http://localhost:8000");

console.log(socket)
Vue.use(VueSocketIOExt, socket);


Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: (h: Function) => h(App),
}).$mount('#app');
