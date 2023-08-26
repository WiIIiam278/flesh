<template>
    <nav class="shadow">
        <h1 id="logo">
            <a href="/">William278</a>
        </h1>
        <div id="navigation">
            <div id="search">
                <AlgoliaDocSearch />
            </div>
            <div id="links">
                <ul>
                    <li>
                        <NuxtLink to="/">
                            <IconifiedText icon="fa6-solid:house">Home</IconifiedText>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/docs">
                            <IconifiedText icon="fa6-solid:book">Docs</IconifiedText>
                        </NuxtLink>
                    </li>
                    <li>
                        <a href="https://discord.gg/tVYhJfyDWG" target="_blank" class="button">
                            <IconifiedText icon="fa6-brands:discord">Support</IconifiedText>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;
    background-color: var(--gray);
    font-size: 1.2rem;
    font-weight: 500;
    height: 4rem;
}

nav #logo {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent);
}

nav #navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}

nav #links ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

/* Less than 600px */
@media screen and (max-width: 37.5em) {
    nav {
        flex-direction: column;
        height: 6rem;
        justify-content: center;
        align-items: center;
    }

    nav #logo {
        margin-bottom: 0.2rem;
    }
}

/* Less than 340 */
@media screen and (max-width: 21.25em) {
    nav #logo {
        font-size: 1.7rem;
    }

    nav #navigation {
        font-size: 0.9rem;
    }

    nav #navigation {
        width: 100%;
    }
}
</style>