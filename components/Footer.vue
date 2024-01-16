<template>
    <footer>
        <div id="copyright">&copy; William278, {{ current_year }}</div>
        <div id="navigation">
            <ul>
                <li>
                    <NuxtLink to="/terms">Terms</NuxtLink>
                </li>
                <li>
                    <a href="https://buymeacoff.ee/william278" target="_blank">BuyMeACoffee</a>
                </li>
                <li>
                    <a href="https://x.com/William27528" target="_blank">Twitter/X</a>
                </li>
                <li>
                    <a href="https://youtube.com/@william278" target="_blank">YouTube</a>
                </li>
                <li>
                    <a href="https://github.com/WiIIiam278" target="_blank">GitHub</a>
                </li>
            </ul>
        </div>
        <span id="version">
            <a href="https://github.com/WiIIiam278/william278-site" target="_blank">
                <IconifiedText icon="fa6-solid:code-branch">{{ git_head }}</IconifiedText>    
            </a>
        </span>
    </footer>
</template>

<style scoped>
#version {
    position: absolute;
    right: 1em;
    margin: 0.5em;
    font-size: smaller;
}

#version a {
    color: var(--light-gray) !important;
}

#navigation ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
}

#navigation li::after {
    content: "－";
    margin: 0 0.25rem;
}

#navigation li:last-child:after {
    content: none
}

footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 2rem;
    color: var(--light-gray);
    margin-top: auto;
    justify-content: flex-end;
}

/* Smaller than 480px */
@media screen and (max-width: 30em) {
    #version {
        display: none;
    }

    #navigation li::after {
        content: none;
    }

    #navigation li {
        margin: 0 0.3rem;
    }
}
</style>

<script setup>
const config = useRuntimeConfig()

const current_year = new Date().getFullYear();
const git_head = config.public.GIT_HASH;
</script>