/* Import core modules. */
import IPFS from 'ipfs'

// FIXME: Move this to state.ipfs
let node = null

/**
* Get IPFS
*/
const getIPFS = async () => {
    console.log('GET IPFS!!!')
    /* Validate node. */
    if (node) {
        console.log('Already connected to IPFS...') // eslint-disable-line no-console
        return node
    } else {
        console.log('Connecting to IPFS...') // eslint-disable-line no-console

        /* Initialize repository location. */
        // const repo = './ipfs'

        /* Initialize relay settings. */
        // const relay = {
        //     enabled: true,
        //     hop: {
        //         enabled: true,
        //         active: true
        //     }
        // }

        /* Initialize experiemental settings. */
        // TODO: Find out if this is still necessary for v0.40.
        // const EXPERIMENTAL = {
        //     pubsub: true
        // }

        /* Initialize node. */
        // this.node = await IPFS.create({
        //     // repo,
        //     relay,
        //     EXPERIMENTAL,
        // })
        node = await IPFS.create() // eslint-disable-line require-atomic-updates
        // FIXME: https://eslint.org/docs/rules/require-atomic-updates
        console.log('GET IPFS (node)', node)

        return node
    }
}

/* Export module. */
export default getIPFS
