<template>
    <nav>
        <h1 id="logo">
            <a href="/">William278</a>
        </h1>
        <ul id="navigation">
            <li>
                <NuxtLink to="/">
                    <IconifiedText icon="house" text="Home" />
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/docs">
                    <IconifiedText icon="book" text="Docs" />
                </NuxtLink>
            </li>
            <li>
                <a href="https://discord.gg/tVYhJfyDWG" target="_blank" class="button">
                    <IconifiedText icon="comment" text="Support" />
                </a>
            </li>
        </ul> 
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    background-color: var(--gray);
    font-size: 1.2rem;
    font-weight: 500;
    height: 4rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

nav #logo {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-weight: 700;
}

nav #navigation {
    width: 17.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    list-style: none;
}
</style>