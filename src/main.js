import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import vuetify from './plugins/vuetify'

/* Start Bugsnag. */
Bugsnag.start({
    apiKey: 'b4769a75bb09dd366e419ff17a64b384',
    plugins: [new BugsnagPluginVue()]
})

/* Install VUE error handler. */
Bugsnag.getPlugin('vue')
    .installVueErrorHandler(Vue)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
