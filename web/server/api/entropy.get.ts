/* Import modules. */
import { randomBytes } from '@nexajs/crypto'

/* Set constants. */
const ENTROPY_BYTES_LENGTH = 32

export default defineEventHandler((event) => {
    /* Return random bytes. */
    // NOTE: This MUST ONLY be used as "part" of a key generation process.
    return randomBytes(ENTROPY_BYTES_LENGTH)
})
