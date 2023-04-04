/* Import modules. */
const { ethers } = require('ethers')
const { v4: uuidv4 } = require('uuid')

/**
 * Initialize Campaign
 *
 * Process the setup for a campaign:
 *   1. Retrieve all on-chain data.
 */
const initCampaign = async (_state, _commit, _getters, _dispatch) => {
    console.info('Initializing campaign..', _state.campaignid)

    /* Validate campaign id. */
    if (!_state.campaignid) {
        return
    }

    /* Set campaign id. */
    const campaignid = _state.campaignid

    /* Initialize provider. */
    const provider = new ethers.providers
        .JsonRpcProvider(_getters.getProvider)
    // console.log('PROVIDER', provider)

    /* Validate contract code. */
    const code = await provider
        .getCode(campaignid)
        .catch(err => console.error(err))
    // console.log('INIT CAMPAIGN (code):', code)

    /* Validate contract code. */
    if (!code || code === '0x') {
        /* Set current network. */
        const curNetwork = _state.network
        // console.log('CURRENT NETWORK', curNetwork)

        /* Set (notification) message. */
        const message = `Contract NOT found on [ ${curNetwork} ].\n\nSwitching networks now..`

        /* Send notification request. */
        _dispatch('showNotif', {
            icon: 'error',
            title: 'Network Error!',
            message,
        })

        /* Validate current network. */
        if (curNetwork === 'mainnet') {
            console.log('Switching to Testnet')
            _commit('saveNetwork', 'testnet')
        } else {
            console.log('Switching to Mainnet')
            _commit('saveNetwork', 'mainnet')
        }

    }

    /* Set block number. */
    const blockNum = _state.blockNum

    /* Set Campaign ABI. */
    const abi = _getters.getCampaignAbi
    // console.log('CONTRACT ABI', abi)

    let campaign

    /* Initialize campaign instance. */
    campaign = new ethers.Contract(campaignid, abi, provider)
    // console.log('CONTRACT (campaign):', campaign)

    /* Request campaign info. */
    const campaignInfo = await campaign
        .getCampaign()
        .catch(err => {
            console.error(err)

            /* Handle invalid call. */
            if (err.code === 'CALL_EXCEPTION') {
                throw new Error('Failed to load (on-chain) campaign contract.')
            }
        })
    console.log('CAMPAIGN (info):', campaignInfo)

    /* Validate campaign title. */
    if (campaignInfo.title) {
        /* Save campaign title. */
        _commit('saveTitle', campaignInfo.title)
    }

    /* Validate campaign summary. */
    if (campaignInfo.summary) {
        /* Save campaign summary. */
        _commit('saveSummary', campaignInfo.summary)
    }

    /* Validate funding goal. */
    if (campaignInfo.fundingGoal) {
        /* Save campaign funding goal. */
        _commit('saveFundingGoal', campaignInfo.fundingGoal)
    }

    /* Validate publishing flag. */
    if (campaignInfo.isPublished) {
        /* Save publishing flag. */
        _commit('saveIsPublished', campaignInfo.isPublished)
    }

    /* Validate starting time. */
    if (campaignInfo.starting) {
        /* Save campaign starting time. */
        _commit('saveStarting', campaignInfo.starting)
    }

    /* Validate expiration time. */
    if (campaignInfo.expiration) {
        /* Save campaign expiration time. */
        _commit('saveExpiration', campaignInfo.expiration)
    }

    /* Request campaign details. */
    const campaignDetails = await campaign
        .getCampaignDetails()
        .catch(err => {
            console.error(err)

            /* Handle invalid call. */
            if (err.code === 'CALL_EXCEPTION') {
                throw new Error('Failed to load (on-chain) campaign contract.')
            }
        })
    console.log('CAMPAIGN (details):', campaignDetails)

    /* Validate campaign category. */
    if (campaignDetails.category) {
        /* Set campaign category. */
        _commit('saveCategory', campaignDetails.category)
    }

    /* Validate campaign domain. */
    if (campaignDetails.domain) {
        /* Set campaign domain. */
        _commit('saveDomain', campaignDetails.domain)
    }

    /* Validate campaign description. */
    if (campaignDetails.description) {
        /* Set campaign description. */
        _commit('saveDescription', campaignDetails.description)
    }

    /* Validate campaign banner. */
    if (campaignDetails.banner) {
        /* Set campaign banner. */
        _commit('saveBanner', campaignDetails.banner)
    }

    /* Validate campaign highlights. */
    if (campaignDetails.highlights) {
        /* Set campaign highlights. */
        _commit('saveHighlights', campaignDetails.highlights)
    }

    /* Set starting (block number). */
    const starting = campaignInfo.starting.toNumber()

    /* Set from block. */
    // FIXME: How should we determine this number??
    const fromBlock = starting

    /* Set to block. */
    // FIXME: How should we determine this number??
    const toBlock = blockNum

    let query
    let contributors
    let supporters

    /* Request event data. */
    query = await campaign
        .queryFilter('CausesPledgeReceived', fromBlock, toBlock)
        .catch(err => console.error(err))
    console.log('QUERY (PledgeReceived):', query)

    /* Initialize contributors. */
    contributors = []

    /* Handle event entries. */
    query.forEach(entry => {
        /* Set (contributor) address. */
        const address = entry.args.contributor

        /* Set funds raised. */
        const fundsRaised = entry.args.fundsRaised

        /* Set pledge amount. */
        const pledgeAmount = entry.args.pledgeAmount

        /* Set label. */
        const label = entry.args.label

        /* Set comment. */
        const comment = entry.args.comment

        /* Set url. */
        const url = entry.args.url

        /* Set BCH/USD. */
        const bchUsd = entry.args.bchUsd

        // console.log('CONTRIBUTOR (received):', address, fundsRaised.toString(), pledgeAmount.toString())

        /* Generate a new UUID. */
        const id = uuidv4()

        /* Add contributor. */
        contributors.push({
            id,
            address,
            pledgeAmount,
            fundsRaised,
            label,
            comment,
            url,
            bchUsd,
        })

    })

    /* Request event data. */
    query = await campaign
        .queryFilter('CausesPledgeReclaimed', fromBlock, toBlock)
        .catch(err => console.error(err))
    // console.log('QUERY (PledgeReclaimed):', query)

    /* Handle event entries. */
    query.forEach(entry => {
        /* Set contributor. */
        const contributor = entry.args.contributor

        /* Set funds raised. */
        const fundsRaised = entry.args.fundsRaised

        /* Set reclaim amount. */
        const reclaimAmount = entry.args.reclaimAmount

        console.log('CONTRIBUTOR (reclaimed):', contributor, fundsRaised.toString(), reclaimAmount.toString())
    })

    /* Request event data. */
    query = await campaign
        .queryFilter('CausesOwnerPaid', fromBlock, toBlock)
        .catch(err => console.error(err))
    // console.log('QUERY (OwnerPaid):', query)

    /* Handle event entries. */
    query.forEach(entry => {
        /* Set recipient. */
        const recipient = entry.args.recipient

        console.log('RECEIPIENT', recipient)
    })

    supporters = []

    /* Request event data. */
    query = await campaign
        .queryFilter('CausesFeedbackSent', fromBlock, toBlock)
        .catch(err => console.error(err))
    console.log('QUERY (FeedbackSent):', query)

    /* Handle event entries. */
    query.forEach(entry => {
        /* Set (supporter) address. */
        const address = entry.args.supporter

        /* Set comment. */
        const comment = entry.args.comment

        /* Set timestamp. */
        const timestamp = entry.args.timestamp

        console.log('SUPPORTER', address, comment)

        /* Generate a new UUID. */
        const id = uuidv4()

        supporters.push({
            id,
            address,
            comment,
            timestamp,
        })
    })

    /* Request event data. */
    query = await campaign
        .queryFilter('CausesReportCardAdded', fromBlock, toBlock)
        .catch(err => console.error(err))
    // console.log('QUERY (ReportCardAdded):', query)

    /* Handle event entries. */
    query.forEach(entry => {
        /* Set publisher. */
        const publisher = entry.args.publisher

        /* Set title. */
        const title = entry.args.title

        /* Set URL. */
        const url = entry.args.url

        console.log('PUBLISHER', publisher, title, url)
    })



}

/* Export module. */
module.exports = initCampaign
