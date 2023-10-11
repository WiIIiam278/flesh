<template>
    <h2>Ticket Transcript</h2>
    <div class="pills">
        <Pill color="dark-gray">
            <IconifiedText icon="fa6-solid:tag">{{ data.ticket.project }}</IconifiedText>
        </Pill>
        <Pill color="dark-gray">
            <IconifiedText icon="fa6-solid:hashtag">ticket-{{ data.ticket.id }}</IconifiedText>
        </Pill>
        <Pill color="dark-gray">
            <IconifiedText icon="fa6-solid:ticket">{{ getTimestampString(data.ticket.open_timestamp) }}
            </IconifiedText>
        </Pill>
        <Pill color="dark-gray">
            <IconifiedText icon="fa6-solid:lock">{{ getTimestampString(data.ticket.close_timestamp) }}
            </IconifiedText>
        </Pill>
    </div>
    <h3>Topic</h3>
    <div class="topic">
        {{ data.ticket.topic }}
    </div>
    <h3>Participants</h3>
    <div class="participants">
        <div v-for="participant of data.ticket.participants">
            <TranscriptParticipant :user="getParticipant(participant)" :creator="participant === data.ticket.creator" />
        </div>
    </div>
    <div class="home-button">
        <ButtonLink link="/" icon="fa6-solid:house" hollow>Home</ButtonLink>
    </div>
</template>

<style scoped>
.pills {
    font-size: 0.9em !important;
    flex-direction: row;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
}

.pills span {
    margin: 0;
}

.topic {
    word-break: break-word;
    white-space: pre-wrap;
    overflow-y: hidden;
    max-height: 15rem;
    text-overflow: ellipsis;
}

.home-button {
    margin-top: 1.25rem;
}
</style>

<script setup>
const { data } = defineProps({
    data: {
        type: Object,
        required: true
    }
});

// Methods
const getTimestampString = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

const getParticipant = (id) => {
    if (data.users) {
        for (const user of data.users) {
            if (user.id && user.id === id) {
                return user;
            }
        }
    }
    return {
        id: id,
        name: 'Unknown',
        disambiguator: '0000',
        pfp: 'https://cdn.discordapp.com/embed/avatars/1.png'
    };
}
</script>