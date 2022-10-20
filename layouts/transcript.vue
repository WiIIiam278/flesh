<!-- A support ticket transcript page -->
<template>
    <div id="page-body">
        <Navbar />
        <div id="transcript-page">
            <div id="transcript-sidebar" class="shadow">
                <slot name="sidebar" />
            </div>
            <div id="transcript-content">
                <slot />
            </div>
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

#transcript-page {
    margin: 1rem auto;
    max-width: 1400px;
    display: flex;
}

#transcript-content {
    flex: 1;
    padding: 0 2rem;
    max-width: 65vw;
    width: 90vw;
}

#transcript-sidebar {
    flex: 1;
    padding: 1rem;
    max-width: 250px;
    width: 20vw;
    background-color: var(--gray);
    border-radius: 0.5rem;
    height: fit-content;
}

/* Less than 850px */
@media screen and (max-width: 850px) {
    #transcript-page {
        flex-direction: column-reverse;
        max-width: 85vw;
        margin: 0 auto;
    }

    #transcript-content {
        max-width: 100%;
        width: 100%;
        padding: 0;
    }

    #transcript-sidebar {
        max-width: 100%;
        width: 100%;
        padding: 0;
    }
}
</style>