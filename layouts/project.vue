<!-- A page for projects -->
<template>
    <div id="page-body">
        <Navbar />
        <div id="project-page">
            <div id="project-readme">
                <slot />
            </div>
            <div id="project-sidebar">
                <slot name="sidebar" />
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

#project-page {
    margin: 1rem auto;
    max-width: 1400px;
    display: flex;
}

#project-readme {
    flex: 1;
    padding: 0 1rem;
    width: 90vw;
}

#project-sidebar {
    flex: 1;
    padding: 0 1rem;
    max-width: 300px;
}
</style>