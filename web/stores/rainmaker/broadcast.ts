/* Import modules. */
import { sha256 } from '@nexajs/crypto'
import { encodePrivateKeyWif } from '@nexajs/hdnode'

import { encodeAddress } from '@nexajs/address'

import { sha256 } from '@nexajs/crypto'

import {
    getCoins,
    sendCoins,
} from '@nexajs/purse'

import {
    encodeNullData,
    OP,
} from '@nexajs/script'

import {
    getTokens,
    sendToken,
} from '@nexajs/token'

/* Libauth helpers. */
import {
    encodeDataPush,
    instantiateRipemd160,
} from '@bitauth/libauth'

export default async function () {
    /* Initialize locals. */
    let body
    let coins
    let nexaAddress
    let nullData
    let publicKey
    let publicKeyHash
    let receivers
    let response
    let scriptPubKey
    let scriptPushPubKey
    let tokens
    let txResult
    let userData
    let wif


}
