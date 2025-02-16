<template>
    <div class="navigation">
        <div class="section" v-for="section of navigation">
            <div class="title">{{ section.name }}</div>
            <div class="links">
                <div class="link" v-for="link of section.children">
                    {{ link.title }}
                    <div class="link child" v-for="sublink of link.children">
                        {{ link.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { navigation } = defineProps({
    navigation: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.navigation .section .title {
    color: var(--light-gray)
}

.link.child {
    margin-left: 0.5rem;
}
</style>