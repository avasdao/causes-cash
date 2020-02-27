<template>
    <main>
        <Title />
        <Content />
        <History />
    </main>
</template>

<script>
/* Import components. */
import Content from './Details/Content.vue'
import History from './Details/History.vue'
import Title from './Details/Title.vue'

export default {
    components: {
        Content,
        History,
        Title,
    }
}
</script>
