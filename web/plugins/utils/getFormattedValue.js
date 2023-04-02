/* Import modules. */
import numeral from 'numeral'

/**
 * Get Formatted Value
 *
 * Format BCH value to value units and calculate market value.
 */
const getFormattedValue = () => (_satoshis, _marketPrice, _currency) => {
    // console.log('CURRENCY', _currency)
    // let value = getIotas(iotas, units, marketPrice)
    let value = _satoshis

    let unit = 'sats'

    let fiat = ((_satoshis / 100000000) * (_marketPrice))
    fiat = numeral(fiat).format('$0,0.00[00]') + ' ' + _currency

    // const fiat = !_marketPrice
    //     ? '-'
    //     : (_marketPrice.value * (value / 1000000)).toLocaleString('en-US', {
    //           style: '_currency',
    //           currency: _marketPrice.currency,
    //           minimumFractionDigits: 2,
    //           maximumFractionDigits: 5
    //       })

    /* Adjust value and unit (based on size of balance). */
    switch (true) {
    case value < 100:
        break
    case value < 100000:
        value /= 100
        unit = 'bits'
        break
    case value < 100000000:
        value /= 100000
        unit = 'mBCH'
        break
    default:
        value /= 100000000
        unit = 'BCH'
        break
    }

    /* Rounded value (based on decimal value). */
    // TODO: Run more display tests to decide if we're keeping the rounding.
    //       2-decimal places is ideal for "primary" displays.
    //       4-decimal places is acceptable for "secondary" displays.
    const rounded = Math.round(value * 10) / 10 +
        (Math.round(value * 10) / 10 === value ? '' : '+')

    /* Return (formatted) value. */
    return {
        value,
        rounded,
        unit,
        fiat
    }
}

/* Export module. */
export default getFormattedValue
