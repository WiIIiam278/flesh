<template>
    <footer>
        <div id="copyright">{{ $t('footer-copyright', { 'year': new Date().getFullYear() }) }}</div>
        <div id="navigation">
            <ul>
                <li>
                    <NuxtLink to="/terms">{{ $t('link-terms') }}</NuxtLink>
                </li>
                <li>
                    <a href="https://status.william278.net/" target="_blank">{{ $t('footer-status') }}</a>
                </li>
                <li>
                    <a href="https://buymeacoff.ee/william278" target="_blank">{{ $t('footer-buymeacoffee') }}</a>
                </li>
                <li>
                    <a href="https://x.com/William27528" target="_blank">{{ $t('footer-twitter-x') }}</a>
                </li>
                <li>
                    <a href="https://youtube.com/@william278" target="_blank">{{ $t('footer-youtube') }}</a>
                </li>
                <li>
                    <a href="https://github.com/WiIIiam278" target="_blank">{{ $t('footer-github') }}</a>
                </li>
            </ul>
        </div>
        <div id="version">
            <a href="https://github.com/WiIIiam278/william278-site" target="_blank">
                <IconifiedText icon="fa6-solid:code-branch">{{ gitHead }}@master</IconifiedText>
            </a>
        </div>
    </footer>
</template>

<script setup>
const { t } = useI18n()
const config = useRuntimeConfig()
const gitHead = config.public.GIT_HASH;
</script>

<style scoped>
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
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 2rem;
    margin-top: auto;
    color: var(--light-gray);
    background: linear-gradient(180deg, var(--background) 0%, var(--dark-gray) 100%);
}

/* Smaller than 600px */
@media screen and (max-width: 600px) {
    #version {
        display: none;
    }

    #navigation li::after {
        content: none;
    }

    footer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    #navigation ul {
        width: 80vw;
        display: block;
        text-align: center;
        columns: 2 !important;
        -webkit-columns: 2 !important;
        -moz-columns: 2 !important;
    }
}
</style>