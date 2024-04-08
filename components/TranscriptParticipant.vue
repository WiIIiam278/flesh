<template>
    <div class="transcript-participant">
        <div class="avatar">
            <img :src="user.pfp" />
        </div>
        <div class="profile">
            <div class="name">
                {{ user.name }}<span class="disambiguator" v-if="parseInt(user.disambiguator) > 0">#{{
                user.disambiguator }}</span>
            </div>
            <Pill v-if="creator" class="creator" color="dark-gray">{{ $t('ticket-transcript-creator') }}</Pill>
        </div>
    </div>
</template>

<script setup>
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { user, creator } = defineProps({
    user: {
        type: Object,
        required: true
    },
    creator: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>

<style scoped>
.transcript-participant {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
}

.transcript-participant .avatar {
    display: flex;
    align-items: center;
}

.avatar img {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
}

.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.profile .creator {
    font-size: 0.9rem;
    margin-top: 0.1rem;
    margin-left: 0.3rem;
    align-self: flex-start;
}

.creator span {
    margin: 0;
}

.profile .disambiguator {
    color: var(--light-gray);
}
</style>