/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Nickname
 *
 * This is the user's registered/authorized nickname.
 */
const setNickname = (state, _nickname) => {
    /* Set nickname. */
    state.nickname = msgpack.encode(_nickname)
}

/* Export module. */
export default setNickname
