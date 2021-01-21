/* Import modules. */
import Bugsnag from '@bugsnag/js'

/**
 * Report (Error)
 */
const report = ({}, _error) => { // eslint-disable-line no-empty-pattern
    /* Send notification to Bugsnag. */
    Bugsnag.notify(_error)
}

/* Export module. */
export default report
