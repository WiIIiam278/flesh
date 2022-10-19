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
    max-width: 65vw;
    width: 90vw;
}

#project-sidebar {
    flex: 1;
    padding: 0 1rem;
    max-width: 350px;
    width: 25vw;
}

/* Less than 650px */
@media screen and (max-width: 650px) {
    #project-page {
        flex-direction: column-reverse;
        max-width: 85vw;
        margin: 0 auto;
    }

    #project-readme {
        max-width: 100%;
        width: 100%;
        padding: 0;
    }

    #project-sidebar {
        max-width: 100%;
        width: 100%;
        padding: 0;
    }
}
</style>