<template>
    <div id="page-body">
        <Navbar />
        <div>
            <ErrorPage :code="error.statusCode.toString()">
            {{ error.message }}
            </ErrorPage>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
#page-body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>

<script setup>
defineProps({
    error: Object
})

definePageMeta({
    layout: 'default'
})

useHead({
    titleTemplate: (titleChunk) => {
        return `Error - William278.net`;
    },
    meta: [
        {
            name: 'description',
            content: 'Easily-accessible documentation and information site for all of William278\'s Minecraft plugins, projects & games'
        }
    ],
})
</script>