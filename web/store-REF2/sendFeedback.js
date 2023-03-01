async sendFeedback() {
    /* Validate Web3 provider. */
    if (!window.ethereum) {
        /* Send notification request. */
        this.$store.dispatch('showNotif', {
            icon: 'error',
            title: 'MetaMask Error!',
            message: `No Web3 provider found!`,
        })

        return
    }

    /* Connect to Web3 provider. */
    await window.ethereum
        .enable()
        .catch(err => console.error(err))

    /* Set feedback flag. */
    this.hasFeedback = true
}

/* Export module. */
module.exports = sendFeedback
