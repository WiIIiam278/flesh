<!-- A project doc page -->
<template>
    <div id="page-body">
        <Navbar />
        <div id="docs-page">
            <div id="docs-sidebar" class="shadow sidebar">
                <slot name="sidebar" />
            </div>
            <div id="docs-content">
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

#docs-page {
    margin: 1rem auto;
    max-width: 1400px;
    display: flex;
}

#docs-content {
    flex: 1;
    padding: 0 2rem;
    max-width: 65vw;
    width: 90vw;
}

#docs-sidebar {
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
    #docs-page {
        flex-direction: column-reverse;
        max-width: 90vw;
        gap: 0.5rem;
    }

    #docs-content {
        max-width: 100%;
        width: 100%;
        padding: 0;
    }

    #docs-sidebar {
        max-width: 100%;
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;
    }
}
</style>