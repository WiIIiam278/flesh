<template>
    <div class="background" @click="() => modal.type !== 'input' ? close(false) : {}">
        <div :class="`container ${!markdown ? 'fullsize' : 'small'}`"  @click="(e) => e.stopPropagation()">
            <div class="title">
                <h2 v-if="modal.title">{{ modal.title }}</h2>
                <Icon class="close-button" @click="close(false)" name="fa6-solid:xmark" />
            </div>
            <div v-if="modal.type === 'download'" class="downloads">
                <a class="download-button shadow" v-for="download in modal.data.downloads" :href="useDownloadUrl(modal.data.project, modal.data.channel, modal.data.release, download.distribution)">
                    <img class="icon" :src="`/images/platforms/${download.distribution.groupName}.png`" onerror="this.style.display='none'" />
                    <div class="details">
                        <div class="name">{{ download.distribution.description }}</div>
                        <div class="file">
                            <span class="file">{{ download.name }}</span>
                            <span class="size-hash">
                                {{ $t('download-file-size', { 'size': useFormattedFileSize(download.fileSize) }) }}
                            </span>
                        </div>
                    </div>
                </a>
            </div>
            <div v-else class="content">
                <p v-if="!modal.markdown">{{ modal.message }}</p>
                <MDC v-else :value="modal.message" tag="article" />
            </div>
            <div :class="`input ${modal.inputError ? 'error' : ''}`" v-if="modal.type === 'input'">
                <input @click="modal.inputError = false" type="text" v-model="modal.inputText" :placeholder="modal.title" />
            </div>
            <div class="buttons">
                <button @click="close(false)">{{ $t(`button-${modal.type === 'alert' ? 'close' : 'cancel'}`) }}</button>
                <button :class="modal.type === 'confirm' ? 'delete' : ''" @click="close(true, modal.inputText ?? null)" v-if="modal.type === 'confirm' || modal.type === 'input'">{{ $t('button-confirm') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const modal = useState('modal');

const close = (confirm, inputText = null) => {
    // Validate before close
    if (modal.value.type === 'input' && confirm && !modal.value.inputValidator(inputText)) {
        modal.value.inputError = true;
        return;
    }
    modal.value.inputError = false;

    // Confirm-close
    if (modal.value.type === 'confirm') {
        modal.value.confirm = confirm;
    }

    if (modal.value.onClose) {
        modal.value.onClose(confirm, inputText);
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

.container.small {
    height: 200px;
}

.container.fullsize .content, .container.fullsize .downloads {
    max-height: 65vh;
    overflow: auto;
    margin-bottom: 1rem;
}

.input {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    width: 100%;
}

.input input {
    width: 60%;
}

.input.error input {
    color: var(--red) !important;
    border-color: var(--red) !important;
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

.downloads .download-button {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    border: 0.15rem solid var(--gray);
    margin: 1rem auto;
    max-width: 420px;
    border-radius: 0.5rem;
    background-color: var(--gray);
    color: var(--accent);
    cursor: pointer;
}

.downloads .download-button:hover, .version .download-button:hover {
    background-color: var(--dark-gray);
    background: linear-gradient(transparent, #00fb9b1e);
    text-decoration: none;
}

.downloads .download-button .icon {
    width: 2rem;
    max-height: 4rem;
}

.downloads .download-button .details {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.downloads .details .name {
    font-size: 1.1rem;
    font-weight: 700;
}

.downloads .details .file {
    color: var(--light-gray);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
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


/* Mobile user container */
@media screen and (max-width: 950px) {
    .background .container {
        max-width: 75vw;
    }
    
    .input input {
        width: 100%;
    }
}

@media screen and (max-width: 550px) {
    .container.fullsize .content,  .container.fullsize .downloads {
        max-height: 100%;
        overflow: auto;
        margin-bottom: 1rem;
    }

    .background .container {
        max-width: 85vw;
        max-height: 95vh;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
}
</style>