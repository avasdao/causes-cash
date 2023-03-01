/**
 * Reclaim Pledge
 *
 * Allows a contributor to reclaim their pledged funds.
 *
 * NOTE: This is ONLY available after the campaign has expired.
 */
const reclaim = async () => {
    console.log('RECLAIM PLEDGE');

    /* Validate Web3 provider. */
    if (!window.ethereum) {
        /* Send notification request. */
        this.$store.dispatch('showNotif', {
            icon: 'error',
            title: 'MetaMask Error!',
            message: `No Web3 provider found!`,
        })

        return
    }

    /* Connect to Web3 provider. */
    await window.ethereum
        .enable()
        .catch(err => console.error(err))

    /* Validate embedded Web3 objects. */
    if (!window.ethereum && !window.bitcoin) {
        /* Validate embedded ethereum object. */
        if (window.bitcoin) {
            console.info('Found Bitcoin provider.')
        } else if (window.ethereum) {
            console.info('Found Ethereum provider.')
        } else {
            return console.error('No Web3 provider found.')
        }
    }

    /* Initialize provider. */
    const provider = new ethers
        .providers
        .Web3Provider(window.ethereum, 'any')

    /* Prompt user for account connections. */
    // await provider
    //     .send('eth_requestAccounts', [])
    //     .catch(err => console.error(err))

    /* Set signer. */
    const signer = provider.getSigner()

    /* Request account. */
    // this.account = await signer
    //     .getAddress()
    //     .catch(err => console.error(err))
    // console.log('Account:', this.account)

    /* Set Campaign ABI. */
    const cAbi = this.$store.getters.getCampaignAbi

    // FOR DEVELOPMENT PURPOSES ONLY
    // The first campaign contract is hardcoded.
    const cAddr = this.$store.getters.getCampaignAddr

    /* Initialize campaign instance. */
    const campaign = new ethers.Contract(cAddr, cAbi, signer)
    // console.log('CONTRACT (campaign):', campaign)

    /* Set gas price. */
    // NOTE: Current minimum is 1.05 gWei (1,050,000,000)
    const gasPrice = BigInt(1050000000)

    /* Reclaim pledge. */
    await campaign
        .reclaim({ gasPrice })
        .catch(err => console.error(err))
}

/* Export module. */
module.exports = reclaim
