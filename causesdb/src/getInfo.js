/* Import modules. */
import { getGenesisInfo } from 'nexajs'

/**
 * Get Genesis Info
 *
 * NOTE: We separate Rostrum calls due to communications issues
 *       with long-lived connections.
 */
export default async (_tokenid) => {
    return await getGenesisInfo(_tokenid)
        .catch(err => console.error(err))
}
