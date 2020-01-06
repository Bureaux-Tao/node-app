import Vue from "vue";
import router from "./router";
import store from "./store";
import axios from "../http";

Vue.config.productionTip = false;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";

Vue.use(ElementUI);
Vue.prototype.$axios=axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
