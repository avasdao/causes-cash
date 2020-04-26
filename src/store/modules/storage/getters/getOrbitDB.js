/* Import core modules. */
import OrbitDB from 'orbit-db'

/**
 * Initialize OrbitDB handler.
 */
let orbitdb = null

/**
* Get OrbitDB.
*/
const getOrbitDB = async (state, getters) => {
    /* Validate OrbitDB. */
    if (orbitdb) {
        return console.log('Already connected to IPFS...') // eslint-disable-line no-console
    } else {
        console.log('Connection to OrbitDB...') // eslint-disable-line no-console

        /* Retrieve IPFS node. */
        const node = await getters.getIPFS

        /* Initialize orbitdb. */
        // FIXME: https://eslint.org/docs/rules/require-atomic-updates
        orbitdb = await OrbitDB // eslint-disable-line require-atomic-updates
            .createInstance(node)
            .catch(err => {
                console.error(err) // eslint-disable-line no-console
            })

        console.log(`
            OrbitDB Info
        ----------------------------------------
            - publicKey: ${orbitdb.identity.publicKey}
        `)

        console.log('Starting OrbitDB (read/write) test...')

        /* Set db address. */
        // const dbAddress = '/orbitdb/zdpuAm7icRPGfrvT2Yp5piVD32hPnuoRpKESW5xEwcTQAVGcc/nito.exchange.cloud' // write-protected
        const dbAddress = '/orbitdb/zdpuAx7CgG3kDnCQmfqDi8tM4ApZtWT81bH3uYGsGfeFewFqp/nito.exchange.cloud' // public

        /* Initialize private (key-value) database. */
        const necDb = await orbitdb
            .keyvalue(dbAddress)
            .catch(err => {
                console.error(err) // eslint-disable-line no-console
            })

        /* Validate database connection. */
        if (necDb) {
            /* Load database. */
            console.log('Loading database...')
            await necDb
                .load()
                .catch(err => {
                    console.error(err) // eslint-disable-line no-console
                })

            /* Reading `testVal`. */
            const testVal = necDb.get('testVal')
            console.log(`\tRead [ ${testVal} ] from NEC database`)


            /* Set test value. */
            // const writeVal = 'hi-there'
            // console.log(`\tCreated a UUID test value [ ${writeVal} ]`)

            // await necDb
            //     .put('testVal', writeVal)
            //     .catch(err => {
            //         console.error(err) // eslint-disable-line no-console
            //     })
            // console.log('\tWrote `testVal` to database')

        } else {
            throw new Error(`Cannot connect to [ ${dbAddress} ]`)
        }

        return orbitdb
    }
}

/* Export module. */
export default getOrbitDB
