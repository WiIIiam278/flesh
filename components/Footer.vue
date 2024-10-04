<template>
    <footer>
        <div id="copyright">{{ $t('footer-copyright', { 'year': currentYear }) }}</div>
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
        <span id="version">
            <a href="https://github.com/WiIIiam278/william278-site" target="_blank">
                <IconifiedText icon="fa6-solid:code-branch">{{ gitHead }}</IconifiedText>
            </a>
        </span>
    </footer>
</template>

<script setup>
const config = useRuntimeConfig()
const { locale, t } = useI18n()
const localePath = useLocalePath()

const currentYear = new Date().getFullYear();
const gitHead = config.public.GIT_HASH;
</script>

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
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        text-align: center;
    }
}
</style>