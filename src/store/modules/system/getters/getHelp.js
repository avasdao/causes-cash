/**
 * Get Help
 *
 * Opens a window to the documenation topic specified by the help icon.
 */
const getHelp = () => (_topic) => {
    /* Validate topic. */
    if (_topic) {
        window.open(`https://docs.causes.cash/${_topic}.html`)
    }
}

/* Export module. */
export default getHelp
