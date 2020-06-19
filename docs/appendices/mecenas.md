# Mecenas (Oracle)

Mecenas was released by __[Karol Trzeszczkowski (Licho),](https://github.com/KarolTrzeszczkowski)__ in __[July of 2019,](https://www.reddit.com/r/btc/comments/ccsl6j/mecenas_a_recurring_payment_plugin_for_electron/)__ as a solution for bitcoin patronage exit scam risk.

His original plugin created and managed a contract, written in the __[Spedn language,](https://spedn.readthedocs.io)__ that shifts the responsibility for making the transaction from the sender to the receiver with time and value restriction.

__[Rosco Kalis](https://kalis.me/)__ later created a modified version written in __[CashScript.](https://github.com/Bitcoin-com/cashscript)__ Recently, he's created a new experimental script with support for locktime.

##### Sources:

- Karol Trzeszczkowski Electron Cash plugin (__[github](https://github.com/KarolTrzeszczkowski/Mecenas-recurring-payment-EC-plugin)__)
- Rosco Kalis CashScript (__[github](https://github.com/Bitcoin-com/cashscript/blob/master/examples/mecenas.cash)__)
- Rosco Kalis CashScript w/ experimental locktime (__[github](https://github.com/Bitcoin-com/cashscript/blob/master/examples/mecenas_locktime.cash)__)

## Oracle price calculations

Calculating satoshis per cent _(based on $250 market value)._

> __NOTE:__ The minimum daily payout is approx. $0.03 _(for a $1.00 monthly budget)._

__100,000,000__ satoshis per BCH = __$250.00__  
__4,000__ satoshis = __$0.01__ _(one cent)_

Contract execution cost: __1,000__ satoshis = __$0.0025__  
(Monthly) contract execution cost: __30,000__ satoshis = __$0.075__

__eg. $1.00 monthly budget__

- __$0.03__ in daily payouts
- __$0.90__ in monthly payouts
- __$0.08__ in monthly blockchain fees (8%)

__eg. $10.00 monthly budget__

- __$0.33__ in daily payouts
- __$9.90__ in monthly payouts
- __$0.08__ in monthly blockchain fees (0.8%)
