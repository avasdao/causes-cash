/* Import modules. */
import { binToHex, hexToBin, instantiateSha256 } from '@bitauth/libauth' // TODO Replace with NexaJS.
import { entropyToMnemonic } from '@nexajs/hdnode'
import { defineStore } from 'pinia'
import { randomBytes } from '@ethersproject/random' // TODO Replace with NexaJS.

/* Set constants. */
const ENTROPY_BYTES_LENGTH = 32

/**
 * Profile Store
 */
export const useProfileStore = defineStore('profile', {
    state: () => ({
        /* Initialize session. */
        _session: null,

        /* Initialize entropy (used for HD wallet). */
        // NOTE: This is a cryptographically-secure "random" 32-byte (256-bit) value. */
        _entropy: null,

        /**
         * Email
         *
         * This is a valid email address.
         */
        _email: null,

        /**
         * Master Seed
         *
         * A 32-byte seed, which can be generated randomly, or by importing
         * from an existing wallet.
         */
        _masterSeed: null,

        /**
         * Metadata
         *
         * Used to store (user-defined) data for:
         *     1. Individual accounts
         *     2. Individual unspent transaction outputs (UXTOs)
         *
         * NOTE: Metadata MUST be used sparingly, to avoid data storage bloat;
         *       and should be deleted when no longer needed.
         *
         * TODO: Allow this data to be stored on-chain using:
         *       1. Bitcoin Files Protocol (BFP) (https://bitcoinfiles.com/)
         *       2. Telr Locker (https://locker.telr.io)
         */
        _meta: null,

        /**
         * Nickname
         *
         * This is a public alias.
         *
         * NOTE: Only alpha-numeric characters are accepted.
         *       Both upper and lower-case characters are accepted.
         */
        _nickname: null,
    }),

    getters: {
        session(_state) {
            return _state._session
        },

        sessionid(_state) {
            return _state._session?.id
        },

        challenge(_state) {
            return _state._session?.challenge
        },

        mnemonic(_state) {
            if (!_state._entropy) return null

            return entropyToMnemonic(_state._entropy)
        },

    },

    actions: {
        async createWallet() {
            /* Return random bytes (as hex string). */
            const myBytes = binToHex(randomBytes(ENTROPY_BYTES_LENGTH))
            console.log('CREATE WALLET (myBytes):', myBytes)

            const svrBytes = await $fetch('/api/entropy')
                .catch(err => console.error(err))
            console.log('SERVER BYTES', svrBytes)

            /* Create 32-bytes (256-bit) entropy.*/
            const entropy = myBytes.slice(0, 32) + svrBytes.slice(-32)
            console.log('FINAL ENTROPY', entropy)

            const sha256 = await instantiateSha256()
            const hashed = sha256.hash(hexToBin(entropy))
            console.log('HASHED ENTROPY', binToHex(hashed))

            /* Set entropy. */
            // NOTE: Serialize to a 16-byte (128-bit) Hex String.
            // NOTE: We use 16-bytes to remain compatible with popular HD wallets.
            this._entropy = binToHex(hashed).slice(0, 16) + binToHex(hashed).slice(-16)
        },

        deleteSession() {
            /* Set session. */
            this._setSession(null)
        },

        saveSession(_session) {
            console.log('PROFILE SAVING SESSION', _session)
            /* Set session. */
            this._setSession(_session)
        },

        /**
         * Set Session
         *
         * @param {Object} _session Save session details.
         */
        _setSession (_session) {
            /* Set session. */
            this._session = _session
            console.log('SET SESSION', this._session)
        },
    },
    persist: true,
})
