<script setup>
/* Import modules. */
import { ref } from 'vue'
import { ethers } from 'ethers'

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()


</script>

<template>
    <main class="p-3">
        <div class="mt-5">
            <div class="hidden mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
                <svg class="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
            </div>

            <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-3xl leading-6 font-medium text-gray-900" id="modal-title">
                    WITHDRAW
                </h3>

                <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        When you're ready to withdraw funds from your Causes wallet, just enter the destination and click 'SEND'.
                    </p>
                </div>

                <video :class="showVideoPreview" id="video-display" autoplay playsinline />

                <div class="mt-5 relative rounded-md shadow-sm">
                    <input
                        v-model="destination"
                        type="text"
                        name="destination"
                        id="destination"
                        placeholder="Enter a NEXA account / address"
                        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 text-lg border-gray-300 rounded-md"
                        aria-describedby="destination"
                    />

                    <div @click="openScanner" class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                        <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clip-rule="evenodd"></path><path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z"></path></svg>
                    </div>
                </div>

                <div class="mt-3 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <img v-if="System.currency === 'SBCH' || System.currency === null" class="w-5 h-5" :src="require('../../../assets/smart-bch-sbch-logo.png')" />
                        <img v-if="System.currency === 'BCH'" class="w-5 h-5" :src="require('../../../assets/bitcoin-cash-bch-logo.png')" />
                    </div>

                    <input
                        v-model="amount"
                        type="text"
                        name="amount"
                        id="amount"
                        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 text-lg border-gray-300 rounded-md"
                        placeholder="0.00"
                        aria-describedby="amount"
                    />

                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span v-if="System.currency === 'SBCH' || System.currency === null" class="text-gray-500 sm:text-sm" id="price-currency">SBCH</span>
                        <span v-if="System.currency === 'BCH'" class="text-gray-500 sm:text-sm" id="price-currency">BCH</span>
                    </div>
                </div>

                <button @click="widthdraw" class="mt-5 w-full p-3 text-2xl bg-blue-500 font-bold text-gray-100 rounded-lg">
                    Send BCH
                </button>

                <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                        @click="$store.dispatch('setCurrency', 'SBCH')"
                        type="button"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-gray-50 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                        NEXA (SBCH)
                    </button>

                    <button
                    @click="$store.dispatch('setCurrency', 'BCH')"
                        type="button"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-gray-50 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
                    >
                        Bitcoin Cash (BCH)
                    </button>
                </div>

            </div>
        </div>

    </main>
</template>

<script>
/* Import modules. */

import QrScanner from 'qr-scanner'
QrScanner.WORKER_PATH = './js/qr-scanner-worker.min.js'

// Import library to manage bitcoin cash data structures.
import {
    base58AddressToLockingBytecode,
    bigIntToBinUint64LE,
    binToHex,
    cashAddressToLockingBytecode,
    CashAddressType,
    createTransactionContextCommon,
    decodeBase58Address,
    decodeCashAddress,
    decodePrivateKeyWif,
    // encodeBase58Address,
    encodeDataPush,
    encodeCashAddress,
    encodePrivateKeyWif,
    encodeTransaction,
    flattenBinArray,
    generateSigningSerializationBCH,
    hexToBin,
    instantiateSha256,
    instantiateSecp256k1,
    instantiateRipemd160,
} from '@bitauth/libauth'

/* Import components. */
// import HelloWorld from '@/components/HelloWorld'

/* Set dust (amount) satoshis. */
// const DUST_SATOSHIS = 546

/* Initialize Hop.cash bridge address. */
// FIXME: FOR DEV PURPOSES ONLY
//       pokket.cash wallet
const BRIDGE_ADDRESS = 'bitcoincash:qq85q2wzehzr3syrsla3l6s3d5xdk4z0rvcaz9p36l'

/* Set up a text encoder. */
// NOTE: Needed for encoding binary to UTF8.
const textEncoder = new TextEncoder()


export default {
    props: {
        bchAddress: String,
        curTab: String,
        sBchAddress: String,
        web3Address: String,
    },
    components: {
        // HelloWorld
    },
    data: () => {
        return {
            currency: null,
            destination: null,
            amount: null,

            showVideoPreview: null,
            video: null,
            scanner: null,
            cameraError: false,
        }
    },
    watch: {
        curTab: function (_curTab) {
            // console.log('WITHDRAW (curTab) CHANGED', _curTab)

            /* Validate current tab. */
            if (_curTab && _curTab !== 'withdraw') {
                /* Clear receiver and scanner. */
                this.setReceiver(null)
            }
        },
    },
    methods: {
        openScanner() {
            /* Start scanner. */
            this.startScanner()
        },

        setReceiver(_result) {
            // console.log('SET DESTINATION', _result)

            /* Set destination. */
            this.destination = _result

            this.showVideoPreview = 'hidden'

            if (this.scanner) {
                this.scanner.destroy()
                this.scanner = null
            }

            /* Go to loan page. */
            // this.$router.push('/admin/loans/' + _result)
        },

        /**
         * Start Scanner
         *
         * NOTE: This DOES NOT work on any of the Android devices tested.
         *       However, it DOES work well on all iOS devices tested.
         */
        async startScanner () {
            if (this.scanner) {
                this.scanner.destroy()
                this.scanner = null

                this.showVideoPreview = 'hidden'

                return
            }

            try {
                navigator.getUserMedia =
                    navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia

                if (!navigator.mediaDevices.getUserMedia && !navigator.getUserMedia) {
                    this.cameraError = true
                } else {
                    /* Initialize video element. */
                    this.video = document.getElementById('video-display')

                    this.showVideoPreview = 'flex w-full mt-5 bg-gray-100 border-4 border-gray-300 p-2 rounded-xl z-10'

                    this.scanner = new QrScanner(this.video, (_data) => {
                        console.log('SCANNER DATA', _data)

                        // FIXME: Build a new link parser
                        const result = _data
                        // const result = parseLink(_data)

                        /* Validate (scanner) result. */
                        if (result) {
                            this.setReceiver(result)
                        }
                    })

                    /* Start scanner. */
                    await this.scanner.start()
                }
            } catch (err) {
                console.error(err) // eslint-disable-line no-console

                this.cameraError = true

                /* Bugsnag alert. */
                throw new Error(err)
            }
        },

        async widthdraw() {
            /* Set seed phrase. */
            const seed = this.$store?.state?.seed

            /* Instantiate Libauth crypto interfaces. */
            const secp256k1 = await instantiateSecp256k1()
            const sha256 = await instantiateSha256()
            const ripemd160 = await instantiateRipemd160()

            /* Generate signature hash and entropy. */
            const signatureHash = ethers.utils.id(seed)
            const signatureEntropy = ethers.BigNumber.from(signatureHash)

            /* Generate private key entropy using Hop Wallet Prime. */
            const privateKeyEntropy = signatureEntropy
                .mod(this.$store?.state?.HOP_WALLET_PRIME)

            /* Format the private key to binary. */
            // NOTE: Start at position 2 to omit the 0x prefix added by toHexString.
            const privateKey = hexToBin(
                privateKeyEntropy.toHexString().substring(2))
            // console.log('PRIVATE KEY', privateKey)

            // Derive the corresponding public key.
            const publicKey = secp256k1.derivePublicKeyCompressed(privateKey)

            /* Hash the public key hash according to the P2PKH scheme. */
            const publicKeyHash = ripemd160.hash(sha256.hash(publicKey))

            /* Encode the public key hash into a P2PKH cash address. */
            const cashAddress = encodeCashAddress(
                'bitcoincash', CashAddressType.P2PKH, publicKeyHash)
            // console.log('CASH ADDRESS', cashAddress)

            // Encode Private Key WIF.
            const privateKeyWIF = encodePrivateKeyWif(sha256, privateKey, 'mainnet')
            console.log('PRIVATE KEY (WIF):', privateKeyWIF)

            // Fetch all unspent transaction outputs for the temporary in-browser wallet.
            const unspentOutputs = await this.getUnspentOutputs(cashAddress)
            // console.log('UNSPENT OUTPUTS', unspentOutputs)

            // Create a bridge transaction without miner fee to determine the transaction size and therefor the miner fee.
            const transactionTemplate = await this.createCashBridgeTransaction(
                privateKeyWIF,
                unspentOutputs,
                BRIDGE_ADDRESS,
                this.sBchAddress, // TODO: Add support for Web3 (injected) wallet.
                0,
            )

            /* Set miner fee. */
            // NOTE: We used 1.1 (an extra 0.1) for added (fee) security.
            const minerFee = Math.floor(1.1 * transactionTemplate.byteLength)

            // If there's funds and it matches our expectation, forward it to the bridge.
            const bridgeTransaction = await this.createCashBridgeTransaction(
                privateKeyWIF,
                unspentOutputs,
                BRIDGE_ADDRESS,
                this.sBchAddress, // TODO: Add support for Web3 (injected) wallet.
                minerFee,
            )
            console.log('BRIDGE TRANSACTION', bridgeTransaction)
            console.log('BRIDGE TRANSACTION (hex)', binToHex(bridgeTransaction))

            // Broadcast transaction
            this.broadcast(binToHex(bridgeTransaction))
        },

        async broadcast(transaction) {
            const target = 'https://insomnia.fountainhead.cash/v1/tx/broadcast'
            /* Call remote API. */
            const response = await superagent
                .post(target)
                .set('Content-Type', 'text/plain')
                .send(transaction)
                .catch(err => {
                    console.error(err)
                    // TODO Handle error

                    /* Set error. */
                    // error = err
                })

            const body = response.body
            console.log('RESPONSE (body):', body)
        },

        async getUnspentOutputs(cashAddress) {
            const url = `https://insomnia.fountainhead.cash/v1/address/utxos/${cashAddress}`
            const response = await superagent
                .get(url)
                .catch(err => {
                    console.error(err)
                    // TODO Handle error

                    /* Set error. */
                    // error = err
                })

            const body = response.body
            console.log('RESPONSE (body):', body)

            const utxos = body.utxos
            console.log('RESPONSE (utxos):', utxos)

            return utxos
        },

        /**
         * Create a Cash Bridging Transaction.
         *
         * This is a transaction from the user's front end temporary Cash wallet to the backend receiving Cash wallet with an OP_RETURN to indicate the user's desired Smart Payout Address.
         *
         * Note that the user covers the fee for this transaction.
         *
         * @function
         *
         * @param privateKeyWIF    {string}                      Private Key in WIF format.
         * @param unspentOutputs   {AddressListUnspentResponse}  List of Unspent Outputs to use.
         * @param bridgeAddress    {string}                      Cash Receiving Address of Bridge.
         * @param payoutAddress    {string}                      Smart Address bridge should pay out to.
         * @param minerFeeSatoshis {number}                      The satoshis to pay as miner fee (deducted from value output).
         *
         * @returns {Uint8Array} The transaction binary.
         */
        async createCashBridgeTransaction(privateKeyWIF, unspentOutputs, bridgeAddress, payoutAddress, minerFeeSatoshis) {
            // Make sure the Bridge Address is a valid Cash Address.
            if (!await this.isValidCashAddress(bridgeAddress)) {
                throw new Error(`Invalid Cash Bridge Address given (${bridgeAddress}).`)
            }

            // Make sure the Payout Address is a valid Smart Address.
            if (!await this.isValidSmartAddress(payoutAddress)) {
                throw new Error(`Invalid Smart Payout Address given (${payoutAddress}).`)
            }

            // Calculate the total balance of the unspent outputs.
            const unspentSatoshis = unspentOutputs.reduce((totalValue, unspentOutput) => (totalValue + unspentOutput.value), 0)

            // Initialize an empty list of outputs.
            // NOTE: The order of the outputs we add to this is important and should be OP_RETURN, Value and Optional Change.
            const outputs = []

            // Add the OP_RETURN data output.
            outputs.push(await this.createDataOutput(textEncoder.encode(payoutAddress)))

            // Add the value output (note that miner fee is deducted from output value).
            outputs.push(await this.createValueOutput(bridgeAddress, unspentSatoshis - minerFeeSatoshis))

            // Create the initial transaction to estimate miner fee.
            const transaction = await this.createTransaction(privateKeyWIF, unspentOutputs, outputs)

            // Return the transaction.
            return transaction
        },

        /**
         * Signs and builds the unlocking script for a P2PKH Input.
         *
         * @function
         *
         * @param transaction {Transaction} The transaction being signed.
         * @param input       {any}         The input to use.
         * @param inputIndex  {number}      The index of the input.
         * @param privateKey  {string}      The private key to use.
         * @param publicKey   {string}      The public key to use.
         * @param address     {string}      The address to use.
         *
         * @returns {Promise<Input>} The P2PKH output script.
         */
        async unlockP2PKHInput(transaction, input, inputIndex, privateKey, publicKey, address) {
            // Extract the bytecode (locking script) from our return address.
            const lockScriptBin = await this.getLockingBytecodeFromAddress(address)

            // Define SIGHASH_ALL constant.
            const SIGHASH_ALL = 0x41

            // Generate a transaction signature for this input.
            const signatureBin = await this.signTransactionInput(
                transaction,
                input.satoshis,
                inputIndex,
                lockScriptBin,
                SIGHASH_ALL,
                hexToBin(privateKey),
            )

            // Build the unlocking script that unlocks the P2PKH locking script.
            const unlockingBytecode = flattenBinArray(
                [
                    encodeDataPush(signatureBin),
                    encodeDataPush(hexToBin(publicKey))
                ]
            )

            // Add the unlocking script to the input.
            const signedInput = { ...input, unlockingBytecode }

            // Return the signed input.
            return signedInput
        },

        /**
         * Check if the given address is a valid Cash Address (Base58 or CashAddr format).
         *
         * @function
         *
         * @param address {string} The address to check (Base58 or CashAddr format).
         *
         * @returns {Promise<boolean>} True if address is valid, false otherwise.
         */
        async isValidCashAddress(address) {
            // Add a prefix if necessary.
            let prefix = '';

            if(!address.startsWith('bitcoincash:')) {
                prefix = 'bitcoincash:';
            }

            // ...
            const sha256 = await instantiateSha256();

            // Determine what format the encoded address is in, if any.
            const addressIsBase58 = (typeof decodeBase58Address(sha256, address) !== 'string');
            const addressIsCashAddr = (typeof decodeCashAddress(prefix + address) !== 'string');

            // Evaluate whether the address is a valid address.
            const isValidAddress = addressIsCashAddr || addressIsBase58;

            return isValidAddress;
        },

        /**
         * Check if the given address is a valid Smart Address.
         *
         * @function
         *
         * @param address {string} The address to check.
         *
         * @returns {Promise<boolean>} True if address is valid, false otherwise.
         */
        async isValidSmartAddress(address) {
            try {
                // Parse the bridge address.
                ethers.utils.getAddress(address);

                // Return true to indicate that the address is valid.
                return true;
            } catch(error) {
                // Return false to indicate that the address is invalid.
                return false;
            }
        },

        /**
         * Create an OP_RETURN output.
         *
         * @function
         *
         * @param data        {Uint8Array} OP_RETURN data.
         * @param protocolHex {string}     Prefix (in hex) to precede data.
         *
         * @returns {Promise<Output>} The OP_RETURN output script.
         */
        async createDataOutput(data, protocolHex = '') {
            // Convert opcodes and data to proper types.
            const OP_RETURN = hexToBin('6a');
            const OP_PUSH4 = hexToBin('04');
            const OP_PROTOCOL = hexToBin(protocolHex);

            // Set up an empty data output structure.
            const dataOutput = {
                satoshis: bigIntToBinUint64LE(BigInt(0)),
            };

            // Throw an error if a protocol has been provided, but is invalid.
            if(protocolHex && protocolHex.length !== 8) {
                throw(new Error(`Cannot create OP_RETURN data output, provided protocol (${protocolHex}, length ${protocolHex.length}) is not 4 bytes of data.`));
            }

            if(protocolHex) {
                // Return the data output with the data pushed after the protocol identifier.
                return { ...dataOutput, ...{ lockingBytecode: flattenBinArray([ OP_RETURN, OP_PUSH4, OP_PROTOCOL, encodeDataPush(data) ]) } };
            }

            // Return the data output with the data pushed directly without a protocol identifier.
            return { ...dataOutput, ...{ lockingBytecode: flattenBinArray([ OP_RETURN, encodeDataPush(data) ]) } };
        },

        /**
         * Create a transaction P2PKH output with the given value.
         *
         * @function
         *
         * @param address  {string} Bitcoin Cash address to convert to P2PKH lock-code.
         * @param satoshis {number} Satoshi value to attach to output
         *
         * @returns {Promise<Output>} The P2PKH output script.
         */
        async createValueOutput(address, satoshis) {
            // Create the output.
            const valueOutput = {
                lockingBytecode: await this.getLockingBytecodeFromAddress(address),
                satoshis: bigIntToBinUint64LE(BigInt(satoshis)),
            }

            // TODO: We want to do a check here to ensure the satoshi amount is above the dust limit.
            //       However, before we do this, we must refactor our logic in Hop.Cash backend.

            // Return the output.
            return valueOutput;
        },

        /**
         * Create a transaction.
         *
         * @function
         *
         * @param privateKeyWIF  {string}                     Private Key in WIF format.
         * @param unspentOutputs {AddressListUnspentResponse} Prefix (in hex) to precede data.
         * @param outputs        {Array<Output>}              Array of outputs to include in transaction.
         *
         * @returns {Promise<Output>}	The OP_RETURN output script.
         */
        async createTransaction(privateKeyWIF, unspentOutputs, outputs) {
            // Parse the private key wif into the keypair and address.
            const [ privateKey, publicKey, returnAddress ] = await this.parseWIF(privateKeyWIF);

            // Convert all coins to the Libauth Input format (unsigned)
            const inputs = [ ...unspentOutputs ].map(this.createUnsignedInput);

            // Assemble the unsigned transaction.
            const transaction = {
                version: 2,
                inputs,
                outputs,
                locktime: 0,
            }

            // Sign all inputs and add the generated unlocking scripts to the transaction.
            // eslint-disable-next-line require-atomic-updates
            transaction.inputs = await Promise.all(
                transaction.inputs.map(
                    (input, inputIndex) => this.unlockP2PKHInput(
                        transaction,
                        input,
                        inputIndex,
                        privateKey,
                        publicKey,
                        returnAddress,
                    )
                )
            );

            // Hex encode the built transaction.
            const encodedTransaction = encodeTransaction(transaction);

            // Return the encoded transaction.
            return encodedTransaction;
        },

        /**
         * Converts an address to its locking byte-code equivalent.
         *
         * @function
         *
         * @param address {string} Bitcoin Cash address.
         *
         * @returns {Uint8Array} The locking code for the given address.
         */
        async getLockingBytecodeFromAddress(address) {
            // Initialize an empty error message, that we can use to display after we exhausted our options.
            let errorMessages = '';

            try {
                // Add a prefix if necessary.
                let prefix = '';

                if(!address.startsWith('bitcoincash:')) {
                    prefix = 'bitcoincash:';
                }

                const lockScriptResult = cashAddressToLockingBytecode(prefix + address);

                // Throw an error in case of failure (which we'll catch and ignore).
                if(typeof lockScriptResult === 'string') {
                    throw(new Error(`Cannot decode '${address}' as a cash address: ${lockScriptResult}`));
                }

                return lockScriptResult.bytecode;
            } catch(error) {
                // Store the error message, but otherwise do nothing.
                errorMessages += error;
            }

            try {
                // Attempt to decode the address as a base58 legacy address.
                const sha256 = await instantiateSha256();
                const lockScriptResult = base58AddressToLockingBytecode(sha256, address);

                // Throw an error in case of failure (which we'll catch and ignore).
                if(typeof lockScriptResult === 'string') {
                    throw(new Error(`Cannot decode '${address}' as a base58 address: ${lockScriptResult}`));
                }

                return lockScriptResult.bytecode;
            } catch(error) {
                // Store the error message, but otherwise do nothing.
                errorMessages += error;
            }

            // Throw an error, including the the most recent error message in case the address could not be decoded with either address type.
            throw(new Error(`Failed to decode '${address}': ${errorMessages}`));
        },

        /**
         * Sign a single transaction input using a private key.
         *
         * @function
         *
         * @param transaction        {Transaction} The transaction to use.
         * @param satoshis           {number}      The input's satoshi value.
         * @param inputIndex         {number}      Input index to sign.
         * @param coveredBytecodeBin {Uint8Array}  The input's locking script.
         * @param hashtype           {number}      Hash type to use for signing serialization.
         * @param privateKeyBin      {Uint8Array}  Private Key in binary format.
         *
         * @returns {Uint8Array}	The signed transaction input.
         */
        async signTransactionInput(transaction, satoshis, inputIndex, coveredBytecodeBin, hashtype, privateKeyBin) {
            // Generate the signing serialization for this transaction input.
            const signingSerialization = await this.createSigningSerialization(transaction, satoshis, inputIndex, coveredBytecodeBin, hashtype);

            // Generate the "sighash" by taking the double SHA256 of the signing serialization.
            const sha256 = await instantiateSha256();
            const sighash = sha256.hash(sha256.hash(signingSerialization));

            // Instantiate the Secp256k1 interface.
            const secp256k1 = await instantiateSecp256k1();

            // Generate a signature over the "sighash" using the passed private key.
            const signatureBin = secp256k1.signMessageHashSchnorr(privateKeyBin, sighash);

            // Append the hashtype to the signature to turn it into a valid transaction signature.
            const transactionSignature = Uint8Array.from([ ...signatureBin, hashtype ]);

            return transactionSignature;
        },

        /**
         * Parse a WIF string into a private key, public key and address.
         *
         * @function
         *
         * @param wif {string} Wallet in WIF format.
         *
         * @returns {Promise<Array<String>>} Array containing [0] Private Key, [1] Public Key and [2] Address.
         */
        async parseWIF(wif) {
            // Instantiate Libauth crypto interfaces
            const secp256k1 = await instantiateSecp256k1();
            const sha256 = await instantiateSha256();
            const ripemd160 = await instantiateRipemd160();

            // Attempt to decode WIF string into a private key
            const decodeResult = decodePrivateKeyWif(await instantiateSha256(), wif);

            // If decodeResult is a string, it represents an error, so we throw it.
            if(typeof decodeResult === 'string') throw(new Error(decodeResult));

            // Extract the private key from the decodeResult.
            const privateKeyBin = decodeResult.privateKey;

            // Derive the corresponding public key.
            const publicKeyBin = secp256k1.derivePublicKeyCompressed(privateKeyBin);

            // Hash the public key hash according to the P2PKH scheme.
            const publicKeyHashBin = ripemd160.hash(sha256.hash(publicKeyBin));

            // Encode the public key hash into a P2PKH cash address.
            const address = encodeCashAddress('bitcoincash', CashAddressType.P2PKH, publicKeyHashBin);

            return [ binToHex(privateKeyBin), binToHex(publicKeyBin), address ];
        },

        /**
         * Utility function to convert an electrum unspent output to a libauth compatible input.
         *
         * @function
         *
         * @param unspentOutput {AddressListUnspentEntry} Unspent Output to create input from.
         *
         * @returns {any} The created input.
         */
        createUnsignedInput(unspentOutput) {
            const input = {
                outpointIndex: unspentOutput.tx_pos,
                outpointTransactionHash: hexToBin(unspentOutput.tx_hash),
                unlockingBytecode: new Uint8Array(),
                satoshis: unspentOutput.value,
                sequenceNumber: 0,
            };

            // TODO: We should try to strongly type the return type of this function.
            // This is essentially a LibAuth "Input" interface, but has the field "satoshis" added: https://libauth.org/interfaces/input.html
            // Refactoring this would require refactoring how we call unlockP2PKHInput().
            return input;
        },

        /**
         * Create the signing serialization for a given transaction input.
         *
         * @function
         *
         * @param transaction        {Transaction} The transaction to use.
         * @param satoshis           {number}      The input's satoshi value.
         * @param inputIndex         {number}      Input index to sign.
         * @param coveredBytecodeBin {Uint8Array}  The input's locking script.
         * @param hashtype           {number}      Hash type to use for signing serialization.
         *
         * @returns {Promise<Uint8Array>}	The signing serialization.
         */
        async createSigningSerialization(transaction, satoshis, inputIndex, coveredBytecodeBin, hashtype) {
            // NOTE: A signing serialization are the parts of the transaction that should be signed based on a given sighash type.
            //       Note that the input being spent must also be included in this serialization.
            //       For more details, see: https://documentation.cash/protocol/blockchain/transaction/transaction-signing

            // Create a "transaction state", used to extract a lot of the relevant information with Libauth.
            const state = createTransactionContextCommon({
                inputIndex,
                sourceOutput: { satoshis: bigIntToBinUint64LE(BigInt(satoshis)) },
                spendingTransaction: transaction,
            });

            // Generate the signing serialization using mostly information from the generated "transaction state".
            const signingSerialization = generateSigningSerializationBCH({
                correspondingOutput: state.correspondingOutput,
                coveredBytecode: coveredBytecodeBin,
                forkId: this.$store?.state?.CASH_FORK_ID,
                locktime: state.locktime,
                outpointIndex: state.outpointIndex,
                outpointTransactionHash: state.outpointTransactionHash,
                outputValue: state.outputValue,
                sequenceNumber: state.sequenceNumber,
                sha256: await instantiateSha256(),
                signingSerializationType: new Uint8Array([ hashtype ]),
                transactionOutpoints: state.transactionOutpoints,
                transactionOutputs: state.transactionOutputs,
                transactionSequenceNumbers: state.transactionSequenceNumbers,
                version: 2,
            });

            return signingSerialization;
        },

    },
    created: function () {
        /* Initialize currency. */
        this.currency = 'BCH'

        /* Set video preview (class). */
        this.showVideoPreview = 'hidden'

    },
    mounted: function () {
        //
    },
    beforeUnmount: function () {
        /* Clear receiver and scanner. */
        this.setReceiver(null)

    },
}
</script>
