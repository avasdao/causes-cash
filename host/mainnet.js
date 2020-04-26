/**
 * Causes (MAINNET) Host
 * ---------------------
 *
 * Operates as one of many hosting nodes; that supports the storage
 * and redundancy of the Causes databases:
 *     1. CouchDB
 *     2. OrbitDB
 *
 * These two databases operate in conjunction to provide the centralized
 * management of the otherwise decentralized network.
 */

/* Import core modules. */
// const debug = require('debug')('causes:main')

/* Import local modules. */
const Causes = require('./libs/Causes')

/* Initialize Causes Host. */
const causes = new Causes()

/* Handle databases (when ready). */
causes.onready = async () => {
    /* Start diagnostics. */
    causes.diagnostics()
}
