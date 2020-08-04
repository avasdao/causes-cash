/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Accounts
 */
const setAccounts = (state, _accounts) => {
    /* Set accounts. */
    state.accounts = msgpack.encode(_accounts).toString('hex')
}

/* Export module. */
export default setAccounts
