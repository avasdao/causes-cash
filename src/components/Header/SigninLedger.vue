<template>
    <main>
        <div class="instructions">
            <h3>INSTRUCTIONS</h3>

            ...
        </div>

        <div class="coming-soon">
            Ledger Nano integration is coming soon...
            <br />Thank you for your patience and support 😉
        </div>
    </main>
</template>

<script>
/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            //
        }
    },
    methods: {
        //
    },
}
</script>

<style scoped>
div.instructions {
    padding: 0 50px 15px;
    line-height: 25px;
}
div.instructions .warning {
    color: red;
    font-weight: 600;
}

.coming-soon {
    width: 100%;
    text-align: center;
    padding: 20px 0 40px;
    font-size: 1.6em;
    font-weight: 600;
    color: rgba(30, 30, 30, 0.5);
}
</style>
