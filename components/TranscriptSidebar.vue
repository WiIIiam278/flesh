<template>
    <div class="transcript-sidebar">
        <h2>Ticket Transcript</h2>
        <div class="pills">
            <Pill color="dark-gray">
                <IconifiedText icon="fa6-solid:tag">{{ data.ticket.project }}</IconifiedText>
            </Pill>
            <Pill color="dark-gray">
                <IconifiedText icon="fa6-solid:hashtag">ticket-{{ data.ticket.id }}</IconifiedText>
            </Pill>
            <Pill color="dark-gray">
                <IconifiedText icon="fa6-solid:ticket">{{ getTimestampString(data.ticket.close_timestamp) }}
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
            <div v-for="participant of data.ticket.participants.reverse()">
                <TranscriptParticipant :user="data.users.find(user => user.id === participant)" :creator="participant === data.ticket.creator" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.transcript-sidebar h2 {
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 0.5rem;
}

.transcript-sidebar h3 {
    border-bottom: var(--light-gray) 0.125rem solid;
    padding-bottom: 0.15rem;
    margin: 0.8rem 0;
    margin-bottom: 0.7rem;
}

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
</style>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        getTimestampString(timestamp) {
            const date = new Date(parseInt(timestamp));
            return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        }
    }
}
</script>