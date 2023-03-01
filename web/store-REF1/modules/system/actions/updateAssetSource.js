/* Import modules. */
import { ethers } from 'ethers'

/**
 * Update Asset Source
 *
 * Pulls the latest asset source from our Eternal Db.
 */
const updateAssetSource = async ({ commit, getters }) => {
    console.info('Updating asset source...') // eslint-disable-line no-console

    /* Set Ethereum provider. */
    // const provider = new ethers.providers.JsonRpcProvider('https://cloudflare-eth.com')
    // const provider = new ethers.providers.EtherscanProvider('homestead', '')
    const provider = new ethers.providers.InfuraProvider('homestead', 'fddf50bdd04f4d9482c8e7581ac32ce2')
    // console.log('PROVIDER', provider)

    /* Set contract address. */
    const contractAddress = getters.getEternalDbAddr
    // console.log('CONTRACT ADDRESS', contractAddress)

    /* Set contract ABI. */
    const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"deleteAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"deleteBool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"deleteBytes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"deleteInt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"deleteString","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"deleteUint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"getAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"getBool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"getBytes","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"getInt","outputs":[{"internalType":"int256","name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"getString","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"}],"name":"getUint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"},{"internalType":"address","name":"_value","type":"address"}],"name":"setAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"setBool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"},{"internalType":"bytes","name":"_value","type":"bytes"}],"name":"setBytes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"},{"internalType":"int256","name":"_value","type":"int256"}],"name":"setInt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"},{"internalType":"string","name":"_value","type":"string"}],"name":"setString","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_key","type":"bytes32"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"setUint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

    /* Initialize contract connection via Web3 Provider. */
    const contract = new ethers.Contract(contractAddress, abi, provider)

    /* Set key. */
    // FIXME: Calulate this value `causes.assets.md`.
    const key = '0xbc3ff924269ad0b21b98ec6cfb735f77b55475c8e099357a5858e1f1efc5b397'

    /* Retrieve source. */
    const source = await contract.getUint(key)
    // console.log('ASSET SOURCE', source)

    /* Set asset source. */
    const assetSource = {
        md: source.toHexString()
    }

    /* Commit wallet's master seed. */
    commit('setAssetSource', assetSource)
}

/* Export module. */
export default updateAssetSource
