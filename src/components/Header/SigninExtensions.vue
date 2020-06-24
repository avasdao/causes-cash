<template>
    <main>
        <!-- <div class="instructions">
            <h3>INSTRUCTIONS</h3>

            ...
        </div> -->

        <div class="coming-soon">
            Badger and MetaMask integration is coming soon
            <br />Thank you for your patience and support
        </div>
    </main>
</template>

<script>
/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            //
        }
    },
    methods: {
        async signIn() {
            // alert('This feature is currently unavailable.')
            // const web3 = new Web3(window.ethereum)
            // const address = await web3.eth.getCoinbase()
            // web3.eth.sign('0x74657374206d657373616765', address)
            //     .then(console.log)

            // var hash = web3.utils.sha3('hi there!')
            // web3.eth.personal.sign(hash, address)
            //     .then(console.log)
            // web3.eth.personal.sign('hi there!', address)
            //     .then(console.log)

            // const message = 'hi there!'
            // const prefixed = web3.utils.keccak256("\x19Ethereum Signed Message:\n" + message.length + message)
            // console.log('PREFIXED', prefixed)

            // web3.eth.sign(
            //     message,
            //     address,
            //     (err, res) => {
            //         console.log('SIGN ERROR', err)
            //         console.log('SIGN RESULT', res)
            //     }
            // )
                // .then(console.log)

            // const account = await window.web3.eth.getCoinbase()
            // console.log('ACCOUNT', account)
            //
            // let mySig = null
            //
            // const result = await window.web3.eth.sign('test message', account)
            //     .then(sig => {
            //         console.log('SIGNATURE', sig)
            //     })
            // // const result = await window.web3.eth.sign('0x74657374206d657373616765', account)
            // console.log('SIGNING RESULT', result)
        },
    },
    created: function () {
        // const web3 = new Web3(window.ethereum)
        // web3.eth.getAccounts().then(console.log)
        // const test = Buffer.from('686920746865726521', 'hex')
        // console.log('DECODED', test.toString('utf8'))
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
