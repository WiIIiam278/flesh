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
                <Footer class="desktop-footer" />
            </div>
        </div>
        <Footer class="mobile-footer" />
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    background-color: var(--dark-gray);
    height: 100vh;
    width: 100%;
}

.page .docs {
    max-height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
    max-height: calc(100vh - 64px);
    overflow: hidden;
}

.docs .body {
    flex: 1;
    background-color: var(--background);
    max-width: 1200px;
    width: calc(80% - 2rem);
    overflow-y: auto;
}

.body .content {
    padding: 1rem 2rem;
    padding-bottom: 0;
    /* Account for height of footer */
    min-height: calc(100% - 71px);
}

.content:deep(img) {
    max-width: 65%;
}

.docs .sidebar {
    flex: 1;
    max-width: 300px;
    width: calc(20% - 2rem);
    background-color: var(--dark-gray);
    padding: 1rem;
    overflow-y: auto;
}

.desktop-footer {
    display: flex;
}

.mobile-footer {
    display: none;
}

/* Less than 850px */
@media screen and (max-width: 850px) {
    .page {
        height: 100%;
    }

    .page .docs {
        flex-direction: column-reverse;
        max-height: unset;
        overflow: auto;
        gap: 0.5rem;
    }

    .docs .body {
        max-width: 100%;
        width: 100% !important;
        padding: 0;
    }

    .body .content {
        max-width: unset;
    }

    .content:deep(article) {
        max-width: unset;
    }

    .content:deep(img) {
        width: unset;
        max-width: 100%;
    }

    .docs .sidebar {
        max-width: 100%;
        width: 100%;
        padding: 1rem 0;
    }

    .desktop-footer {
        display: none;
    }

    .mobile-footer {
        display: flex;
    }
}
</style>