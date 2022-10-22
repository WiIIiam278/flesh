<template>
    <div class="messages">
        <SystemMessage>Ticket opened on {{ getTimestampString(parseInt(data.ticket.open_timestamp)) }}</SystemMessage>
        <DiscordMessage v-for="messages in getMessageBlocks(data.messages)" :transcript="data" :messages="messages" />
        <SystemMessage icon="fa6-solid:lock">Ticket closed on {{ getTimestampString(parseInt(data.ticket.close_timestamp)) }}</SystemMessage>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        getMessageBlocks(messages) {
            const blocks = [];
            let lastSender = null;
            let lastTimestamp = null;
            let currentBlock = [];
            for (const message of messages) {
                if (message.sender !== lastSender || message.timestamp - lastTimestamp > 300000) {
                    if (currentBlock.length > 0) {
                        blocks.push(currentBlock);
                    }
                    currentBlock = [];
                }
                lastTimestamp = message.timestamp;
                lastSender = message.sender;
                currentBlock.push(message);
            }
            if (currentBlock.length > 0) {
                blocks.push(currentBlock);
            }
            return blocks;
        },
        getTimestampString(timestamp) {
            const date = new Date(timestamp);
            return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
        }
    }
}

</script>

<style scoped>
.messages {
    width: 100%;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
}
</style>