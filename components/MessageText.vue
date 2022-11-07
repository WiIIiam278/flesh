<template>
    <article class="text" v-html="parsedMarkdown" />
</template>

<script setup>
const { toHTML } = require('discord-markdown');

const { value, transcript, embed } = defineProps({
    value: {
        type: String,
        required: true
    },
    transcript: {
        type: Object,
        required: true
    },
    embed: {
        type: Boolean,
        required: false,
        default: false
    }
});

const formatDiscord = (text, transcript) => {
    // Get all matches of the <!user:NUMBER> tag
    let tags = ['user', 'emote', 'role', 'channel'];
    for (const tag of tags) {
        const matches = text.matchAll(new RegExp(`<!${tag}:(\\d+)>`, 'g'));
        for (const match of matches) {
            let value = match[1];
            if (value) {
                switch (tag) {
                    case 'user':
                        text = text.replaceAll(match[0], `<@${value}>`);
                        break;
                    case 'emote':
                        let name = transcript.emotes.find((emote) => emote.id === value).name;
                        text = text.replaceAll(match[0], `<:${name}:${value}>`);
                        break;
                    case 'role':
                        text = text.replaceAll(match[0], `<@&${value}>`);
                        break;
                    case 'channel':
                        text = text.replaceAll(match[0], `<#${value}>`);
                        break;
                }
            }
        }
    }
    return text;
};

const resolveUser = (id) => {
    let user = transcript.users.find((user) => user.id === id);
    if (user) {
        return user.name;
    }
    return id;
};

const resolveChannel = (id) => {
    let channel = transcript.channels.find(channel => channel.id === node.id);
    if (channel) {
        return channel.name;
    }
    return id;
};

const resolveRole = (id) => {
    let role = transcript.roles.find(role => role.id === node.id);
    if (role) {
        return role.name;
    }
    return id;
};

const parsedMarkdown = toHTML(formatDiscord(value, transcript), {
    embed: embed,
    discordCallback: {
        user: node => '@' + resolveUser(node.id),
    }
});
</script>

<style scoped>
.title {
    font-size: 1.2em;
    font-weight: bold;
}

.text {
    margin: 0.25rem 0;
}
</style>

<style>
.d-mention {
    background-color: var(--dark-gray);
    border-radius: 0.25rem;
    padding: 0.1rem;
}

.d-emoji {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
}

.d-user,
.d-role,
.d-channel {
    color: var(--accent);
}
</style>