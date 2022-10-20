<template>
    <div class="breadcrumbs">
        <div v-for="crumb of crumbs" class="crumb">
            <NuxtLink class="crumb-link" :to="crumb.link">{{ crumb.name }}</NuxtLink>
            <span class="crumb-divider">/</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumbs',
    props: {
        crumbs: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.breadcrumbs {
    display: flex;
    flex-direction: row;
    margin: 0.5rem 0;
}
.crumb .crumb-divider {
    margin: 0 0.4rem;
    color: var(--light-gray);
}
</style>