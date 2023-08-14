export default defineEventHandler((event) => {
    /* Set daily active users (DAU). */
    // FIXME FOR DEV PURPOSES ONLY
    const dau = 888

    // FIXME FOR DEV PURPOSES ONLY
    const heroes = {
        last_24h: 1337,
        last_30d: 30000,
        total: 1000000,
    }

    /* Return statistics. */
    return heroes
})
