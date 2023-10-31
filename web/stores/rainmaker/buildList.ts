import fetch from 'node-fetch'
import PouchDB from 'pouchdb'

import { encodeAddress } from '@nexajs/address'

import { OP } from '@nexajs/script'

import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'

import { Wallet } from '@nexajs/wallet'

/* Libauth helpers. */
import {
    encodeDataPush,
    instantiateRipemd160,
    instantiateSecp256k1,
} from '@bitauth/libauth'

/* Set (test) constants. */
const BASE_PAYOUT_SATOSHIS = 100000000n
const DUST_LIMIT = 546n

let ripemd160
let secp256k1

;(async () => {
    /* Instantiate Libauth crypto interfaces. */
    ripemd160 = await instantiateRipemd160()
    secp256k1 = await instantiateSecp256k1()
})()

/* Initialize databases. */
const payoutsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/payouts`)

const getAddress = (_scriptPubKey) => {
    let nexaAddress
    let scriptPubKey

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(_scriptPubKey),
    ])
    // console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    nexaAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        encodeDataPush(scriptPubKey),
    )
    // console.info('\n  Nexa address:', nexaAddress)

    return nexaAddress
}

export default async () => {
    /* Initialize locals. */
    let collated
    let output
    let outputs
    let overage
    let qualified
    let receivers
    let response
    let scripts

    /* Set Nexa GraphQL endpoint. */
    const ENDPOINT = 'https://nexa.sh/graphql'

    const query = `
    {
      script(first: 1000) {
        edges {
          node {
            txidem
            vout {
              scriptPubKey {
                hex
                type
                scriptHash
                argsHash
                group
                groupQuantity
              }
            }
          }
        }
      }
    }
    `

    /* Make query request. */
    response = await fetch(ENDPOINT,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
        .catch(err => console.error(err))

    /* Parse JSON. */
    response = await response.json()
    // return console.log('RESPONSE (edges):', response.data.script.edges)

    /* Handle outputs. */
    outputs = response.data.script.edges.map(_edge => {
        return _edge.node.vout
    })
    // return console.log('OUTPUTS', outputs);

    // TODO RUN QUERY BY (SCRIPTHASH + GROUPID)

    /* Initialize scripts. */
    scripts = []

    /* Handle scripts. */
    for (let i = 0; i < outputs.length; i++) {
        output = outputs[i]

        for (let j = 0; j < output.length; j++) {
            scripts.push(output[j].scriptPubKey)
        }
    }
    // return console.error('SCRIPTS', scripts, scripts.length)

    qualified = scripts.filter(_script => {
        return (_script?.scriptHash?.toLowerCase() === '103012fb192c7dc29fab0bf1126dfca42106a574') &&
            (_script?.hex.slice(-6) === 'c71340') &&
            (_script?.group === 'nexa:tptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x')
    })
    // return console.log('QUALIFIED', qualified, qualified.length)

    const totalShare = qualified.reduce(
        (total, _qualified) => (total + BigInt(_qualified.groupQuantity)), BigInt(0)
    )

    receivers = qualified.map(_qualified => {
        const argsHash = _qualified.argsHash
        const address = getAddress(hexToBin(_qualified.argsHash))
        const groupQuantity = _qualified.groupQuantity
        const pct = (_qualified.groupQuantity / Number(totalShare))
        const pctBI = BigInt(parseInt(pct * 1e8))
        const satoshis = (BASE_PAYOUT_SATOSHIS * pctBI) / BigInt(1e8)

        return {
            argsHash,
            address,
            groupQuantity,
            totalShare: totalShare.toString(),
            pct: (pct * 100), // for display purposes
            satoshis: satoshis.toString(),
        }
    })
    // return console.log('RECEIVERS-1', receivers, receivers.length)

    /* Initialize collation. */
    collated = {}

    /* Handle collation. */
    // NOTE: Group addresses into "total" amount to send.
    receivers.forEach(_receiver => {
        if (!collated[_receiver.address]) {
            collated[_receiver.address] = BigInt(_receiver.satoshis)
        } else {
            collated[_receiver.address] = BigInt(_receiver.satoshis) + collated[_receiver.address]
        }
    })

    /* Reset receivers. */
    receivers = []

    overage = BigInt(0)

    Object.keys(collated).forEach(_address => {
        const pct = 0.08
        const pctBI = BigInt(parseInt(pct * 1e8))
        const satoshis = (BASE_PAYOUT_SATOSHIS * pctBI) / BigInt(1e8)

        if (collated[_address] > satoshis) {
            overage += (collated[_address] - satoshis)

            receivers.push({
                address: _address,
                satoshis,
            })
        } else {
            receivers.push({
                address: _address,
                satoshis: collated[_address],
            })
        }
    })

    console.log('TOTAL RECEIVERS-1', BigInt(receivers.length));

    console.log('OVERAGE', overage);

    let overageShare = overage / BigInt(receivers.length)
    console.log('OVERAGE SHARE', overageShare);

    // TODO ADD OVERAGES TO ALL ADDRESSES
    receivers.forEach(_receiver => {
        _receiver.satoshis += overageShare
    })

    /* Filter out receivers with dust. */
    // NOTE: This could be a very large number, so we don't necessarily want to
    //       keep track of NULLs.
    receivers = receivers.filter(_receiver => {
        return _receiver.satoshis > BigInt(DUST_LIMIT)
    })

    console.log('TOTAL RECEIVERS-2', BigInt(receivers.length));

    // NOTE: Map to String from BigInt for JSON support.
    receivers = receivers.map(_receiver => {
        return {
            ..._receiver,
            satoshis: _receiver.satoshis.toString(),
        }
    })

    console.log('RECEIVERS', JSON.stringify(receivers, null, 2), receivers.length, 'of', qualified.length)
}
