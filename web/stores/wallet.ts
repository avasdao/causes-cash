/* Import modules. */
import { defineStore } from 'pinia'

import { mnemonicToEntropy } from '@nexajs/hdnode'

import { Wallet } from '@nexajs/wallet'

import _authSession from './profile/authSession.ts'
import _broadcast from './wallet/broadcast.ts'
import _setEntropy from './wallet/setEntropy.ts'

/**
 * Wallet Store
 */
export const useWalletStore = defineStore('wallet', {
    state: () => ({
        _assets: null,
        _entropy: null,
        _wallet: null,
    }),

    getters: {
        /* Return (abbreviated) wallet status. */
        abbr(_state) {
            if (!_state._wallet) {
                return null
            }

            return _state._wallet.abbr
        },

        /* Return wallet status. */
        address(_state) {
            if (!_state._wallet) {
                return null
            }

            return _state._wallet.address
        },

        asset(_state) {
            if (!this.assets || !this.wallet) {
                return null
            }

            return this.assets[this.wallet.assetid]
        },

        assets(_state) {
            if (_state._assets) {
                return _state._assets
            }

            if (!_state._wallet) {
                return null
            }

            return _state._wallet.assets
        },

        /* Return wallet status. */
        isLoading(_state) {
            if (!_state._wallet) {
                return true
            }

            return _state._wallet.isLoading
        },

        /* Return wallet status. */
        isReady(_state) {
            if (!_state._wallet) {
                return false
            }

            if (_state._wallet._entropy) {
                return true
            }

            return _state._wallet.isReady
        },

        /* Return NexaJS wallet instance. */
        wallet(_state) {
            return _state._wallet
        },

        WalletStatus() {
            return WalletStatus
        },
    },

    actions: {
        /**
         * Initialize
         *
         * Setup the wallet store.
         *   1. Retrieve the saved entropy.
         *   2. Initialize a Wallet instance.
         *   3. Load assets.
         */
        async init() {
            console.info('Initializing wallet...')

            if (this._entropy === null) {
                this._wallet = 'NEW' // FIXME TEMP NEW WALLET FLAG
                // throw new Error('Missing wallet entropy.')
                return console.error('Missing wallet entropy.')
            }

            /* Request a wallet instance (by mnemonic). */
            this._wallet = await Wallet.init(this._entropy, true)
            // console.log('(Initialized) wallet', this._wallet)

            /* Set (default) asset. */
            this._wallet.setAsset('0')

            /* Authorize session. */
            _authSession.bind(this)()

            /* Handle balance updates. */
            this.wallet.on('balances', async (_assets) => {
                console.log('Wallet Balances (onChanges):', _assets)

                /* Close asset locally. */
// FIXME Read ASSETS directly from library (getter).
                this._assets = { ..._assets }
            })
        },

        createWallet(_entropy) {
            /* Validate entropy. */
            // NOTE: Expect HEX value to be 32 or 64 characters.
            if (_entropy.length !== 32 && _entropy.length !== 64) {
                console.error(_entropy, 'is NOT valid entropy.')

                _entropy = null
            }

            /* Set entropy. */
            _setEntropy.bind(this)(_entropy)

            /* Initialize wallet. */
            this.init()
        },

        async transfer(_receiver, _satoshis) {
            /* Validate transaction type. */
            if (this.asset.group === '0') {
                /* Send coins. */
                return await this.wallet.send(_receiver, _satoshis)
            } else {
                /* Send tokens. */
                return await this.wallet.send(this.asset.token_id_hex, _receiver, _satoshis)
            }
        },

        broadcast(_receivers) {
            /* Broadcast to receivers. */
            return _broadcast.bind(this)(_receivers)
        },

        /**
         * Select Asset
         *
         * Sets the active asset displayed on the UI.
         */
        selectAsset(_assetid) {
            this._assetid = _assetid
        },

        setEntropy(_entropy) {
            this._entropy = _entropy
        },

        setMnemonic(_mnemonic) {
            let entropy
            let error

            try {
                /* Derive entropy. */
                entropy = mnemonicToEntropy(_mnemonic)
            } catch (err) {
                /* Set error message. */
                error = err.message
            }

            /* Validate error. */
            if (error) {
                return error
            }

            /* Set entropy. */
            this._entropy = entropy

            /* Create wallet. */
            this.createWallet(entropy)

            /* Return entropy. */
            return this.wallet
        },

        destroy() {
            /* Reset wallet. */
            this._entropy = null
            this._wallet = null
            // this._wif = null
            this._coins = null
            this._tokens = null

            console.info('Wallet destroyed successfully!')
        },
    },
})
