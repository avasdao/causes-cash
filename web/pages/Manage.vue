<script setup>
/* Import modules. */
import { ref } from 'vue'

/* Import components. */
import Dashboard from './Manage/Dashboard'
import Edit from './Manage/Edit'
import Feedback from './Manage/Feedback'
import Notifications from './Manage/Notifications'
import Reports from './Manage/Reports'

const selectedTab =  'border-indigo-500 text-indigo-600 w-1/5 py-4 px-1 text-center border-b-2 font-medium text-lg'

const unselectedTab = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/5 py-4 px-1 text-center border-b-2 font-medium text-lg'

let curTab = ref(null)

const changeTab = (_tab) => {
    /* Set current tab. */
    curTab.value = _tab
}

const handleChange = (_evt) => {
    // console.log('EVENT', _evt.target.value)

    /* Change tab. */
    changeTab(_evt.target.value)
}

/* Initialize current tab. */
curTab.value = 'dashboard'

</script>

<template>
    <main class="flex-1 overflow-y-auto focus:outline-none">
        <div class="relative max-w-4xl mx-auto md:px-8 xl:px-0">
            <div class="pt-10 pb-16">

                <div class="px-4 sm:px-6 md:px-0">
                    <h1 class="text-3xl font-extrabold text-gray-900">
                        Manage Your Campaign
                    </h1>
                </div>

                <div class="px-4 sm:px-6 md:px-0">
                    <div class="py-6">
                        <div class="lg:hidden">
                            <label for="selected-tab" class="sr-only">
                                Select a tab
                            </label>

                            <select
                                id="selected-tab"
                                name="selected-tab"
                                @change="handleChange($event)"
                                class="mt-1 block w-full pl-3 pr-10 py-2 font-bold text-lg border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-md"
                            >
                                <option value="dashboard" selected>
                                    Dashboard
                                </option>

                                <option value="edit">
                                    Edit
                                </option>

                                <option value="notifs">
                                    Notifications
                                </option>

                                <option value="feedback">
                                    Feedback
                                </option>

                                <option value="reports">
                                    Report Cards
                                </option>
                            </select>
                        </div>

                        <div class="hidden lg:block">
                            <div class="border-b border-gray-200">
                                <nav class="-mb-px flex space-x-8">
                                    <!-- Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                                    <a href="javascript://" @click="changeTab('dashboard')" :class="[ curTab === 'dashboard' ? selectedTab : unselectedTab ]">
                                        Dashboard
                                    </a>

                                    <a href="javascript://" @click="changeTab('edit')" :class="[ curTab === 'edit' ? selectedTab : unselectedTab ]">
                                        Edit
                                    </a>

                                    <a href="javascript://" @click="changeTab('notifs')" :class="[ curTab === 'notifs' ? selectedTab : unselectedTab ]">
                                        Notifications
                                    </a>

                                    <a href="javascript://" @click="changeTab('feedback')" :class="[ curTab === 'feedback' ? selectedTab : unselectedTab ]">
                                        Feedback
                                    </a>

                                    <a href="javascript://" @click="changeTab('reports')" :class="[ curTab === 'reports' ? selectedTab : unselectedTab ]">
                                        Report Cards
                                    </a>
                                </nav>
                            </div>
                        </div>

                        <Dashboard :class="{ 'hidden' : curTab !== 'dashboard' }" />

                        <Edit :class="{ 'hidden' : curTab !== 'edit' }" />

                        <Notifications :class="{ 'hidden' : curTab !== 'notifs' }" />

                        <Feedback :class="{ 'hidden' : curTab !== 'feedback' }" />

                        <Reports :class="{ 'hidden' : curTab !== 'reports' }" />
                    </div>
                </div>

            </div>
        </div>
    </main>
</template>
