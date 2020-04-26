/* Import core modules. */
const debug = require('debug')('causes')
// const IPFS = require('ipfs')
const IPFSClient = require('ipfs-http-client')
const OrbitDB = require('orbit-db')
const uuid = require('uuid').v4

/**
 * Causes Host (Class)
 */
class NitoExchangeHost {
    constructor() {
        console.log('\n\tWelcome to Causes Host') // eslint-disable-line no-console
        console.log('\n\tInitializing, please wait...\n') // eslint-disable-line no-console

        /* Initialize communications. */
        this.initComms()
    }

    /**
     * Initialize Communications
     */
    initComms() {
        debug('Start initialization...')

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
        // this.node = IPFSClient('localhost', '5001')
        this.node = IPFSClient('/ip4/127.0.0.1/tcp/5001')
        // this.node = new IPFS({
        //     repo,
        //     relay,
        //     EXPERIMENTAL,
        // })

        /* Handle error. */
        // this.node.on('error', (e) => { throw e })

        // this.node.on('ready', async () => {
        const run = async () => {
            /* Initialize OrbitDB. */
            await this.initOrbitDB()

            /* Initialize private database. */
            await this.initPrivateDb()

            /* Emit onready. */
            if (this.onready) this.onready()
        }

        run()

    }

    /**
     * Initialize OrbitDB
     *
     * This is the primary instance of OrbitDB, that will be utilized by
     * each of our individual Orbit databases.
     */
    async initOrbitDB() {
        /* Initialize OrbitDB instance. */
        this.orbitdb = await OrbitDB
            .createInstance(this.node)
            .catch(err => {
                console.error(err) // eslint-disable-line no-console
            })

        return
    }

    /**
     * Initialize Private Database
     *
     * This database is ONLY writeable by authorized nodes and hosts.
     */
    async initPrivateDb() {
        /* Initialize options. */
        const options = {
            // Give write access to ourselves
            accessController: {
              // write: [this.orbitdb.identity.id],
              // write: [this.orbitdb.identity.publicKey],
              write: ['*'],
            }
          }

        /* Initialize private (key-value) database. */
        this.privateDb = await this.orbitdb
            .keyvalue('nito.exchange.cloud', options)
            .catch(err => {
                console.error(err) // eslint-disable-line no-console
            })

        /* Handle database (when ready). */
        this.privateDb.events.on('ready', (_dbname, _heads) => {
            debug('Database is ready')
            debug('-----------------')
            debug('\tName:', _dbname)
            debug('\tHeads:', _heads)
        })

        /* Handle loading progress. */
        this.privateDb.events.on('load.progress', (_address, _hash, _entry, _progress, _total) => {
            debug('Loading progress')
            debug('----------------')
            debug('\tAddress:', _address)
            debug('\tHash:', _hash)
            debug('\tEntry:', _entry)
            debug('\tProgress:', _progress)
            debug('\tTotal:', _total)
        })

        /* Handle replication progress. */
        this.privateDb.events.on('replicate.progress', (_address, _hash, _entry, _progress, _have) => {
            debug('Replication progress')
            debug('--------------------')
            debug('\tAddress:', _address)
            debug('\tHash:', _hash)
            debug('\tEntry:', _entry)
            debug('\tProgress:', _progress)
            debug('\tHave:', _have)
        })

        /* Handle replicated (data). */
        this.privateDb.events.on('replicated', (_address) => {
            debug('Replication has occured', _address)

            /* Collect replicated data. */
            // const data = this.privateDb
            //     .iterator({ limit: -1 })
            //     .collect()
            //     .map(e => e.payload.value)
            // // debug('Replicated data', data.join('\n'))
            // debug('Replicated data', data)
        })

        return
    }

    /**
     * Diagnostics
     */
    async diagnostics() {
        debug('Starting diagnostics...')

        /* Set private address. */
        const privateAddress = this.privateDb.address
        debug('Private address (object)', privateAddress)
        debug('Private address (string)', privateAddress.toString())

        /* Set identity. */
        const identity = this.privateDb.identity
        debug('Identity', identity.toJSON())

        /* Load database. */
        await this.privateDb.load()
        debug('Private database is ready!')

        /* Run tests. */
        this.runTests()

    }

    /**
     * Run Tests
     */
    async runTests() {
        debug('Running database tests...\n')

        /* Set test value. */
        const testVal = uuid()
        debug(`\tCreated a UUID test value [ ${testVal} ]`)

        await this.privateDb
            .put('testVal', testVal)
            .catch(err => {
                console.error(err) // eslint-disable-line no-console
            })
        debug('\tWrote `testVal` to database')

        /* Reading `testVal`. */
        const checkVal = this.privateDb.get('testVal')
        debug(`\tRead UUID test value [ ${checkVal} ] from database`)

        /* Validate test result. */
        if (checkVal === testVal) {
            debug('\tTest PASSED!')
        } else {
            debug('\tTest FAILED!')
            throw new Error('Cannot write to OrbitDB.')
        }

    }

    /**
     * Write To Database
     */
    async writeToDb(_key, _value) {
        /* Set pinning flag. */
        const pin = true

        await this.privateDb
            .put(_key, _value, { pin })
            .catch(err => {
                console.error(err) // eslint-disable-line no-console
            })

    }

}

/* Export module. */
module.exports = NitoExchangeHost
