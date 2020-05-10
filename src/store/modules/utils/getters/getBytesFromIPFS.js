/* Import modules. */
import bs58 from 'bs58'

/**
 * Get Bytes From IPFS
 *
 * Return bytes32 hex string from base58 encoded ipfs hash,
 * stripping leading 2 bytes from 34 byte IPFS hash
 * Assume IPFS defaults: function:0x12=sha2, size:0x20=256 bits
 * E.g. "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL" -->
 * "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
 */
const getBytesFromIPFS = () => (_hash) => {
    return '0x' + bs58
        .decode(_hash)
        .slice(2)
        .toString('hex')
}

/* Export module. */
export default getBytesFromIPFS
