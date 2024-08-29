/* Import modules. */
import moment from 'moment'
import { signMessageHashSchnorr } from '@nexajs/crypto'
import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'

export default async function () {
    // console.log('ADDRESS', this.address)
    // console.log('PUBLIC KEY', this.wallet.publicKey)
    // console.log('SESSION', Profile.session)

    /* Initialize profile. */
    const Profile = useProfileStore()

    /* Initialize locals. */
    let messageHash
    let timestamp
    let response
    let signature
    let unitSeparator

    /* Set unit separator. */
    unitSeparator = '1f'

    /* Set (timestamp) timestamp.*/
    timestamp = moment().unix()

    /* Convert timestamp to hex. */
    timestamp = timestamp.toString(16)

    // NOTE: Format is <timestamp> <0x1F> <challenge>
    // NOTE: We use 0x1F as the default "unit separator".
    messageHash = hexToBin(`${timestamp}${unitSeparator}${Profile.challenge}`)

    /* Generate a signature over the "sighash" using the passed private key. */
    signature = signMessageHashSchnorr(this.wallet.privateKey, messageHash)

    /* Make authorization request. */
    response = await $fetch('/api/auth', {
        method: 'POST',
        body: {
            sessionid: Profile.sessionid,
            publicKey: binToHex(this.wallet.publicKey),
            signature: binToHex(signature),
            timestamp,
        },
    })
    // console.log('AUTH SESSIONS (response):', response)
}
