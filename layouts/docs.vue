<!-- A project doc page -->
<template>
    <div class="page">
        <Navbar />
        <div class="docs">
            <aside class="sidebar">
                <slot name="sidebar" />
            </aside>
            <div class="body">
                <div class="content">
                    <slot />
                </div>
                <Footer />
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100% !important;
    width: 100%;
}

.page .docs {
    max-height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
    max-height: 92vh;
    overflow: hidden;
}

.docs .body {
    flex: 1;
    max-width: 1280px;
    width: calc(80% - 2rem);
    overflow-y: scroll;
}

.body .content {
    padding: 1rem 2rem;
    /* Account for height of footer */
    min-height: calc(100% - 70px);
}

.docs .sidebar {
    flex: 1;
    max-width: 300px;
    width: calc(20% - 2rem);
    background-color: var(--dark-gray);
    padding: 1rem;
    overflow-y: auto;
}

/* Less than 850px */
@media screen and (max-width: 850px) {
    .page .docs {
        flex-direction: column-reverse;
        max-width: 95vw;
        gap: 0.5rem;
    }

    .docs .content {
        max-width: 100%;
        width: 100%;
        padding: 0;
    }

    .docs .sidebar {
        max-width: 100%;
        width: 100%;
    }
}
</style>