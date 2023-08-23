export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    defaultLocale: 'en',
    lazy: true,
    langDir: './locales',
    // messages: {
    //     en: {
    //         welcome: 'Welcome',
    //     },
    //     fr: {
    //         welcome: 'Bienvenue',
    //     },
    //     tr: {
    //         welcome: 'Hoş geldin',
    //     },
    //     zh: {
    //         welcome: '欢迎',
    //     },
    // },
    locales: [
        {
            code: 'en',
            file: 'en.json',
        },
        {
            code: 'en-US',
            file: 'en.json',
        },
        {
            code: 'fr',
            file: 'fr.json',
        },
        {
            code: 'tr',
            file: 'tr.json',
        },
        {
            code: 'zh',
            file: 'zh.json',
        },
        {
            code: 'zh-CN',
            file: 'zh.json',
        },
    ]
}))
