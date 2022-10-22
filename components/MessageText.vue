<template>
    <div class="text">
        <article>
            <ContentRenderer class="renderer" :value="parsedMarkdown" />
        </article>
    </div>
</template>

<script setup>
import markdownParser from "@nuxt/content/transformers/markdown";

const { value } = defineProps({
    value: {
        type: String,
        required: true
    }
});

const parsedMarkdown = await markdownParser.parse(
    'discord',
    value.replaceAll("\n", "<br/>")
);
</script>