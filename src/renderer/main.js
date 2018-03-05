import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://api.woshuone.com';
Vue.http = Vue.prototype.$http = axios

Vue.use(ElementUI);

Vue.prototype.$toast = function(txt, type = 'success') {
    this.$notify({
        message: txt,
        type: type
    });
}

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')
