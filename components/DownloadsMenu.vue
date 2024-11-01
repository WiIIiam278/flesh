<template>
    <div v-if="!canDownload()" class="upsell">
        <div v-if="user" class="error upsell">
            <IconifiedText icon="fa6-solid:lock"><h3>{{ $t('download-license-required') }}</h3></IconifiedText>
            <p>{{ $t('download-license-required-copy') }}</p>
        </div>
        <div v-else  class="error upsell">
            <IconifiedText icon="fa6-solid:lock"><h3>{{ $t('download-login-required') }}</h3></IconifiedText>
            <ButtonLink :href="`${useRuntimeConfig().public.API_BASE_URL}/login`" icon="fa6-solid:key" hollow>{{ $t('link-log-in') }}</ButtonLink>
        </div>
    </div>
    <div v-else-if="project.releaseChannels.length" class="downloads-menu">
        <LatestRelease :project="project" :channel="DEFAULT_CHANNEL" />
        <ReleasesMenu :project="project" :defaultChannel="DEFAULT_CHANNEL" />
    </div>
    <div v-else class="error upsell">
        <IconifiedText icon="fa6-solid:circle-info"><h3>{{ $t('download-no-versions') }}</h3></IconifiedText>
        <p>{{ $t('download-no-versions-copy') }}</p>
    </div>
</template>

<script setup>
const DEFAULT_CHANNEL = 'release';
const user = await useUser();
const { t } = useLocalePath();
const { project } = defineProps({
    project: {
        type: Object,
        required: true
    }
});

const canDownload = () => !project.restricted || user.value && (useIsUserRole(user.value, 'staff') || user.value.purchases.some(p => p === project.slug));
</script>

<style scoped>
.upsell {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 2rem 0;
}

.error {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 2rem 0;
}
</style>