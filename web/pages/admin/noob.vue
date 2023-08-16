<script setup lang="ts">

import * as fflate from 'fflate'

useHead({
    title: `Noob Manager — Causes Cash`,
    meta: [
        { name: 'description', content: `Causes Cash makes building your next BIG idea effortless.` }
    ],
})


/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const mint = () => {
    const json = {
        niftyVer: '2.0',
        title: `Penny-a-Nexa #1337`,
        series: `Noob: My First Collection`,
        author: `Causes Cash`,
        keywords: [
            'nft',
            'sft',
        ],
        appuri: 'https://causes.cash/noob/token/',
        category: 'NFT',
        info: `Enjoy en exclusive SFT from one of the earliest Nexican artists.`,
        bindata: '0539',
        data: {
            id: '1337',
            traits: {},
        },
        license: `You can do whatever you want with these SFTs.`,
    }

    const zipped = fflate.zipSync({
        // Directories can be nested structures, as in an actual filesystem
        'dir1': {
            'nested': {
                'hi-again.txt': fflate.strToU8('Hi again!')
            },
            // You can also manually write out a directory path
            'other/tmp.txt': new Uint8Array([97, 98, 99, 100])
        },

        'info.json': fflate.strToU8(JSON.stringify(json)),

        // You can also provide compression options
        //   'massiveImage.bmp': [aMassiveFile, {
        //     level: 9,
        //     mem: 12
        //   }],
        // PNG is pre-compressed; no need to waste time
        //   'superTinyFile.png': [aPNGFile, { level: 0 }],

        'exec': [{
            'causes.sh': [fflate.strToU8('echo \nWelcome Guest!\n'), {
                // ZIP only: Set the operating system to Unix
                os: 3,
                // ZIP only: Make this file executable on Unix
                attrs: 0o755 << 16
            }]
        }, {
            // ZIP and GZIP support mtime (defaults to current time)
            mtime: new Date('10/20/2020')
        }]
    }, {
        // These options are the defaults for all files, but file-specific
        // options take precedence.
        level: 1,
        // Obfuscate last modified time by default
        mtime: new Date('1/1/1980')
    })
    // console.log('zipped', zipped)
    System.downloadBlob(zipped, 'download.zip', 'application/octet-stream')
}


// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="max-w-7xl mx-auto py-5">
        <h1 class="text-5xl font-medium">
            Noob Manager
        </h1>

        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id eius voluptatem minus natus at eveniet dolorum eos mollitia, maxime animi excepturi harum omnis illum odit recusandae pariatur! Unde, explicabo molestias.
        </p>

        <button
            @click="mint"
            type="button"
            class="w-full bg-cyan-600 border-2 border-cyan-800 rounded-xl py-3 px-3 flex flex-col items-center justify-center text-base font-medium text-indigo-700 shadow hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
        >

            <h3 class="text-4xl text-cyan-50 font-medium">
                Minting
            </h3>

            <span class="text-base text-cyan-200 font-medium italic">
                Generate NFTs and SFTs for sale
            </span>
        </button>

    </main>
</template>
