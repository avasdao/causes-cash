<template>
    <main aria-labelledby="applicant-information-title">
        <div class="bg-white shadow sm:rounded-lg">

            <div class="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" class="text-2xl leading-6 font-medium text-gray-900">
                    Causes Profile
                </h2>

                <p class="mt-1 max-w-2xl text-lg text-gray-500">
                    Personalize your crowdfuding "public" profile.
                </p>
            </div>

            <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                        <dt class="ml-2 text-lg font-medium text-gray-500">
                            Nickname
                        </dt>

                        <div class="flex-grow">
                            <input
                                v-model="nickname"
                                type="text"
                                name="add-team-members"
                                id="add-team-members"
                                class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 text-base border-gray-300 rounded-md"
                                placeholder="Satoshi Nakamoto"
                                aria-describedby="campaign-owner"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-1">
                        <dt class="text-lg font-medium text-gray-500">
                            Tagline
                        </dt>

                        <div class="flex-grow">
                            <input
                                v-model="tagline"
                                type="text"
                                name="add-team-members"
                                id="add-team-members"
                                class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 text-base border-gray-300 rounded-md"
                                placeholder="There was never a funding problem o(-_^)o"
                                aria-describedby="campaign-owner"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-1">
                        <dt class="ml-2 text-lg font-medium text-gray-500">
                            Homepage
                        </dt>

                        <div class="flex-grow">
                            <input
                                v-model="homepage"
                                type="text"
                                name="homepage"
                                id="homepage"
                                class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 text-base border-gray-300 rounded-md"
                                placeholder="https://rainmaker.<my-homepage>.cash"
                                aria-describedby="homepage"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-1">
                        <dt class="ml-2 text-lg font-medium text-gray-500">
                            Security <span class="text-sm">( 12 word seed phrase )</span>
                        </dt>

                        <div class="flex-grow">
                            <input
                                :value="seed"
                                :disabled="!seed"
                                type="text"
                                name="seed-phrase"
                                id="seed-phrase"
                                class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 text-base border-gray-300 rounded-md"
                                placeholder="**** ****** ***** ***** ***** ****** *** ****** ******* ******* ***** *******"
                                aria-describedby="seed-phrase"
                            />
                        </div>
                        <dd class="mt-1 ml-2 text-base text-gray-900">
                            [ <a href="javascript://" @click="toggleSecurity" class="text-blue-500 hover:underline">click to reveal your seed phrase</a> ]
                        </dd>
                    </div>

                    <div class="sm:col-span-1">
                        <dt class="ml-2 text-lg font-medium text-gray-500">
                            Avatar URL
                        </dt>

                        <div class="flex-grow">
                            <input
                                v-model="avatar"
                                type="text"
                                name="avatar-url"
                                id="avatar-url"
                                class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 text-base border-gray-300 rounded-md"
                                placeholder="https://i.imgur.com/L8d4MLV.png"
                                aria-describedby="avatar-url"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <dt class="ml-2 text-lg font-medium text-gray-500">
                            About Me
                        </dt>

                        <textarea
                            v-model="about"
                            rows="3"
                            name="about"
                            id="about"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-gray-300 rounded-md"
                            placeholder="Tell the community a little about yourself and/or your organization.">
                        </textarea>
                    </div>

                    <div class="sm:col-span-2">
                        <dt class="text-lg font-medium text-gray-500">
                            My Links <span class="text-sm">( up to 10 )</span>
                        </dt>

                        <dd class="mt-1 text-sm text-gray-900">
                            <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">

                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div class="w-0 flex-1 flex items-center">
                                        <svg class="h-6 w-6"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 1024 1024" height="1024px" id="Website" version="1.1" viewBox="0 0 1024 1024" width="1024px" xml:space="preserve"><g id="Background"><linearGradient gradientTransform="matrix(0.9397 0.342 0.342 -0.9397 275.869 765.6678)" gradientUnits="userSpaceOnUse" id="bg_1_" x1="464.3252" x2="-194.0465" y1="-73.2012" y2="711.4601"><stop offset="0" style="stop-color:#000000"/><stop offset="0.1921" style="stop-color:#090909"/><stop offset="0.5054" style="stop-color:#212121"/><stop offset="0.8987" style="stop-color:#494948"/><stop offset="1" style="stop-color:#545453"/></linearGradient><circle cx="512.001" cy="512" fill="url(#bg_1_)" id="bg" r="512"/></g><linearGradient gradientTransform="matrix(1 0 0 -1 214.3398 1116.0391)" gradientUnits="userSpaceOnUse" id="Shadow_2_" x1="100.8232" x2="659.7629" y1="801.002" y2="242.0623"><stop offset="0" style="stop-color:#000000"/><stop offset="0.4833" style="stop-color:#090909;stop-opacity:0.5167"/><stop offset="1" style="stop-color:#181818;stop-opacity:0"/></linearGradient><path d="M1017.122,596.122L724.707,303.888L667,282c0,0-178-111-333,16  s-75.667,355.667-75.667,355.667l48.28,73.673l289.725,289.748C811.615,981.411,981.534,811.429,1017.122,596.122z" fill="url(#Shadow_2_)" id="Shadow_1_"/><path d="M512,214.419c-164.35,0-297.581,133.231-297.581,297.581  c0,164.35,133.231,297.581,297.581,297.581S809.581,676.35,809.581,512C809.581,347.65,676.35,214.419,512,214.419z   M736.257,386.927c10.568,18.882,18.661,39.007,24.121,59.966H660.331c-3.699-20.362-9.134-40.442-16.337-59.966H736.257z   M632.869,554.772l-28.023-85.423l17.881-7.904l19.932,66.516l15.438-42.472h19.678l15.438,42.472l19.93-66.516l17.88,7.904  L703,554.772l-17.604,7.781l-17.461-58.277l-17.462,58.277L632.869,554.772z M634.964,577.104  c-3.991,20.33-9.854,40.334-17.625,59.695h-92.88v-59.695H634.964z M693.496,330.504c9.871,9.869,18.82,20.411,26.843,31.505  h-86.636c-17.049-37.16-40.803-71.752-71.262-101.759C611.776,270.029,657.132,294.138,693.496,330.504z M524.459,259.527  c35.06,29.154,62.229,64.197,81.509,102.482h-81.509V259.527z M524.459,386.927h92.77c7.825,19.446,13.727,39.542,17.735,59.966  H524.459V386.927z M499.541,259.84v102.169h-81.133C437.618,323.861,464.663,288.932,499.541,259.84z M389.41,446.894  c4.01-20.424,9.91-40.52,17.734-59.966h92.396v59.966H389.41z M419.154,469.35l-28.022,85.423l-17.604,7.781l-17.461-58.277  l-17.462,58.277l-17.604-7.781L292.98,469.35l17.88-7.904l19.93,66.516l15.438-42.472h19.678l15.438,42.472l19.931-66.516  L419.154,469.35z M330.504,330.504c36.477-36.478,82.002-60.619,131.515-70.34c-30.501,30.027-54.281,64.649-71.347,101.845h-87.011  C311.684,350.915,320.634,340.373,330.504,330.504z M287.743,386.927h92.638c-7.204,19.523-12.639,39.604-16.337,59.966h-100.42  C269.082,425.934,277.175,405.81,287.743,386.927z M287.592,636.801c-10.493-18.804-18.535-38.835-23.968-59.694h100.42  c3.681,20.269,9.082,40.257,16.235,59.694H287.592z M330.504,693.496c-9.951-9.95-18.967-20.583-27.04-31.777h87.085  c17.072,37.297,40.895,72.018,71.469,102.116C412.506,754.115,366.98,729.974,330.504,693.496z M499.541,764.16  c-34.961-29.161-62.053-64.188-81.271-102.441h81.271V764.16z M499.541,636.801h-92.506c-7.771-19.361-13.634-39.366-17.624-59.694  h110.13V636.801z M511.855,504.276l-17.463,58.277l-17.603-7.781l-28.022-85.423l17.882-7.904l19.93,66.516l15.437-42.472h19.679  l15.438,42.472l19.929-66.516l17.882,7.904l-28.022,85.423l-17.603,7.781L511.855,504.276z M524.459,764.473V661.719h81.646  C586.818,700.11,559.604,735.25,524.459,764.473z M693.496,693.496c-36.364,36.366-81.72,60.475-131.053,70.253  c30.532-30.08,54.326-64.77,71.383-102.03h86.71C712.463,672.913,703.447,683.546,693.496,693.496z M736.408,636.801h-92.313  c7.154-19.438,12.556-39.427,16.236-59.694h100.045C754.943,597.965,746.901,617.997,736.408,636.801z" fill="#FFFFFF" id="Website_1_"/></svg>

                                        <span class="ml-2 flex-1 w-0 truncate text-lg">
                                            resume_front_end_developer.pdf
                                        </span>
                                    </div>

                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                </li>

                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div class="w-0 flex-1 flex items-center">
                                        <svg class="h-6 w-6" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><rect height="32" style="fill:none;" width="32" x="56" y="56"/><path d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104" style="fill:#1da1f2;fill-rule:nonzero;"/></svg>

                                        <span class="ml-2 flex-1 w-0 truncate text-lg">
                                            resume_front_end_developer.pdf
                                        </span>
                                    </div>

                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>                                </li>

                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div class="w-0 flex-1 flex items-center">
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="100%" xml:space="preserve"><g><path d="M256,0c-69.526,0 -78.244,0.295 -105.549,1.541c-27.248,1.243 -45.858,5.57 -62.142,11.899c-16.834,6.542 -31.111,15.296 -45.342,29.528c-14.232,14.231 -22.986,28.508 -29.528,45.342c-6.329,16.283 -10.656,34.893 -11.899,62.141c-1.246,27.305 -1.54,36.023 -1.54,105.549c0,69.524 0.294,78.242 1.54,105.547c1.243,27.248 5.57,45.858 11.899,62.141c6.542,16.834 15.296,31.111 29.528,45.344c14.231,14.231 28.508,22.985 45.342,29.527c16.284,6.328 34.894,10.656 62.142,11.899c27.305,1.245 36.023,1.54 105.549,1.54c69.524,0 78.242,-0.295 105.547,-1.54c27.248,-1.243 45.858,-5.571 62.141,-11.899c16.834,-6.542 31.111,-15.296 45.344,-29.527c14.231,-14.233 22.985,-28.51 29.527,-45.344c6.328,-16.283 10.656,-34.893 11.899,-62.141c1.245,-27.305 1.54,-36.023 1.54,-105.547c0,-69.526 -0.295,-78.244 -1.54,-105.549c-1.243,-27.248 -5.571,-45.858 -11.899,-62.141c-6.542,-16.834 -15.296,-31.111 -29.527,-45.342c-14.233,-14.232 -28.51,-22.986 -45.344,-29.528c-16.283,-6.329 -34.893,-10.656 -62.141,-11.899c-27.305,-1.246 -36.023,-1.541 -105.547,-1.541Zm0,46.127c68.354,0 76.451,0.26 103.445,1.492c24.959,1.139 38.514,5.309 47.535,8.814c11.949,4.644 20.477,10.192 29.435,19.15c8.959,8.958 14.506,17.487 19.15,29.435c3.506,9.021 7.676,22.576 8.815,47.535c1.231,26.995 1.492,35.092 1.492,103.447c0,68.354 -0.261,76.451 -1.492,103.445c-1.139,24.959 -5.309,38.514 -8.815,47.535c-4.644,11.949 -10.191,20.477 -19.15,29.435c-8.958,8.959 -17.486,14.506 -29.435,19.15c-9.021,3.506 -22.576,7.676 -47.535,8.814c-26.99,1.232 -35.086,1.493 -103.445,1.493c-68.361,0 -76.455,-0.261 -103.447,-1.493c-24.959,-1.138 -38.514,-5.308 -47.535,-8.814c-11.949,-4.644 -20.477,-10.191 -29.436,-19.15c-8.958,-8.958 -14.506,-17.486 -19.149,-29.435c-3.506,-9.021 -7.676,-22.576 -8.815,-47.535c-1.232,-26.994 -1.492,-35.091 -1.492,-103.445c0,-68.355 0.26,-76.452 1.492,-103.447c1.139,-24.959 5.309,-38.514 8.815,-47.535c4.643,-11.948 10.191,-20.477 19.149,-29.435c8.959,-8.958 17.487,-14.506 29.436,-19.15c9.021,-3.505 22.576,-7.675 47.535,-8.814c26.995,-1.232 35.092,-1.492 103.447,-1.492Z" style="fill:url(#_Linear1);fill-rule:nonzero;"/><path d="M256,341.332c-47.129,0 -85.334,-38.205 -85.334,-85.332c0,-47.129 38.205,-85.334 85.334,-85.334c47.127,0 85.332,38.205 85.332,85.334c0,47.127 -38.205,85.332 -85.332,85.332Zm0,-216.792c-72.604,0 -131.46,58.856 -131.46,131.46c0,72.602 58.856,131.458 131.46,131.458c72.602,0 131.458,-58.856 131.458,-131.458c0,-72.604 -58.856,-131.46 -131.458,-131.46Z" style="fill:url(#_Linear2);fill-rule:nonzero;"/><path d="M423.372,119.346c0,16.967 -13.754,30.72 -30.72,30.72c-16.966,0 -30.72,-13.753 -30.72,-30.72c0,-16.966 13.754,-30.719 30.72,-30.719c16.966,0 30.72,13.753 30.72,30.719Z" style="fill:url(#_Linear3);fill-rule:nonzero;"/></g><defs><linearGradient gradientTransform="matrix(-149.618,494.3,-494.3,-149.618,300.81,-27.1283)" gradientUnits="userSpaceOnUse" id="_Linear1" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:#515bd4;stop-opacity:1"/><stop offset="0.26" style="stop-color:#9510b8;stop-opacity:1"/><stop offset="0.66" style="stop-color:#e51804;stop-opacity:1"/><stop offset="1" style="stop-color:#feda77;stop-opacity:1"/></linearGradient><linearGradient gradientTransform="matrix(-149.618,494.3,-494.3,-149.618,300.81,-27.1283)" gradientUnits="userSpaceOnUse" id="_Linear2" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:#515bd4;stop-opacity:1"/><stop offset="0.26" style="stop-color:#9510b8;stop-opacity:1"/><stop offset="0.66" style="stop-color:#e51804;stop-opacity:1"/><stop offset="1" style="stop-color:#ffbf00;stop-opacity:1"/></linearGradient><linearGradient gradientTransform="matrix(-149.618,494.3,-494.3,-149.618,300.81,-27.1283)" gradientUnits="userSpaceOnUse" id="_Linear3" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:#515bd4;stop-opacity:1"/><stop offset="0.26" style="stop-color:#9510b8;stop-opacity:1"/><stop offset="0.66" style="stop-color:#e51804;stop-opacity:1"/><stop offset="1" style="stop-color:#ffbf00;stop-opacity:1"/></linearGradient></defs></svg>

                                        <span class="ml-2 flex-1 w-0 truncate text-lg">
                                            coverletter_front_end_developer.pdf
                                        </span>
                                    </div>

                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                </li>

                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div class="w-0 flex-1 flex items-center">
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="100%" xml:space="preserve"><g id="g5891"><path d="M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z" id="background" style="fill:#2867b2;"/><g id="shapes"><rect height="257.962" id="rect11" style="fill:#fff;" width="85.76" x="61.053" y="178.667"/><path d="M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z" id="path13-0" style="fill:#fff;fill-rule:nonzero;"/><path d="M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z" id="path15" style="fill:#fff;fill-rule:nonzero;"/></g></g></svg>

                                        <span class="ml-2 flex-1 w-0 truncate text-lg">
                                            coverletter_front_end_developer.pdf
                                        </span>
                                    </div>

                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                </li>

                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>

            <div class="my-5 flex justify-end px-4">
                <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    Reset
                </button>

                <button
                    @click="update"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Save Your Changes
                </button>
            </div>

            <div>
                <a
                    @click="openPortal"
                    href="javascript://"
                    class="block bg-yellow-200 text-xl font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                >
                    Go To My (Public) Portal
                </a>
            </div>
        </div>
    </main>
</template>

<script>
/* global BigInt ethereum */

/* Import modules. */
import { ethers } from 'ethers'

/* Import components. */
// import HelloWorld from '@/components/HelloWorld'

export default {
    props: {
        web3Address: String,
    },
    components: {
        // HelloWorld
    },
    data: () => {
        return {
            about: null,
            avatar: null,
            homepage: null,
            nickname: null,
            tagline: null,
            showSeed: null
        }
    },
    watch: {
        displayAbout: {
            handler(_about) {
                this.about = _about
            },
            immediate: true,
        },

        displayAvatar: {
            handler(_avatar) {
                this.avatar = _avatar
            },
            immediate: true,
        },

        displayHomepage: {
            handler(_homepage) {
                this.homepage = _homepage
            },
            immediate: true,
        },

        displayNickname: {
            handler(_nickname) {
                this.nickname = _nickname
            },
            immediate: true,
        },

        displayTagline: {
            handler(_tagline) {
                this.tagline = _tagline
            },
            immediate: true,
        },

    },
    computed: {
        seed() {
            if (this.showSeed) {
                return this.$store?.state?.seed
            } else {
                return ''
            }
        },

        displayAbout() {
            if (!this.$store?.state?.profileAbout) return ''

            return this.$store?.state?.profileAbout
        },

        displayAvatar() {
            if (!this.$store?.state?.profileAvatar) return ''

            return this.$store?.state?.profileAvatar
        },

        displayHomepage() {
            if (!this.$store?.state?.profileHomepage) return ''

            return this.$store?.state?.profileHomepage
        },

        displayNickname() {
            if (!this.$store?.state?.profileNickname) return ''

            return this.$store?.state?.profileNickname
        },

        displayTagline() {
            if (!this.$store?.state?.profileTagline) return ''

            return this.$store?.state?.profileTagline
        },

    },
    methods: {
        toggleSecurity() {
            if (this.showSeed) {
                /* Toggle seed display flag. */
                this.showSeed = false
            } else {
                /* Toggle seed display flag. */
                this.showSeed = true
            }
        },

        openPortal() {
            this.$router.push(`/portal/${this.web3Address}`)
            // window.open(`https://causes.cash/portal/${this.web3Address}`)
        },

        async update() {
            console.log('Updating profile..')

            /* Validate embedded Web3 objects. */
            if (!window.ethereum && !window.bitcoin) {
                /* Validate embedded ethereum object. */
                if (window.bitcoin) {
                    console.info('Found Bitcoin provider.')
                } else if (window.ethereum) {
                    console.info('Found Ethereum provider.')
                } else {
                    return console.error('No Web3 provider found.')
                }
            }

            /* Connect accounts. */
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            })
            // console.info('Connected Web3 accounts:', accounts)

            if (!accounts || accounts.length < 1) {
                return alert('Please connect your MetaMask account to continue.')
            }

            /* Initialize provider. */
            const provider = new ethers
                .providers
                .Web3Provider(window.ethereum, 'any')

            /* Set signer. */
            const signer = provider.getSigner()
            // console.log('SIGNER', signer)

            /* Set Campaign ABI. */
            const abi = this.$store.getters.getCausesAbi

            /* Initialize campaign instance. */
            const causes = new ethers.Contract(
                this.$store.getters.getCausesAddr, abi, signer)
            // console.log('CONTRACT (campaign):', campaign)

            const about = this.about || ''
            const avatar = this.avatar || ''
            const homepage = this.homepage || ''
            const nickname = this.nickname || ''
            const tagline = this.tagline || ''

            /* Set gas price. */
            // NOTE: Current minimum is 1.05 gWei (1,050,000,000)
            const gasPrice = BigInt(1050000000)

            /* Set contract options. */
            const contractOptions = {
                gasPrice,
                // value,
            }
            // console.log('CONTRACT OPTIONS', contractOptions)

            /* Make pledge. */
            const response = await causes
                .saveProfile(
                    about,
                    avatar,
                    homepage,
                    nickname,
                    tagline,
                    { ...contractOptions }
                )
                .catch(err => {
                    console.error(err)

                    /* Initialize message. */
                    let message = ''

                    /* Validate message. */
                    if (err.message) {
                        message += err.message

                        /* Validate account permissions. */
                        if (err.message.includes('execution reverted')) {
                            message = `Oops! You don't have permission to perform that update. Check your account and try again..`
                        }
                    }

                    /* Validate data message. */
                    if (err.data && err.data.message) {
                        message += ' - ' + err.data.message
                    }

                    /* Send notification request. */
                    this.$store.dispatch('showNotif', {
                        icon: 'error',
                        title: 'MetaMask Error!',
                        message,
                    })
                })
            // console.log('DEPLOY RESPONSE', response)

            /* Validate transaction hash. */
            if (response && response.hash) {
                /* Send notification request. */
                this.$store.dispatch('showNotif', {
                    icon: 'success',
                    title: 'Profile Manager',
                    message: `Your profile update has been submitted to the blockchain.`,
                })

                /* Wait for confirmation. */
                const confirmation = await response
                    .wait()
                    .catch(err => {
                        this.$store.dispatch('showNotif', {
                            icon: 'error',
                            title: 'Profile Manager',
                            message: err.message,
                        })
                    })
                // console.log('CONFIRMATION', confirmation)

                if (confirmation && confirmation.blockNumber) {
                    /* Send notification request. */
                    this.$store.dispatch('showNotif', {
                        icon: 'success',
                        title: 'Profile Manager',
                        message: `Your profile was updated successfully in block # ${confirmation.blockNumber}.`,
                    })
                }
            }
        },

    },
    created: function () {
        /* Initialize seed display flag. */
        this.showSeed = false
    },
    mounted: function () {
        //
    },
}
</script>
