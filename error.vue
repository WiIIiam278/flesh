<template>
    <div id="page-body">
        <Navbar />
        <div id="error-page">
            <h1>Error {{ error.statusCode }}</h1>
            <p>{{ error.statusMessage }}</p>
            <NuxtLink to="/">
                <IconifiedText icon="fa6-solid:arrow-left">Back to home</IconifiedText>
            </NuxtLink>
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

#error-page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    max-width: 1100px;
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