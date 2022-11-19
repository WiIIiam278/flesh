<template>
    <article class="text" v-html="parsedMarkdown" />
</template>

<script setup>
import discord from 'discord-markdown';
const { toHTML } = discord;

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
    for (const user of transcript.users) {
        if (user && user.id && user.id === id && user.name) {
            return user.name;
        }
    }
    return id;
};

const resolveChannel = (id) => {
    for (const channel of transcript.channels) {
        if (channel && channel.id && channel.id === id && channel.name) {
            return channel.name;
        }
    }
    return id;
};

const resolveRole = (id) => {
    for (const role of transcript.roles) {
        if (role && role.id && role.id === id && role.name) {
            return role.name;
        }
    }
    return id;
};

const parsedMarkdown = toHTML(formatDiscord(value, transcript) , {
    embed: embed,
    discordCallback: {
        user: node => '@' + resolveUser(node.id),
        channel: node => '#' + resolveChannel(node.id),
        role: node => '@' + resolveRole(node.id),
        everyone: () => '@everyone',
        here: () => '@here',
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