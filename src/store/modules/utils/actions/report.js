/* Import modules. */
import Bugsnag from '@bugsnag/js'

/**
 * Report (Error)
 */
const report = ({}, _error) => { // eslint-disable-line no-empty-pattern
    // TODO: Add type checking, then process as `Error` if necessary.

    /* Send notification to Bugsnag. */
    Bugsnag.notify(_error)
}

/* Export module. */
export default report
