/* Import modules. */
import { getAddressHistory } from 'nexajs'

/**
 * Get Address History
 *
 * NOTE: We separate Rostrum calls due to communications issues
 *       with long-lived connections.
 */
export default async (_address) => {
    return await getAddressHistory(_address)
        .catch(err => console.error(err))
}
