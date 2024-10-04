<template>
    <div id="page-body">
        <Head>
            <Meta name="og:image" :content="`/images/thumbnails/page/Error%20${error.statusCode}/card.png`" />
            <Meta name="twitter:image" :content="`/images/thumbnails/page/Error%20${error.statusCode}/card.png`" />
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:creator" content="@William27528" />
        </Head>
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
        return `Error`;
    },
    meta: [
        {
            name: 'description',
            content: 'Easily-accessible documentation and information site for all of William278\'s Minecraft plugins, projects & games'
        }
    ],
})
</script>