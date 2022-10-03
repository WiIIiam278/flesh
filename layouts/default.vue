<!-- A default page with content margins -->
<template>
    <div id="page-body">
        <Navbar />
        <div id="page-content">
            <slot />
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

#page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    max-width: 1100px;
}

#page-content {
    margin: 0 auto;
    max-width: 1100px;
    padding: 0 2rem;
}
</style>