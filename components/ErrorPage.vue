<template>
    <div class="error-page">
        <h1>Error {{ code }}</h1>
        <p>
            <slot />
        </p>
        <NuxtLink to="/">
            <IconifiedText icon="fa6-solid:arrow-left">Back to home</IconifiedText>
        </NuxtLink>
    </div>
</template>

<script>
export default {
    props: {
        code: {
            type: Number,
            required: false
        }
    }
}
</script>

<style scoped>
.error-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto 0;
}
</style>