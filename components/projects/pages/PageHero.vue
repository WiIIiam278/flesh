<template>
    <div class="hero shadow" :style="`background-color: ${color1}; background: linear-gradient(180deg, ${color1} 0%, ${color2} 100%);`">
        <PageHeaderWithText :title="title" :body="body">
            <slot />
        </PageHeaderWithText>
    </div>
</template>

<script setup>
const { 
    title, body, color1, color2
} = defineProps({
    title: { type: String, required: false, default: '' },
    body: { type: String, required: false, default: '' },
    color1: { type: String, required: false, default: 'transparent' },
    color2: { type: String, required: false, default: 'transparent' },
})
</script>

<style scoped>
.hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    height: 15rem;
    width: 100%;
}
</style>