const utils = {}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            utils,
        }
    }
})
