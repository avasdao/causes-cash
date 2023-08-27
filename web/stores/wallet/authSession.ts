/* Import modules. */
import { Wallet } from '@nexajs/wallet'

export default function () {
    console.log('WALLET', this.wallet)

    console.log('ADDRESS', this.address)
    console.log('PUBLIC KEY', this.wallet.publicKey)

}
