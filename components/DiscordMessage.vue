<template>
    <div class="message-block shadow">
        <div class="avatar">
            <img :src="getUser(messages[0].sender).pfp" />
        </div>
        <div class="content">
            <div class="sender">
                <div class="user">
                    <span class="name">
                        {{ getUser(messages[0].sender).name }}
                    </span>
                    <span class="disambiguator">
                        #{{ getUser(messages[0].sender).disambiguator }}
                    </span>
                </div>
                <div class="timestamp">
                    {{ getTimestampString(parseInt(messages[0].timestamp)) }}
                </div>
            </div>
            <div v-for="message in messages">
                <MessageText v-if="message.message" :value="message.message" :transcript="transcript" />
                <div v-if="message.embeds">
                    <DiscordEmbed v-for="embed in message.embeds" :embed="embed" :transcript="transcript" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.message-block {
    display: flex;
    flex-direction: row;
    margin: 0.5rem 0;
    padding: 0.75rem;
    border-radius: 0.5rem;
    background-color: var(--gray);
}

.avatar {
    margin-right: 0.75rem;
}

.avatar img {
    max-width: 50px;
    height: auto;
    border-radius: 100%;
}

.sender .disambiguator,
.sender .timestamp {
    color: var(--light-gray);
}

.sender .timestamp {
    font-size: 0.8rem;
}

.content {
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>

<script>
import DiscordEmbed from './DiscordEmbed.vue';

export default {
    props: {
        messages: {
            type: Array,
            required: true
        },
        transcript: {
            type: Object,
            required: true
        }
    },
    methods: {
        getUser(id) {
            const member = this.transcript.users.find((member) => member.id === id);
            if (member) {
                return member;
            }
            return {
                id: id,
                username: "Unknown User",
                discriminator: "0000",
                pfp: null
            };
        },
        getTimestampString(timestamp) {
            const date = new Date(timestamp);
            return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;
        },
        getRole(id) {
            const role = this.transcript.roles.find((role) => role.id === id);
            if (role) {
                return role;
            }
            return {
                id: id,
                name: "Unknown Role",
                color: "#000000"
            };
        },
        getChannel(id) {
            const channel = this.transcript.channels.find((channel) => channel.id === id);
            if (channel) {
                return channel;
            }
            return {
                id: id,
                name: "Unknown Channel"
            };
        },
        getEmoji(id) {
            const emoji = this.transcript.emojis.find((emoji) => emoji.id === id);
            if (emoji) {
                return emoji;
            }
            return {
                id: id,
                name: "Unknown Emoji",
                url: null
            };
        }
    },
    components: { DiscordEmbed }
}
</script>