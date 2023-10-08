<script setup>
/* Import components. */
import Deposit from './deposit'
import History from './history'
import Settings from './settings'
import Withdraw from './withdraw'

</script>

<template>
    <main class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!--
          Background overlay, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
            <div @click="closeWin" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <!--
          Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
            <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">

                <section>
                    <div class="sm:hidden">
                        <label for="tabs" class="sr-only">Select a tab</label>
                        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                        <select id="tabs" name="tabs" @change="handleChange($event)" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option value="deposit" selected>Deposit</option>

                            <option value="withdraw">Withdraw</option>

                            <option value="history">History</option>

                            <option value="settings">Settings</option>
                        </select>
                    </div>

                    <div class="hidden sm:block">
                        <div class="border-b border-gray-200">
                            <nav class="-mb-px flex" aria-label="Tabs">
                                <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
                                <a href="javascript://" @click="changeTab('deposit')" :class="[ curTab === 'deposit' ? selectedTab : unselectedTab ]">
                                    Deposit
                                </a>

                                <a href="javascript://" @click="changeTab('withdraw')" :class="[ curTab === 'withdraw' ? selectedTab : unselectedTab ]">
                                    Withdraw
                                </a>

                                <a href="javascript://" @click="changeTab('history')" :class="[ curTab === 'history' ? selectedTab : unselectedTab ]">
                                    History
                                </a>

                                <a href="javascript://" @click="changeTab('settings')" :class="[ curTab === 'settings' ? selectedTab : unselectedTab ]">
                                    Settings
                                </a>
                            </nav>
                        </div>
                    </div>
                </section>

                <Deposit
                    :class="{ 'hidden' : curTab !== 'deposit' }"
                    :bchAddress="bchAddress"
                    :sBchAddress="sBchAddress"
                    :web3Address="web3Address"
                />

                <History
                    :class="{ 'hidden' : curTab !== 'history' }"
                    :bchAddress="bchAddress"
                    :sBchAddress="sBchAddress"
                    :web3Address="web3Address"
                />

                <Settings
                    :class="{ 'hidden' : curTab !== 'settings' }"
                    :bchAddress="bchAddress"
                    :sBchAddress="sBchAddress"
                    :web3Address="web3Address"
                />

                <Withdraw
                    :class="{ 'hidden' : curTab !== 'withdraw' }"
                    :bchAddress="bchAddress"
                    :sBchAddress="sBchAddress"
                    :web3Address="web3Address"
                    :curTab="curTab"
                />
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        bchAddress: String,
        sBchAddress: String,
        web3Address: String,
    },
    components: {
        Deposit,
        History,
        Settings,
        Withdraw,
    },
    data: () => {
        return {
            curTab: null,
        }
    },
    computed: {
        selectedTab() {
            return 'border-indigo-500 text-indigo-600 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
        },

        unselectedTab() {
            return 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
        },
    },
    methods: {
        changeTab(_tab) {
            /* Set current tab. */
            this.curTab = _tab
        },

        handleChange(_evt) {
            // console.log('EVENT', _evt.target.value)

            /* Change tab. */
            this.changeTab(_evt.target.value)
        },

        closeWin() {
            /* Reset tab to default. */
            this.curTab = 'deposit'

            /* Emit close request. */
            this.$emit('close')
        },

    },
    created: function () {
        this.curTab = 'deposit'

        let that = this

        // document.addEventListener('keyup', function (evt) {
        //     if (evt.keyCode === 27) {
        //         that.closeWin()
        //     }
        // })
    },
    mounted: function () {
        //
    },
}
</script>
