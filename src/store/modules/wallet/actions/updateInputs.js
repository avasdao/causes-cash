/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Update Inputs
 */
const updateInputs = ({ commit, getters }, _params) => {
    console.info('Updating inputs...', _params)

    /* Set wallet. */
    const wallet = _params.wallet
    console.log('WALLET', wallet)

    /* Set (input) action. */
    const inputAction = _params.action
    console.log('INPUT ACTION', inputAction)

    /* Set (input) address. */
    const inputAddress = _params.address
    console.log('INPUT ADDRESS', inputAddress)

    /* Retreive accounts. */
    const accounts = getters.getAccounts
    console.log('ALL ACCOUNTS', accounts)

    /* Retrieve wallet accounts. */
    const walletAccounts = getters.getAccountsByWallet(wallet)
    console.log('WALLET ACCOUNTS', walletAccounts)

    /* Filter "active" accounts. */
    Object.keys(walletAccounts).forEach(index => {
        if (walletAccounts[index].s === 'a') {
            // FIXME
            const change = 0

            /* Set (derivation) path. */
            const path = `${getters.getDerivationPath('BCH')}/${change}/${index}`
            console.log('ACTIVE ACCOUNT (path)', path)

            /* Initialize HD node. */
            const hdNode = getters.getHDNode

            /* Initialize child node. */
            const childNode = hdNode.derivePath(path)

            /* Set (active) address. */
            const activeAddress = bitbox.HDNode.toCashAddress(childNode)
            console.log('ACTIVE ACCOUNT (address)', activeAddress)

            /* Validate (matching) input address. */
            if (inputAddress === activeAddress) {
                /* Handle input update. */
                switch(inputAction) {
                case 'add':
                    // FIXME: Support handling of multiple UTXOs per account.
                    walletAccounts[index].u[0] = {
                        s: 'a',
                    }
                    break
                }
            }

        }
    })

    /* Update accounts. */
    accounts[wallet] = walletAccounts

    /* Commit updated accounts. */
    commit('setAccounts', accounts)
}

/* Export module. */
export default updateInputs
