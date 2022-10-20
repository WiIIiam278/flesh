<template>
    <div class="messages">
        <SystemMessage>Ticket opened</SystemMessage>
        
        <SystemMessage icon="fa6-solid:lock">Ticket closed</SystemMessage>
    </div>
</template>

<style scoped>
.messages {
    width: 100%;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
}
</style>