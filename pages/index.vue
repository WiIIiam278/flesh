<template>
    <NuxtLayout>
        <div id="page-content">
            <div id="left-column">
                <h1>My projects</h1>
                <ProjectGrid />
            </div>
            <div id="right-column">
                <ContentDoc />
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped>
#page-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 auto;
    padding-top: 1.5rem;
    max-width: 1400px;
    width: 90vw;
}

#left-column {
    flex: 1;
    padding: 0 1rem;
}

#right-column {
    flex: 1;
    padding: 0 1rem;
}
</style>

<script>
definePageMeta({
    description: 'Open source Minecraft server software & game projects.',
    layout: 'home'
})
</script>