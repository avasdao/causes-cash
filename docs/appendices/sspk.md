# Signed Seed Private Key

> __TLDR—__ Allows for the "secure" creating of a private key, derived by from the "signature" of a Bitcoin Cash wallet (eg. Badger).

In the case of Causes, we utilized Ethereum wallets for use with their DAI stablecoin. Instead of requiring contributors to install another plugin or download a new wallet, we can derive a private key from the signature of their Bitcoin Cash wallet.

We will then utilize this "secure" private key (seed) to create an Ethereum wallet, that can ONLY be created from the "deterministic" signature of their wallet.
