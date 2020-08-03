/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Nickname
 *
 * This is the user's registered/authorized nickname.
 */
const setNickname = (state, _nickname) => {
    /* Set nickname. */
    state.nickname = msgpack.encode(_nickname).toString('hex')
}

/* Export module. */
export default setNickname
