<template>
    <div class="breadcrumbs">
        <div v-for="crumb of crumbs">
            <NuxtLink class="crumb-link" :to="crumb.link">{{ crumb.name }}</NuxtLink>
            <BreadcrumbDivider />
        </div>
    </div>
</template>

<script>
import BreadcrumbDivider from './BreadcrumbDivider.vue';

export default {
    name: "Breadcrumbs",
    props: {
        crumbs: {
            type: Array,
            required: true
        }
    },
    components: { BreadcrumbDivider }
}
</script>

<style scoped>
.breadcrumbs {
    display: flex;
    flex-direction: row;
    margin: 0.5rem 0;
}
</style>