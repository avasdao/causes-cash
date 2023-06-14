/* Require modules. */
const superagent = require('superagent')

/* Set Slack bot token. */
const token = process.env.SLACK_BOT_TOKEN

/**
 * Slack Notification
 *
 * References:
 * - https://api.slack.com/interactive-messages
 */
const Slack = async function (_txt, _json) {
    // console.log('BOT POST RECEIVED', _msgBlock)

    /* Set url. */
    const url = 'https://slack.com/api/chat.postMessage'

    // const url = 'https://slack.com/api/conversations.open'
    // BOT POST RESPONSE {
    //     "ok": true,
    //     "no_op": true,
    //     "already_open": true,
    //     "channel": {
    //         "id": "D01F06QTRFC"
    //     }
    // }

    const users = 'UVB8TA16X' // Shomari

    /* Set group channel. */
    // const channel = 'C0108NHQN4Q' // #causes
    const channel = 'D01F06QTRFC' // @Shomari

    /* Set text. */
    const text = ''

    let blocks = null

    if (_json) {
        blocks = [{
            type: "section",
            text: {
                type: "mrkdwn",
                text: _txt + "\n```" + JSON.stringify(_json, null, 2) + "```"
            }
        }]
    } else {
        blocks = [{
            type: "section",
            text: {
                type: "mrkdwn",
                text: _txt
            }
        }]
    }

    /* Build a (message) block package. */
    const msgBlock = {
        channel,
        text,
        users,
        blocks
    }

    try {
        await superagent
            .post(url)
            .send(msgBlock)
            .set('accept', 'json')
            .set('Content-type', 'application/json;charset=utf-8')
            .set('Authorization', `Bearer ${token}`)
            .end((err, json) => {
                // console.log('\nBOT POST RESPONSE', JSON.stringify(json.body, null, 4))

                /* Return the json body. */
                // return res.json(json.body)
            })
    } catch (err) {
        console.error('BOT POST ERROR', err)

        /* Return the error. */
        // return res.json({
        //     error: err
        // })
    }

}

/* Export handler. */
module.exports = Slack
