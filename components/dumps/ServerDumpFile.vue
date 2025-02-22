<template>
    <div class="container">
        <MonacoEditor class="editor" v-model="contents" :options="{ readOnly: true, theme: 'vs-dark' }" :lang="lang" />
    </div>
</template>

<script setup>
const { lang } = defineProps({
    lang: {
        type: String,
        required: false,
        default: 'yaml'
    }
})
const contents = defineModel('contents');
</script>

<style scoped>
.editor {
    height: 75vh;
}
</style>