<template>
    <NuxtLayout v-if="data" name="transcript">
        <Head>
            <Title>Ticket #{{ data.ticket.id }} Transcript - HuskHelp</Title>
            <Meta name="description" :content="description" />
            <Meta name="og:description" :content="description" />
            <Meta name="twitter:description" :content="description" />
        </Head>
        <Breadcrumbs :crumbs="[{ name: 'Home', link: '/' }, { name: 'Transcript', link: `/transcript/${$route.params.id}` }]" />
        <h1>Ticket #{{ data.ticket.id }}</h1>
        <TranscriptMessages :data="data" />
        <template #sidebar>
            <TranscriptSidebar :data="data" />
        </template>
    </NuxtLayout>
    <NuxtLayout v-else name="default">
        <ErrorPage :code="error.status">{{ error.message }}</ErrorPage>
    </NuxtLayout>
</template>

<script setup>
let error = {
    status: 404,
    message: 'Transcript not found'
}

// Validate ID
const validateId = (parsedId) => {
    // If ID has three parts separated by forward slashes and ends in .json, it's a valid ID
    if (!parsedId || !parsedId.match(/^[0-9]{1,32}\/[0-9]{1,32}\/[a-zA-Z0-9\-_]{1,32}\.json$/)) {
        error = { status: 400, message: 'Invalid transcript ID' }
        return null;
    }

    // Validate the file is from a valid channel
    const allowedChannels = ['885981365491888211', '977649978270969906', '977663053179023380'];
    if (parsedId.split('/')[0]) {
        if (!allowedChannels.includes(parsedId.split('/')[0])) {
            error = { status: 403, message: 'Forbidden transcript channel' }
            return null;
        }
    }

    return parsedId;
}

// Define async method
const { data } = await useAsyncData('transcript', () => {
    const id = validateId(Buffer.from(useRoute().params.id, 'base64url').toString('ascii'));
    if (!id) {
        return null;
    }
    return $fetch(`https://cdn.discordapp.com/attachments/${id}`);
});

const description = 'View a transcript for this HuskHelp Support Ticket.';
</script>