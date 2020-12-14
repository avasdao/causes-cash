/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Get Header Photo
 */
const getHeaderPhoto = (state) => {
    /* Validate state. */
    if (!state || !state.headerPhoto) {
        return null
    }

    /* Set header photo. */
    const headerPhoto = msgpack.decode(Buffer.from(state.headerPhoto, 'hex'))

    /* Return header photo. */
    return headerPhoto
}

/* Export module. */
export default getHeaderPhoto
