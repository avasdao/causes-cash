# Bitcoin Cash Node - Flipstarter Proposal

Version: 1.1

Revision Date: 4 April 2020

Authors: freetrader (freetrader#105), imaginary_username (im_uname#102) (with the help of many)

Reviewers: emergent_reasons#100, imaginary_username (im_uname#102)

Correspondence: info@bitcoincashnode.org


## Contents

1. [Situation assessment](#1-situation-assessment)
2. [Overall objective](#2-overall-objective)
3. [Scope](#3-scope)
4. [Deliverables](#4-deliverables)
5. [Scope details](#5-scope-details)
6. [Budget](#6-budget)
7. [Schedule](#7-schedule)
8. [Policies / processes / culture](#8-policies-processes-culture)
9. [Accountability](#9-accountability)
10. [Backup plans](#10-backup-plans)
11. [Appendices](#11-appendices)
    - [A) History of team, people](#a-history-of-team-people)
    - [B) History of accomplishments](#b-history-of-accomplishments)
    - [C) History of budgets and disposition of funds](#c-history-of-budgets-and-disposition-of-funds)
    - [D) Current operating expenses](#d-current-operating-expenses)
    - [E) FAQ](#e-faq)
    - [F) References](#f-references)

-------


## 1. Situation assessment

A cryptocurrency's most important attribute is its network. While marvelous
technical advancements that catch headlines are very desirable, a cryptocurrency
is nothing without a robust network of users, investors, and downstream
developers who support each other. Different sectors have different needs, but
they share the requirement that their upstream and protocol developers provide
them with a robust, predictable environment to flourish in, minimize their cost
of operation, and make sound decisions that objectively benefit everyone.

In this regard, we must take a sober look at the Bitcoin Cash ecosystem today,
and realize there is much to be improved. "Implementing the roadmap" sounds great
but little attention has been paid to the soundness of approaches, robustness of
less eye-catching practical matters such as RPC consistency, and reaching
agreement among miners, businesses and developers. The result has been all too
painful for all to see: Bitcoin Cash was a costly item to support for even its
proponents, much of the time was spent on things that do not
contribute to the network effect, and uncertainty about changes constantly
riddle the scene without research and infrastructure to convince otherwise.

Bitcoin Cash Node aims to change this, starting with a modest list of immediate concerns
we want to tackle as we take a robust approach to the roadmap, giving priority
to user and network growth at all times.



## 2. Overall objective

Bitcoin Cash Node, as a competing node and protocol development team, aims to
provide a reliable, professional platform whose development is responsive to
ongoing needs of the ecosystem. Base layer developers have dual
mandates: Ensure network-sustaining growth can proceed without disruption, and
provide steady progress towards implementing upgrades the ecosystem needs. With
your support, we intend to fulfill both of them.

Bitcoin Cash Node will provide a reliable, professional node software
that can be used with confidence by everyone: miners, pools, exchanges,
payment processors, merchants and assorted other businesses as well as
home users. Changes will be researched and tested to the best of our ability,
with accompanying data and assessments. We listen and justify our
actions.

With this proposal, we expect to gather the necessary resources not only to
maintain code soundness and implement upgrades, with a focus on immediate
ecosystem concerns, but also establish tools and infrastructure necessary to
inspire confidence in Bitcoin Cash as a usable, promotable, reliable form of
money. We invite you to join us.


### Commitment to a diverse client landscape

We do not believe our lead maintainer, or indeed our team, should have sole say over
network rules. This stance is reflected in our support and encouragement of
initiatives that diversify the mining and application landscape, so that on top
of our ongoing communication efforts, we are never in a dictatorial position with
arbitrary power.

The existence and adoption of other clients increase network robustness, attract
more talent to the ecosystem and allow BCHN to do more good than if we have
absolute say over a smaller, monoculture network.



## 3. Scope

Our first fundraising proposal seeks to cover the following areas.
Work will begin in May 2020. Note that early May 2020 is the projected end
of this flipstarter campaign.

As the deliverables are reassessed towards the end of 2020, we see ourselves
providing feedback to the community, and collecting funds on focused items to
carry out the next leg of our mission.

For this initial fundraiser, our scope would cover the following under a
proposed budget of 1122 BCH (of which 144 BCH were already donated before
this campaign):

1. **Compile existing Difficulty Adjustment Algorithm research and provide an
improved solution** over status quo. The new solution should feature faster, more
robust adjustment that lessens disadvantage for "loyal" miners, while reducing
variance as a benefit for user confirmation times.
(budget 12k USD, 1 Full Time Equivalent (FTE) needed over a span of 3 months, end date early-mid August)

2. **Evaluate existing software regarding different scenarios of unconfirmed chain
handling and identify bottlenecks** in a clear fashion instead of arbitrarily
asserting them. Improvement at (1) may lessen the urgency of extending the
current 50 tx limit, but much longer chains remain a very desirable feature and
should at least be seriously researched.
(budget 9k USD, 0.9 FTE over span of 2.5 months from mid August to end of October)

3. **Provide a more robust testnet infrastructure** that is useful for downstream
developers. Bitcoin Cash's current testnet is far from robust - with irregular
mining activities and patchy services (i.e. trest, SLP) availability.
Experimental features and upgrades shall also be provided on a separate,
volatile testnet that is serves as staging area for cutting-edge developers.
A better testnet is one of the top requests from new developers and projects
trying to enter the BCH ecosystem. The testnet is also commonly insufficient
for existing project development. A small investment in a better testnet will
help attract new projects, reduce defect rates and reduce cost of development
on BCH.
(budget 20k USD, significant parts thereof infrastructure costs, < 0.25 FTE, end date beginning of November)

4. **Research and implement ability to handle larger numbers** beyond 32-bit, which
significantly impacts ease of programming an entire class of smart contracts
that provide financial value to Bitcoin Cash.
(budget 24.8k USD, 2 FTE needed over a span of 3 months, end date early-mid August)

5. **Ongoing software maintenance and support**. Backport important bug fixes and
upgrades from Bitcoin Core, and provide our own fixes per user feedback. Fill
the numerous gaps where specifications for existing features and protocols do
not exist.
(budget 104k USD, ~ 2.25 FTE over span of 6 months from early May to early November)

6. **Development of ecosystem interaction processes**. Establish regular contact
with key stakeholders (exchanges, pools, miners, other large businesses and
holders) to get timely feedback.
(budget 30k USD for part time (12.5 hrs/week) assist to lead maintainer
over variable span starting in May)

7. **Regular project reporting** on roadmap, project governance, technical progress
and financial accounting, including a monthly, no-holds-barred overview report
to account for project commitments versus accomplishments. Instalments of this
reporting has already been made available and can be tracked at
https://read.cash/@freetrader.
(shared responsibility between lead maintainer who is working full time on
the project, and part-time community representative budgeted above. A budget
of 10.7k USD is allocated to website development & maintenance to aid in
informing and reporting)

8. **Establish our own crowdfunding infrastructure**.
We plan to host our own focused fundraisers or use a third-party platform
with assurance contracts as a path to voluntary, sustainable funding.
As the Flipstarter team has made their implementation easily portable, we
plan to look at that option first, without ruling out other approaches.
(budget of 10.12k USD, with ~4kUSD for initial setup and development over 2 months
starting early May, remaining funds for later development of 12 fundraising campaigns.
Needs ~0,5 FTE split between a front-end and back-end developer)

The deliverables associated with these items are described in more detail
in [Deliverables](#4-deliverables).

Additional detail, including cost estimates, is contained in the section
[Scope details](#5-scope-details).



## 4. Deliverables

The following set of deliverables are practical, measurable goals intended to
fulfill the aforementioned scope.

Further details about how these deliverables will be realized, including
staffing, schedule and budgets, are also attached.


### 4.0 Deliverable #0 - A capable team

Our team currently comprises a full-time lead maintainer doing much of
the project planning and daily work supervision, assisted by several
part-time maintainers some of whom also fill part time development,
testing, support and infrastructure maintenance roles on the project.
This group of essentially voluntary contributors comprises perhaps 2-3 FTE
engineers working on the project.

Additionally, there are developers with excellent qualifications who support
the project in their spare time on a best effort basis right now, but could
make specific time commitments given the right level of support.

If funding goals are met, it allows us to be on more solid ground, whether in
the form of more stable commitments from existing contributors or fresh help.
This is estimated to comprise an additional 2 FTE of skilled and experienced
developers which would be sufficient to cover our development workload
(projected to reach about 4.5 FTE in the period from May to mid August).

To improve project communication and representation and free up time
of the lead maintainer to focus on steering the development and maintenance,
the appointment of a part-time project representative is planned in the
proposed budget.


### 4.1 Deliverable #1 - Evaluation report on Difficulty Adjustment Algorithm (DAA)

We will evaluate candidates in consultation with the wider ecosystem and
clearly present the pros and cons of evaluated algorithms to the public.
An evaluation report should be available early July.


### 4.2 Deliverable #2 - Specification, implementation and tests for proposed new DAA for November 2020 upgrade

A specification document for the best DAA candidate found by our preceding
research activity (deliverable 1). To be published in final form, followed by
implementation and tests, before feature freeze on 15 August 2020. Ecosystem
agreement from preceding discussions will lead to us integrating the algorithm
to BCHN client to be activated in November. We estimate that at least wallets
adhering to the Electron-cash protocol (EC and Edge Wallet) or using
Bitcoincashj will need assistance migrating, with more possible.


### 4.3 Deliverable #3 - Evaluate performance bottlenecks on unconfirmed tx chains

Benchmark that pertains to different scenario permutations regarding unconfirmed
chains, and their impact brought on by different mempool policies. Part of the
performance evaluation has been produced in previous debates and can be
reused, but more scenarios need to be tested against.

A technical report will describe the benchmark results, the bottlenecks
identified and any recommendations for fixing them.


### 4.4 Deliverable #4 - A release configured to provide a separate testnet3 and experimental testnet

This should provide a robust test network capability to the project.
It will be delivered in the form of infrastructure which will be made
accessible through node configuration and instructions on how to access
and participate on the testing networks.


### 4.5 Deliverable #5 - Continued testnet support

Establish stable services expected on a reliable testnet: Mining, a pool to be
mined to, Electron-cash server (via Fulcrum or Electrs), SLPDB, and REST
endpoint, and maintain reasonable levels of service for developers through
the year.


### 4.6 Deliverable #6 - Handling larger numbers

A release that allows existing arithmetic opcodes to handle larger numbers,
tentatively limited to 64-bit. Some concepts have been discussed in the previous
upgrade cycle, and we intend to build upon them.


### 4.7 Deliverable #7 - Regular BCHN releases

As a result of maintenance efforts, we would be issuing minor releases
which include software fixes and performance optimizations. These are
important to keep our users safe from vulnerabilities, correct any existing
defects and keep up with evolving platforms.

Based on feedback from our users, we plan to provide these less frequently
than two-week release cycle of another frequently used implementation.

Instead, we aim for a 4-8 week release cycle, but hope to contain more
poignant performance improvements while delivering parity on important
backports.

Once our independent fundraising campaigns are successful at funding new
feature developments and some of those developments have run their course
through to successful internal validation, then our releases will begin to
include new features. Realistically, successful completion of those fund-
raisers is still 2-3 months away and completion of new features several
more, so we are looking at around Q3 / Q4 for feature releases.


### 4.8 Deliverable #8 - Appointment of BCHN representative

This deliverable consists of an introduction of the person appointed
as BCHN Representative. The representative will help the lead maintainer to
ensure that BCHN has continuous, professional, two way engagement with the
larger ecosystem of users. The representative shall work together with
lead maintainer to develop and implement a process of regularly obtaining,
processing and presenting user feedback.


### 4.9 Deliverable #9 - Independent download mirror

The project would announce the availability of its own release host
via its [website](https://bitcoincashnode.org) [1], updates to the product's
accompanying documentation and a read.cash announcement.

Our initial release [3] and minor releases until that time would be transferred
to the download mirror.


### 4.10 Deliverable #10 - Support service via GitLab Issue tracker and our Slack

The proposal funds our continued support of the node software through
dedicated developer time.

Such support will be given via GitLab and the #support channel in the
[Bitcoin Cash Node Slack](https://bitcoincash.slack.com).


### 4.11 Deliverable #11 - Availability of our website in first other language (Chinese)

This will be a full translation of the website and any article content on
it to Mandarin Chinese.


### 4.12 Deliverable #12 - Our first own crowdfunding campaign for a technical item

This will demonstrate that we have an independent path to running our own
fundraising campaigns, preferably using assurance contract technology
like Flipstarter. It paves the way for more itemized and focused fundraisers.

Our first own technical campaign will provide detailed breakdown of the
feature, its perceived costs and benefits, and estimates of the work
involved, resources needed and timeframe planned for its implementation
from specification (if not already completed) until deployment.


### 4.13 Deliverable #13 - Specification of auto-finalization, parking & unparking

This closes a gap in the specification of consensus rules and benefits
the entire node client landscape. Delivers a specification in the form of
an erratum to the November 2018 upgrade specification which can be easily
integrated into the shared BCH protocol specifications.

This is sensitive consensus rule work which also requires modeling and
testing against historical and generated test data, comparing with real
nodes to verify that the resulting specification is completely accurate.

Making available the model, tests and any needed data is part of the deliverable.



## 5. Scope details

This section describes the scope in more detail and gives the basis for
estimates on budgets required, which are summarized in [Budget](#6-budget).

> NOTE: For budget estimates of development and maintenance work, an hourly rate
> of 100 USD is applied for estimates involving general development.
> This is based on mid-to-upper going rates [3] for offshore
> developers in regions like East & South Asia, Australia, Africa.
> They may be on the low end for Western Europe and the US, but where
> specific skills are needed, work may be estimated at higher rate.


### 5.1 Node software maintenance

Maintenance of the node software means giving support, fixing bugs (even
those not yet hit by users, by backporting fixes others have detected and
made upstream) and making sure the software continues to run on evolving
hardware and software platforms.

It also covers the infrastructure we maintain to provide releases (on
Github, GitLab and via our own download servers once we set those up).

Additionally, software quality assurance activities are included in this item.
QA is addressed primarily through verification (review, testing and analysis)
which are performed to find defects in the product before our users do.

For such maintenance we budget as follows:

1. **Routine backporting of fixes from upstreams** - average of 20 developer
   hours per week (half time equivalent). The project may individually contract
   with one or more developers to obtain the necessary time, and would
   budget using a rate of 100 USD / hr for a total item cost (for 6 months
   i.e. 24 weeks) of 48 kUSD.
   Developer resources not used for backporting can be refocused
   at the project's discretion on other maintenance or development activities.

2. **User technical support (GitLab issues)** - currently low, but could ramp
   up quickly as our node software gains users. We estimate this
   over the next 6 months of 20 developer hours per week (half time equivalent).
   As above, this yields an additional budget item of 48 kUSD over the next
   6 months. Again, developer resources not used for user support can be
   refocused at the project's discretion on other maintenance or development
   activities, as needs dictate.

4. **Closing the "rolling checkpoints" specification gap**. This is a technical
   gap in the specification of consensus rules which negatively impacts all
   clients that do not inherit ABC's code (as these rules are currently only
   implemented in code, but not properly specified as part of the protocol).
   This is sensitive specification work which also requires modeling and
   testing against historical and perhaps additional test data, to verify
   that the resulting specification is accurate.
   Making a mistake here could have a high cost on other implementations
   who might follow this specification.
   Some ground work has been done, but the remaining work is estimated at
   two weeks FTE (80 hrs) at 100 USD / hour, or 8kUSD.
   This work should be executed in a way that allows its easy integration
   into the shared BCH protocol specifications (https://reference.cash),
   The common protocol specification is fairly general in the area of
   block validation and it might be difficult to create surrounding context
   in this budget, but it could be described as an erratum to the November
   2018 upgrade in 'Network Upgrades'.

5. **Informational site updates**. This is part of routine maintenance,
   and there are several improvements we are looking to make:

   - **Publications section on our site** where we publish project news, important
     announcement, technical and financial reports.
     This is a minor item, but requires regular maintenance as the project
     publishes work articles.  A 6 month budget estimate is calculated at
     4800 USD, based on 8 hours / month and 100 USD per hour.

   - **Internationalization**: support for main language translations
     (we may start with Chinese to address mining and exchange users)
     It is vital for our project to inform a global audience about
     our product and services. Many Bitcoin Cash users are from non-English
     speaking countries and we would gradually want to reach many of them.
     To start we would like to offer our informational articles in Chinese,
     reaching an important market and many stakeholders in Bitcoin Cash.
     This is a bigger item for the website, as it requires both structural
     adaptation and professional translation of content as well as regular
     updating across all available translations as new content is added.
     A 6 month budget estimate is calculated on the following basis:
     2000 USD for adapting the site generally to host other languages.
     1000 USD for professional translation of the site structure and general
     content, excluding any full length news articles, into a single
     other major language and addition of that language onto the site.
     Additionally, about 100 USD for translation and review per posted
     full length report or article from English into another major language.
     We calculate on a basis of 4 such articles per month, for 400 USD / month
     or 2400 USD over 6 months *per language*. We start with one language
     (Mandarin Chinese) for a total amount of
     2000 + 1000 + 2400 = 5400 USD (for 6 months)
     In future, only new content and article will generate expenses, but
     after 6 months of operation we should have a good indication of what
     those costs are and can do more targeted fundraising for further
     site maintenance.

   - **Hosting BCHN downloads ourselves**, at least as a mirror. Estimating
     at 6-12 releases per year, with currently ~ 1GB storage per release,
     we need hosting space of about 20GB initially, growing per year.
     Adequate servers with 30GB are available at 10 USD / month, with about
     10 USD / month / additional 30GB of storage).
     We budget 120 USD for initial VPS rental for a 12 month period, and
     380 USD for server maintenance (incl. initial setup and system admin)
     over that period. Total: 500 USD.


### 5.2 Node software development

In this proposal, only a limited selection of new feature developments
are directly included. We believe in first demonstrating results before asking
for more. Further feature developments will be proposed via separate
fundraisers. These will cover specification, design, implementation and testing,
deployment schedules and activation methods.

Included in this proposal are the following research and development:

1. **DAA R&D to find and deliver a replacement difficulty adjustment algorithm**

   - Conduct an evaluation and publish a report on it, presenting the pros
     and cons of the evaluated algorithms to the public.
     A preferred replacement algorithm shall be nominated.
     Estimated effort and cost: 40 hours at 100 USD / hour for a total
     of 4000 USD.

   - Specify the preferred replacement algorithm in a way suitable for
     integration with the network update specifications and common BCH
     protocol specification repositories: 20 hours at 100 USD / hr for a total of
     2000 USD

   - Implement the preferred replacement algorithm in C++ with unit tests:
     30 hours at 100 USD / hr for a total of 3000 USD

   - Implement activation and any other system tests (conventionally in Python)
     to validate upgrade activation of the algorithm
     20 hours at 100 USD / hr for a total of 2000 USD

   - Package the software parts (new algorithm, tests) into a release of
     the node software:
     10 hours at 100 USD / hr for a total of 1,000 USD

2. **R&D to analyze unconfirmed tx chain performance bottlenecks**

   - Construct software benchmarks and use them to locate performance bottlenecks
     in node handling of long chains of unconfirmed transactions:
     40 hours at 100 USD / hr for a total of 4,000 USD

   - Survey possible solutions to the bottlenecks found, prototype simple
     improvements against the benchmarks, and scope more complex solutions
     as further work packages (possibly needing separate funding to be raised):
     40 hours at 100 USD / hr for a total of 4,000 USD

   - Publish a technical report on the benchmark results and further
     recommendations
     10 hours at 100 USD / hr for a total of 1,000 USD

3. **R&D for larger numerical operations (tentatively: 64-bit) in script**

   - Review & complete prior specification work on 64-bit number operations:
     100 hours at 100 USD / hr for a total of 10,000 USD

   - Implement specified operations and unit tests:
     100 hours at 100 USD / hr for a total of 10,000 USD

   - System tests (regtests) construction:
     24 hours at 100 USD / hr for a total of 2,400 USD

   - Integrate into a release for testnet testing:
     8 hours at 100 USD / hr for a total of 800 USD

   - Integrate for mainnet upgrade (adding activation tests):
     8 hours at 100 USD / hr for a total of 800 USD

   - Publish technical report and propose further research
     8 hours at 100 USD / hr for a total of 800 USD


### 5.3 Self-funding capability

Due to the global economic situation and the all-or-nothing nature of this
initial Flipstarter fundraiser, we are not bundling many new node feature
developments ("big ticket items") into this proposal.

Assurance contracts (pledges are returned if funding goals are not met) are
a crowdfunding model that has proven successful with the well known
Kickstarter site.

Feedback we have received so far indicates that splitting out future
developments into well-described, self-contained funding packages with
their own sub-project plans, budgets and schedules seems preferred both by
our developers and by funders.

We also feel such a funding approach is better in the long run, as it keeps
the development direction of our client firmly in the hands of its users
who will be able to control the funding on a relatively fine grained level.

Therefore we propose a leaner, streamlined approach of a limited initial
development with add-on crowdfunding campaigns.
We are evaluating our options on whether to work with other companies who
might be interested in creating a Flipstarter funding platform for profit.
One initial estimate we have received from a company potentially interested
in doing such a development was around 10kUSD.

As we have some people with Flipstarter expertise in our team, we may decide
to set this up more rapidly ourselves (simple campaign server based on
initial Flipstarter site) and engage with external providers only for
a longer term solution.

In the case we set up our own Flipstarter hosting, we would require:

1. Back-end engineering and enhanced hosting. Our current site is static,
   but Flipstarter needs more dynamic features for user pledge submission
   and transacting with the Bitcoin Cash network.
   It is likely that we would run the Flipstarter campaigns on a separate
   webserver.  Advice received indicates that it should be a straightforward
   to set up, with minimal hosting needs and could piggyback on existing domain.
   A budget is set at 20 hours for setup & integration at 100 USD / hr
   and 120 USD for server hosting for a total of 2,120 USD.

2. Front-end development. Running campaigns ourselves will require some
   front-end work on presentation. Campaigns will probably vary in
   in complexity from the simple to more elaborate.
   If we develop our own campaign hosting, we budget 20 hours for generic
   front-end campaign development at 100 USD / hr for total of 2,000 USD.
   We must anticipate smaller recurring costs for setup and front-end or
   back-end improvisations needed for new campaigns.
   We allocate a pool of around 500 USD per feature campaign which covers
   such setup as well as translation of the campaign text into Chinese).

   We would budget in advance for creating 12 such campaigns, for a total
   of front-end (2kUSD) + back-end (2.12kUSD) + campaigns (12 x 500USD)
   = 10.12kUSD.

In the event that we receive an attractive offer to spend the budgeted funds
on an external Flipstarter platform development, we may do so.
The benefit of using an external service is that it might be less of a
time drag on our own scarce developer resources. If such an external
provider gains traction, we might benefit from a platform that improves
itself and becomes easier to use over time. The downside would be dependence
on a service provider for relatively critical fundraising activity.

If we do not use up the budgeted funds for this self-funding capability
(e.g. if we do it ourselves and it proves simpler than estimated, or we
are able to obtain Flipstarter services cheaper via another platform), then
the leftover funds would be used to for other improvement of our website.

As prime candidates for future independently crowd-funded features we see:

- **Secure JSON RPC connection**
  This is a low hanging fruit that would be useful to protect RPC traffic
  including credentials from snooping not only on the Internet, but also
  in local networks where nodes may be running behind NAT.
  Privacy improvement for users who run BCHN nodes to serve light wallets.

- **Increased RPC compatibility with other nodes** (e.g. BCHD's gRPC interface)
  This makes the BCHN software more useful as a redundancy option for those
  already running other clients, and provide a better platform for users
  around good APIs. gRPC in particular is attractive, and we would look at
  it in combination with complementing QUIC support.

- **Double Spend Proofs and Notifications**
  This offers protection against fraudulent double spend attempts and
  help protect merchants and other businesses. Strengthens the utility
  of unconfirmed transactions as a means of receiving ordinary payments.

- **UTXO/UtreeXO commitments**
  Allows new network nodes joining the network to be synchronized much
  faster, start mining demanding much less bandwidth from existing nodes, and
  provide new forms of lightweight wallet service. Important milestone towards
  massive scaling.

- **Better block propagation with compatible Xthinner and/or Graphene**
  Graphene and Xthinner are scaling technologies that delivers big bandwidth
  savings in case of large blocks. While Graphene is still being optimized for
  better worst-case fallback rates, Xthinner is already relatively [well-defined](https://medium.com/@j_73307/benefits-of-ltor-in-block-entropy-encoding-or-8d5b77cc2ab0)
  and understood to be robust in design, albeit delivering more modest best-case
  bandwidth savings. Evaluating and implementing either or both are important
  steps in massive scaling.

- **Enable use of all processing cores during block validation**
  Currently the software does not use CPU cores as efficiently as it should.
  Many improvements are possible in this area and needed for further scaling,
  but it requires much careful engineering work.

- **Evaluation of adaptive blocksize limit proposals with recommendation of
  new consensus rules and a reference implementation**
  Removing the fixed blocksize limit cuts down one potential future obstacle
  and a recurring item that would drive a need to hard fork the network
  in the case of major adoption.

- **Evaluate Storm or Avalanche as pre-consensus options**
  These protocols could be used as pre-consensus to enable the
  network to settle rapidly on one of several alternative unconfirmed
  transactions. This could protect against fraudulent double spends and
  bring faster pre-confirmation of transactions, strengthening BCH utility
  as electronic cash. While [Avalanche](https://github.com/tyler-smith/snowglobe)
  and [Storm](https://github.com/awemany/storm-sim/raw/master/whitepaper/storm-wp-2019-08-30.pdf)
  both have made progress in description, implementing them in safe, carefully
  considered stages requires much more work.


### 5.4 Setup and operation of two test networks

BCHN will provide a stable test network (testnet3) where services can be provided
as described above, and a volatile, experimental network where new features can
be tested. We expect the cost incurred to include redundant mining setups, nodes
that provide up to date versions of various developer services, and personnel to
maintain up to date documentations.


### 5.5 BCHN representative for liaison with users

The lead maintainer will naturally engage with key users but must focus
on decision making and ensuring that BCHN maintains the highest quality
standards.

The BCHN representative will be a primary point of contact for BCHN
and ensures that the project has continuous, professional, two-way engagement
with the larger ecosystem of users.

The role will be part time at roughly 12.5 hours / week, paid in BCH.
A budget of 30,000 USD earmarked for this position is initially sought
to cover a variable period that depends on the successful applicant's
compensation.



## 6. Budget

Items with associated USD prices

1.  **Self-funding (more crowdfunding campaigns): 10,120 USD**

    Needs: 0,5 FTE until July, less after. We are able to execute on this using existing team members (web developer + experienced protocol engineer for back-end) - or may elect to use an external platform provider.

2.  **Maintenance / backporting: 48,000 USD**

    Needs: 0,5 FTE, we have several developers who could perform this task. For logistical reasons we may either share it across developers or contract further development resources with these funds.

3.  **Maintenance / user support: 48,000 USD**

    Needs: 0,5 FTE, to perform this work we intend to contract among developers already supporting the team.

4.  **Maintenance / Rolling checkpoints spec: 8,000 USD**

    Needs: 0,25 FTE over 8 weeks during from May until mid July. The lead maintainer will execute this item.

5.  **Maintenance / website: 10,700 USD**

    Needs: 0.25-0.5 FTE of web development. Lead maintainer has confirmed a contributor who would be able to perform the work in suitable timeframe (incremental deliveries from May until mid August)

6.  **Development / DAA R&D: 12,000 USD**

    Needs: 1 FTE over 12 weeks from May until beginning of August.

7.  **Development / Unconf. tx perf. R&D: 9,000 USD**

    Needs: 0.9 FTE over 10 weeks from mid August until end of October. Shifted back to allow prioritizing DAA and 64-bit ops work, but may be moved forward if we obtain additional donations outside this fundraiser that would allow us to contract another experienced developer.

8.  **Development / 64-bit ops: 24,800 USD**

    Needs: 2 FTE over 12 weeks from May until beginning of August. Although our team includes developers who have the needed experience, we may need to procure additional resources because of the extent and criticality of the work and the strict timeframe into which this sub-project has to fit.

9.  **Testnet infrastructure / Setup & operation: 20,000 USD**

    Needs: more infrastructure expense than labor (estimated < 0.25 FTE). Completion of this item will be managed (until beginning of November) by a founding BCHN contributor with experience in running other Bitcoin Cash infrastructure services.

10. **Processes / ecosystem liaison role compensation: 30,000 USD**

    Needs: The project intends to hire for this role. The available funds are fixed, and duration depends on the contract which is still a matter to be settled.

11. **20% buffer for BCH volatility: 44,124 USD**


Total amount to raise before taking into account existing funds:

264,744 USD (= ~1122 BCH at time of writing 236 USD/BCH)


### Use of existing donated funds toward this campaign

As we have previously indicated on our web page:

> At the next fundraising effort, any funds unused will also contribute to
> fulfilling that campaign.

We subtract our existing donated funds (currently, rounded down to nearest
integer amount: 144 BCH) from the above BCH amount to derive our flipstart goal:

1122 BCH - 144 BCH = 978 BCH (our Flipstarter fundraising target)



## 7. Schedule

* **First week of April - first week of May**: approximate time of this initial
fundraiser. One minor BCHN release (bug fixes, documentation improvements,
performance optimizations) ahead of May upgrade.  Other resources on:

  - Begin to design and implement self-funding back-end and front-end work
    This is long activity, so should get started as early as possible.
    This activity is carried on using existing project funds, whether
    the node campaign Flipstarter succeeds or fails.

  - Backporting and other ongoing maintenance / user support

  - Activation testing of BCHN together with BCHN users (roughly to the
    end of April)

  - Preparation for user switchover and fallback instructions (ABC <=> BCHN)

  - Project planning and reporting (e.g. user feedback already received, to
    shape future technical feature campaigns)

  - Appointment of BCHN representative role if already possible, otherwise
    this carries over

  - Mid to late April: Preliminary work on rolling checkpoints spec
    activity kicks off

* **2nd week of May**: Outcome of fundraiser expected to be known. Proceeding as
planned or reverting to lesser funded backup plans for maintenance and
development. Capability to do own fundraising campaigns continues to be
developed regardless, using existing funds. Node maintenance proceeds
regardless, but in more limited way (see section below on 'Backup plans')

  * DAA evaluation kicks off

  * 64-bit ops upgrade kicks off

* **14-16 May**: BCH network upgrade. All resources diverted from other activities
to focus on providing support to any BCHN users for a smooth upgrade of their
systems. We kindly ask users to notify us in advance of any special needs
related to this event.


### Schedule after May upgrade (assuming fundraiser success)

* **Remainder of May, most of June**: concurrent threads of

  * self-funding developments

  * website improvement: Publications section is deployed in May/June

  * planning testnets setup

  * ongoing node maintenance activities

  Planning and preparation for first technical proposal campaign(s) also
  happens during May/June, in anticipation of the self-fundraising
  capability becoming ready in July.

* **July**:

  * Sometime in this month *at the latest*, our own crowdfunding capability
should be deployed and we launch our first feature campaign(s) - with running
times of between 1-4 weeks (to be decided, probably also variable).

  * Node maintenance and improvement proceeds with one minor release
    planned per month for the rest of the 6 month period time until end of
    October.

  * We publish our script upgrade and DAA specifications and related
    technical reports, and with the completed specifications and unit-tested
    implementations for these features we participate in discussions and
    review/development/testing for the 15 August feature freeze for the
    November upgrade.

  * The rolling checkpoints deliverable (spec updates, validation model +
    data) should be published early-mid July, latest on 15 August.

* **15 August**: feature freeze for November 2020 upgrade. We begin implementing
the agreed consensus changes in BCHN with a view to having a test release
available 1 month later (15 September).

  * unconf. tx length benchmark construction kicks off

  * around the same time, the first internationalized version of the website
  * (in Chinese) should be deployed, marking the end of general website
  * development work until further notice

* **July until end of October**:
Work on delivering the first technical features (if those fundraisers have
been successful) - otherwise focus on maintenance and learning the lessons
from why those fundraisers were not successful - it may be that funder
priorities have changed and we need to adjust our roadmap / proposed features.
It will be a time of gathering feedback, establishing and adjusting our
processes not only around fundraising, but planning and delivering the
work that has been funded by the public.

* **Mid to end of October**:
The final report for the unconfirmed tx chains is published.
We take stock of our situation (financial as well as progress of work),
communicate the results of the first 6 months and plan the next 6 months.


### Schedule after May upgrade (in case of fundraiser yielding zero)

We fall back to a more voluntary mode with less certainty, but continue
raising funds and pursuing our overall goals.



## 8. Policies / processes / culture

Bitcoin Cash Node prides itself on following open, transparent processes
which explicitly take ecosystem feedback to be a key ingredient.

We consider the group of Bitcoin Cash stakeholders to be wide and do not
only focus on serving the interests of a particular subset. Our software
is intended to be used in mission-critical settings which require high
reliability and quality.  This requires a solid engineering approach and
clear policies which we seek to address in our project documentation. To
this end we have started setting up a project management repository in
which we will deposit detailed plans covering the life cycle of our project
and its products.

In our project communication channels, we seek to promote an environment
which is welcoming to all users regardless of their background or level
of experience.

We maintain mutual disclosure relationships with other software projects that
practice responsible disclosure of security issues, so that the ecosystem
may benefit instead of being harmed.

Bitcoin Cash Node is committed to evolving transparent and accountable
processes both within its own project and within the larger BCH ecosystem.

The 6-monthly network upgrade cycle and very rapid client release cycles
have been identified as sub-optimal, causing development centralization
and practical troubles even for its staunch proponents.

In consultation with users, BCHN will engage on well-considered adaptation
of the upgrade cycle after November 2020 (the November upgrade is already
encoded into the current software in terms of some parameters and cannot
simply be abandoned).



## 9. Accountability

1. Metrics for measuring individual deliverables

   These are described in the deliverables section above. Maintainer reports
   will aim to give an idea of percentage completion of deliverables and
   resources expended until a given reporting date.

   The project welcomes inquiries and feedback on useful metrics that its
   users may wish to see with regards to individual deliverables.

2. Accounting transparency and method of verification

   At the moment the project is reporting on income and expenditures in the
   lead maintainer reports [7, 8], but as the number and amounts of expenses rise,
   this will be split out into a separate financial report published by the
   project account on https://read.cash/@bitcoincashnode or on its website.

   In situations where expenses by the project have to be paid in fiat
   currency, these are generally borne by project members and reimbursed
   in BCH from the project donation wallet.

   Financial reports will include additional addresses if separate positions
   are created for specific activities (such as separate donation funds
   earmarked for specific features or activities) and if revenue streams other
   than general donations are received.

   Market volatility *may* require the project to stabilize part of its
   donation funds through hedging in stable coins, to protect their value.
   The project will consult internally, but it is thought appropriate that
   where such hedging takes place, it should be done using stable coins which
   are SLP (or other) tokens operating on Bitcoin Cash. This retains significant
   incentive alignment with a well-functioning Bitcoin Cash currency network.

3. Regular communication about progress

   The lead maintainer of the project commits to regular reporting
   (no less frequently than once a month, preferably every two weeks) on
   current project activities and their progress.

   He is also available for public questions via any of the project's
   communication channels.



## 10. Backup plans

Please refer to the Frequently Asked Questions (FAQ).


## 11. Appendices

### A) History of team, people

The Bitcoin Cash Node team is composed of people from various
backgrounds in Bitcoin, including long-time developers (both protocol
and layered services such as infrastructure application, wallets,
smart contracts and token-based services.

Some of its team members were instrumental in creating Bitcoin Cash in 2017.

For more about the team and its supporters, see
the Bitcoin Cash Node [project website](https://bitcoincashnode.org/team)
and a list of [its supporters who provided signatures](https://read.cash/@freetrader/signatures-in-support-of-bitcoin-cash-node-43e323e9).


### B) History of accomplishments

The BCHN project released its first version 27 February 2020, which has
been met with a positive response by the ecosystem, including immediate
uptake by some mining pools and other Bitcoin Cash businesses.

The initial version was created out of necessity to provide a safe
alternative to Bitcoin ABC for the 15 May 2020 network upgrade.
It is being used to mine blocks on the Bitcoin Cash network,
with on-chain signaling for its software by pools including Bitcoin.com.

During the last two weeks of March, the BCHN project has conducted a
public consultation to gather the Bitcoin Cash ecosystem's input on
priorities for the development of the client and the currency network.

This survey marks the beginning of an open process of interacting with
the coin's ecosystem to guide the further evolution of the project's
software and its development, deployment and governance processes.


### C) History of budgets and disposition of funds

The BCHN project currently operates solely on donated BCH which are kept
on a multi-signature address at bitcoincash:prnc2exht3zxlrqqcat690tc85cvfuypngh7szx6mk .

This address can be verified on the [project website](https://bitcoincashnode.org/#donate).

The project has received a donation of 100 BCH from company that specializes in
management and monitoring of SHA256 miners, and further donations of ~43.23 BCH
from across the ecosystem. About 1.13 BCH were collected on the coin.dance
(https://cash.coin.dance/development/#developersupport) and then transferred
to the BCHN donation address.

The project's financial situation has so far been reported by the lead
maintainer in regular reports [7,8].
Only a few minor expenses have been incurred for article
translations amounting to less than 0.3 BCH. All income and expenses are
publicly visible on the blockchain via the project's wallet address.

Project funds on 4 April 2020 amounted to ~144 BCH.


### D) Current operating expenses

The project currently does not have large operating expenses.
It is using free plans on several well known platforms:

1. version control, continuous integration and bug tracking facilities
   it done on the free plan of gitlab.com

2. main development communications are done on an unpaid Slack
   (bitcoincashnode.slack.com) and Telegram

Additionally there are occasional translation services being engaged, for
which payers are being refunded by the project from its donated funds.

The website domain registration (https://bitcoincashnode.org) and site
hosting are currently donated by project supporters. The project would
currently be able to reimburse these private expenses and hopes to do so
in future.

The site domain is in control of a maintainer other than the lead maintainer.


### E) FAQ

1. What happens if the fundraiser target is not reached?

   Then Bitcoin Cash Node asks everyone who is willing, to donate directly
   to our multi-sig donation address.

   In the event of us not reaching our goals in this campaign, we will
   prioritize as follows:

   - Maintaining the node over the next year versus *funding* major new
     developments.
     We will need to rely largely on volunteers to contribute labor to those
     efforts.
     It does not mean we will abandon new feature developments, only that we
     will not be able to pay for dedicated developers to work on them and must
     rely on volunteer efforts. Of course that also means that implementation
     and deployment timeframes for such features become more unpredictable and uncertain,
     since we cannot say in advance whether volunteer development resources
     will materialize, on what timeframe and in what quantity.

   - Setting up our website to do fundraisers of our own will still be a priority,
     and if existing funds remain sufficient (market volatility needs to be
     taken into account), we will use them to reach crowdfunding capability.
     If existing funds are deemed inadequate, we may need to settle for
     fundraising which is not based on assurance contracts, but old-fashioned
     dedicated donation addresses per feature or work package.

   - Seeking additional funding sources such as company sponsorships,
     signing support agreements, providing consultation services for businesses
     wishing to use BCHN, inviting third parties to do bounties for features,
     or selling hats :-)

2. Is there a legal entity or company associated with BCHN?

   We see no immediate need for this, but will continue to evaluate this
   option as our organization grows.

3. Where will you keep the funds?

   The funds from fundraisers like this one will be accumulated after
   collection in the project's main multi-signature wallet, where the total
   balance of funds and any movements are publicly visible.

4. Will we get to see how it is spent?

   We intend to continue publishing financial reports that show in detail
   what our funds are spent on.

5. Will subsequent itemized fundraisers go into the same account, or to separate, earmarked accounts?

   To simplify our payment processing, we intend to transfer all raised funds
   into our main multi-signature donation wallet.  We can easily account for
   all outgoing payments and the amounts collected by fundraisers or other
   revenue generated by our activities, and the general public can easily
   monitor our funding level, income and expenditures.

6. Some of your team are members in other client projects and organizations. Do you see any conflicts in those arrangements?

   Bitcoin Cash Node is an open source project that welcomes contributions from
   anyone, including those who work on other client projects or even other
   cryptocurrencies.

   We view conflict of interest considerations as a personal ethical
   responsibility [10] and encourage our contributors to consider voluntarily
   disclosing potential conflicts they may have.

7. What if your intended people to work on items do not complete them on time or leave?

   Different circumstances can arise during our quest to fulfil our promise
   on deliverables. While we will do our best to deal with unfortunate
   situations, whether we are successful or not, we will document our
   efforts transparently so you know where your money has been put to work.

8. What if the BCH price falls below the 20% buffer you guarded against?

   In the event of a short-term fall, we continue to execute according to our
   plan but will deplete our reserves faster, which means we need to look at
   procuring additional funding to make up for the shortfall and carry out
   the deliverables.

9. What if the BCH price rises significantly? What will you do with the money?

   The more value our funds gain, the more we can achieve with them without
   having to raise further funds. In other words we use the money to
   carry out the development needed on our road towards global peer to
   peer electronic cash.

10. Will you keep all raised funds in BCH or hedge some in stable coins?

    This has not been finally decided, but we do intend to keep the majority
    of our funds (initially: all) in BCH. We are consulting with financial
    advisors on possibly hedging some funds in stablecoins that operate on
    the BCH network.

11. What happens if IFP is activated against all expectation?

    In that case BCHN software will follow the most-proof-of-work chain.
    Since it does not implement the IFP rules, miners / pools should take
    note of actual ecosystem uptake and decide on their own whether to comply
    with the IFP rules in case they activate, as activation among ABC nodes
    does not equal actual adoption.

12. How can I help your project in ways other than donating money?

    We are very grateful for any form of assistance whether it be a bit of
    your time or good advice or demonstration of support for our project.

    If you are a developer, software tester or can do technical writing
    or review, you can help us by contributing directly by working with us
    on one or more of the areas that interest you.

    If you are a Bitcoin Cash block producer, you can signal support for
    our project by including `/BCHN/` in your block coinbases.

    If you are a retail business using Bitcoin Cash, we hope that if you
    run a network node, you will try our software and give us feedback.

    If you are a Bitcoin Cash user in general, you can report issues or
    raise improvement requests through our presence on GitLab, or through
    any of our project's other channels.

    Please contact us on Slack, Telegram or IRC via the links on the
    website to find out more.


### F) References

- [1] [Bitcoin Cash Node website](https://bitcoincashnode.org)
- [2] [Bitcoin Cash pre announcement](https://read.cash/@freetrader/bitcoin-cash-node-003b2381)
- [3] [Bitcoin Cash Node initial release](https://github.com/bitcoin-cash-node/bitcoin-cash-node/releases/tag/v0.21.0)
- [4] [Signatures in support of Bitcoin Cash Node](https://read.cash/@freetrader/signatures-in-support-of-bitcoin-cash-node-43e323e9)
- [5] [Bitcoin Cash Node 2020: plans for May upgrade and beyond](https://read.cash/@bitcoincashnode/bitcoin-cash-node-2020-plans-for-may-upgrade-and-beyond-11af0b52)
- [6] [Bitcoin Cash Node Community Survey March 2020](https://read.cash/@freetrader/bitcoin-cash-node-community-survey-march-2020-c23eb5a8)
- [7] [BCHN Lead Maintainer Report 2020-03-14](https://read.cash/@freetrader/bchn-lead-maintainer-report-2020-03-14-84f2992d)
- [8] [BCHN Lead Maintainer Report 2020-03-31](https://read.cash/@freetrader/bchn-lead-maintainer-report-2020-03-31-1e0a4c39)
- [9] https://qubit-labs.com/average-hourly-rates-offshore-development-services-software-development-costs-guide/
- [10] https://en.wikipedia.org/wiki/Conflict_of_interest

