<template>
    <div class="error-page">
        <h1>{{ $t('error-page-title', { 'code': code }) }}</h1>
        <p>
            <slot />
        </p>
        <NuxtLink to="/">
            <IconifiedText icon="fa6-solid:arrow-left">{{ $t('button-back-to-home') }}</IconifiedText>
        </NuxtLink>
    </div>
</template>

<script setup>
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { code } = defineProps({
    code: {
        type: String,
        required: false,
        default: '404'
    }
})
</script>

<style scoped>
.error-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 0;
}

.error-page p {
    margin: 1rem;
    text-align: center;
}
</style>