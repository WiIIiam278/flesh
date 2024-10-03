<template>
    <div class="background" @click="close(false)">
        <div :class="`container ${!markdown ? 'fullsize' : 'small'}`">
            <div class="title" @click="(e) => e.stopPropagation()">
                <h2 v-if="modal.title">{{ modal.title }}</h2>
                <Icon class="close-button" @click="close(false)" name="fa6-solid:xmark" />
            </div>
            <div class="content">
                <p v-if="!modal.markdown">{{ modal.message }}</p>
                <MDC v-else :value="modal.message" tag="article" />
            </div>
            <div class="buttons">
                <button @click="close(false)">{{ $t(`button-${modal.type === 'alert' ? 'close' : 'cancel'}`) }}</button>
                <button :class="modal.type === 'confirm' ? 'delete' : ''" @click="close(true)" v-if="modal.type === 'confirm'">{{ $t('button-confirm') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const modal = useState('modal');

const close = (confirm) => {
    if (modal.value.type === 'confirm') {
        modal.value.confirm = confirm;
    }
    if (modal.value.onClose) {
        modal.value.onClose(confirm);
    }
    modal.value.show = false;
}
</script>

<style scoped>
.background {
    display: flex;
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    width: 100vw;
    height: 100vh;
    z-index: 100;
}

.background .container {
    margin: auto;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    background-color: var(--background);
    border-radius: 0.5rem;
    max-width: 50vw;
    max-height: 100vh;
    width: 650px;
    z-index: 110;
}

.container .small {
    height: 200px;
}

.container .title {
    margin-top: -0.2rem;
    display: flex;
    flex-direction: row;
}

.title .close-button {
    cursor: pointer;
    margin-left: auto;
    padding: 0.5rem;
    color: var(--light-gray)
}

.title h2 {
    margin-top: 0.5rem;
}

.close-button:hover {
    color: white;
}

.buttons {
    margin: auto auto 0 auto;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}
</style>