<template>
    <div class="message-block shadow">
        <div class="avatar">
            <div class="reply-line" v-if="messages[0].reply_snippet"></div>
            <img :src="getUser(messages[0].sender).pfp" />
        </div>
        <div class="content">
            <div class="reply-text" v-if="messages[0].reply_snippet">
                <span class="reply-sender">
                    <img :src="getUser(messages[0].reply_snippet.sender).pfp" />
                    <span class="name">
                        {{ getUser(messages[0].reply_snippet.sender).name }}
                    </span>
                    <span class="disambiguator">
                            #{{ getUser(messages[0].sender).disambiguator }}
                    </span>
                </span>
                <span class="text">
                    {{ messages[0].reply_snippet.message }}
                </span>
            </div>
            <div class="sender">
                <div class="user">
                    {{ getUser(messages[0].sender).name }}
                    #{{ getUser(messages[0].sender).disambiguator }}
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

.reply-line {
    height: 0.7rem;
    width: 2rem;
    margin-left: 1.5rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    border-left: 0.15rem solid var(--light-gray);
    border-top: 0.15rem solid var(--light-gray);
    border-radius: 0.5rem 0 0 0;
}

.reply-sender {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 0.3rem;
}

.reply-sender img {
    width: 1.15rem;
    height: 1.15rem;
    border-radius: 50%;
    margin-right: 0.2rem;
}

.reply-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--light-gray);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
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