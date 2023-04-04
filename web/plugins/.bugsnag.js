// import Vue from 'vue'
// import bugsnag from '@bugsnag/js'
// import bugsnagVue from '@bugsnag/plugin-vue'

// const bugsnagClient = bugsnag({
//     apiKey: 'd39061a66f55dc1d347054fe31fbf6de',
//     notifyReleaseStages: [ 'production' ]
// })

// bugsnagClient.use(bugsnagVue(Vue))

// import Bugsnag from '@bugsnag/js'
// import BugsnagPluginVue from '@bugsnag/plugin-vue'

// Bugsnag.start({
//     apiKey: 'd39061a66f55dc1d347054fe31fbf6de',
//     plugins: [new BugsnagPluginVue()]
// })

// import Vue from 'vue'
// import bugsnag from '@bugsnag/js'
// import bugsnagVue from '@bugsnag/plugin-vue'

// const bugsnagClient = bugsnag({
//     apiKey: 'd39061a66f55dc1d347054fe31fbf6de',
// })

// bugsnagClient.use(bugsnagVue, Vue)

import Vue from 'vue'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

const bugsnagClient = Bugsnag.start({
    apiKey: 'd39061a66f55dc1d347054fe31fbf6de',
    // apiKey: process.env.BUGSNAG_KEY,
    plugins: [new BugsnagPluginVue()], // this is important
})

Vue.use(bugsnagClient) // // this is also important

export default (ctx, inject) => {
    inject('bugsnag', bugsnagClient)
}
