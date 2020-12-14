/**
 * Get API Provider
 *
 * Returns the target url for the API endpoint used for platform data.
 */
const getApiProvider = () => {
    /* Return url endpoint. */
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:6767/v1'
    } else {
        return 'https://api.causes.cash/v1'
    }
}

/* Export module. */
export default getApiProvider
