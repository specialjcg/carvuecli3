import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from 'bootstrap-vue'
var VueTouch = require('vue-touch')



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(VueTouch);
Vue.use(BootstrapVue)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
