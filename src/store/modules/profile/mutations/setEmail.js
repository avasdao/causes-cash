/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Email Address
 *
 * This is the user's registered/authorized email address.
 */
const setEmail = (state, _email) => {
    /* Set email. */
    state.email = msgpack.encode(_email).toString('hex')
}

/* Export module. */
export default setEmail
