/* Import modules. */
import { binToHex } from '@bitauth/libauth' // TODO Replace with NexaJS.
import { randomBytes } from '@ethersproject/random' // TODO Replace with NexaJS.

/* Set constants. */
const ENTROPY_BYTES_LENGTH = 32

export default defineEventHandler((event) => {
    /* Return random bytes (as hex string). */
    return binToHex(randomBytes(ENTROPY_BYTES_LENGTH))
})
