<template>
    <div>
        <NuxtLayout v-if="data" name="transcript">
            <Head>
                <Title>{{ $t('ticket-transcript-title', { 'ticket': data.ticket.id }) }}</Title>
                <Meta name="description" :content="t('ticket-transcript-description')" />
                <Meta name="og:description" :content="t('ticket-transcript-description')" />
                <Meta name="twitter:description" :content="t('ticket-transcript-description')" />
                <Meta name="og:title" :content="`${t('ticket-transcript-title', {'ticket': data.ticket.id})} &mdash; ${t('index-title')}`" />
                <Meta name="twitter:title" :content="`${t('ticket-transcript-title', {'ticket': data.ticket.id})} &mdash; ${t('index-title')}`" />
            </Head>
            <Breadcrumbs :crumbs="[{ name: t('link-home'), link: '/' }, { name: t('link-transcript'), link: `/transcript/${$route.params.id}` }]" />
            <h1>{{ $t('ticket-transcript-ticket-number', {'ticket': data.ticket.id }) }}</h1>
            <TranscriptMessages :data="data" />
            <template #sidebar>
                <TranscriptSidebar :data="data" :url="getUrl()" />
            </template>
        </NuxtLayout>
        <NuxtLayout v-else name="default">
            <ErrorPage :code="error.status">{{ error.message }}</ErrorPage>
        </NuxtLayout>
    </div>
</template>

<script setup>
import { Buffer } from 'buffer'
const { locale, t } = useI18n()
const localePath = useLocalePath()

let error = {
    status: "404",
    message: computed(() => t('error-transcript-not-found'))
};
const bucket = 'https://3bdd3bd3adb4679930d487e0b5f2d934.r2.cloudflarestorage.com/archived-tickets/';
const discord = 'https://cdn.discordapp.com/attachments/';

const isS3 = (id) => {
    return id.startsWith(bucket)
};

// Validate ID
const validateId = (parsedId) => {
    if (!parsedId) {
        return null;
    }

    // If ID is a valid S3 URL, it's a valid ID
    if (isS3(parsedId)) {
        return parsedId;
    }

    // If ID has three parts separated by forward slashes and ends in .json, it's a valid ID
    if (!parsedId.match(/^[0-9]{1,32}\/[0-9]{1,32}\/[a-zA-Z0-9\-_]{1,32}\.json$/)) {
        error = { status: "400", message: computed(() => t('error-transcript-bad-id')) }
        return null;
    }

    // Validate the file is from a valid channel
    const allowedChannels = ['885981365491888211', '977649978270969906', '977663053179023380'];
    if (parsedId.split('/')[0]) {
        if (!allowedChannels.includes(parsedId.split('/')[0])) {
            error = { status: "403", message: computed(() => t('error-transcript-forbidden'))}
            return null;
        }
    }

    return parsedId;
}

// Define async method
const getUrl = () => {
    const file = validateId(Buffer.from(useRoute().params.id, 'base64').toString('ascii'));
    if (!file) {
        return null;
    }

    return isS3(file) ? file : `${discord}${file}`;
}
const { data } = await useAsyncData('transcript', () => {
    const url = getUrl();
    if (!url) {
        return null;
    }

    const fetched = $fetch(url);
    if (!fetched) {
        return null;
    }
    return fetched;
});
</script>