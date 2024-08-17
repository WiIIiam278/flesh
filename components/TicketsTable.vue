<template>
    <article class="tickets-table">
        <div v-if="tickets.value" class="search-options">
            <b>{{ t('tickets-header-record-count', { 'count': tickets.value.page.totalElements }) }}</b>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="client" v-if="!user">{{ t('tickets-header-client') }}</th>
                    <th class="number">{{ t('tickets-header-number') }}</th>
                    <th class="subject">{{ t('tickets-header-subject') }}</th>
                    <th class="description">{{ t('tickets-header-description') }}</th>
                    <th class="status">{{ t('tickets-header-status') }}</th>
                    <th class="opened-at">{{ t('tickets-header-opened-at') }}</th>
                    <th class="closed-at">{{ t('tickets-header-closed-at') }}</th>
                    <th class="actions">{{ t('tickets-header-actions') }}</th>
                </tr>
            </thead>
            <tbody v-if="tickets.value">
                <tr v-for="ticket in tickets.value.content" :key="ticket.id">
                    <td class="client" v-if="!user">
                        <span class="avatar-name">
                            <img :src="ticket.user.avatar" alt="User avatar" />
                            <span>{{ ticket.user.name }}</span>
                        </span>
                    </td>
                    <td class="number">
                        <IconifiedText icon="fa6-solid:ticket">#{{ getTicketName(ticket) }}</IconifiedText>
                    </td>
                    <td class="subject">
                        <IconifiedProject v-if="matchSubject(ticket.subject)" :project="matchSubject(ticket.subject)" />
                        <span v-else>{{ t('ticket-subject-other') }}</span>
                    </td>
                    <td class="description">{{ ticket.description }}</td>
                    <td class="status">
                        <a :href="getTicketUrl(ticket)" v-if="ticket.status == 1"><IconifiedText class="open-ticket" icon="fa6-solid:check">{{ t('ticket-status-open') }}</IconifiedText></a>
                        <IconifiedText class="closed-ticket" icon="fa6-solid:lock" v-else-if="ticket.status == 2">{{ t('ticket-status-closed') }}</IconifiedText>
                        <a :href="getTicketUrl(ticket)" v-if="ticket.status == 3"><IconifiedText class="locked-ticket" icon="fa6-solid:pause">{{ t('ticket-status-locked') }}</IconifiedText></a>
                    </td>
                    <td class="opened-at">{{ ticket.openDate ? new Date(ticket.openDate).toLocaleString() : "" }}</td>
                    <td class="closed-at">{{ ticket.closeDate ? new Date(ticket.closeDate).toLocaleString() : "" }}</td>
                    <td class="actions">
                        <span v-if="ticket.status == 2">
                            <button class="delete" @click="deleteTicket(ticket)">{{ t('ticket-action-delete') }}</button>
                            <button @click="openTranscript(ticket)">{{ t('ticket-action-view-transcript') }}</button>
                        </span>
                        <a v-else :href="getTicketUrl(ticket)"><IconifiedText icon="fa6-solid:arrow-up-right-from-square">{{ t('ticket-action-open') }}</IconifiedText></a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="tickets.value && !tickets.value.content">
            <IconifiedText class="empty-notice" icon="fa6-solid:ticket">{{ $t('no-support-tickets-notice') }}</IconifiedText>
        </div>
        <Pagination v-if="tickets.value" :data="tickets.value" v-on:update="(page, perPage) => updateTickets(page, perPage)" />
    </article>
</template>

<script setup>
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const { t } = useI18n();

const pageNumber = ref(1);
const itemsPerPage = ref(15);
const tickets = ref(null);
const projects = await useAllProjects();

const { user } = defineProps({
    user: {
        type: Object,
        required: false
    }
});
const { auth, xsrf } = useAuth();

const updateTickets = (async (page, perPage) => {
    pageNumber.value = Math.max(1, page || pageNumber.value);
    itemsPerPage.value = Math.max(15, perPage || itemsPerPage.value);
    tickets.value = user
        ? await useTickets(user, pageNumber.value - 1, itemsPerPage.value) 
        : await useAllTickets(pageNumber.value - 1, itemsPerPage.value);
});
await updateTickets(pageNumber.value, itemsPerPage.value);

const matchSubject = (subject) => projects.value.find(proj => proj.slug === subject);
const getTicketUrl = (ticket) => `https://discord.com/channels/${ticket.guild.id}/${ticket.channelId}`;
const getTicketName = (ticket) => ticket.id.toString().padStart(4, '0');

const openTranscript = async (ticket) => {
    try {
        const transcript = await $fetch(`${BASE_URL}/v1/tickets/${ticket.id}/transcript`, {
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            }
        });
        navigateTo(`/transcript/${btoa(transcript)}`, { external: true });
    } catch (err) {
        alert('Failed to get ticket transcript: ' + err);
        return;
    }
};

const deleteTicket = async (ticket) => {
    if (!confirm(`Are you sure you want to delete ticket #${getTicketName(ticket)}?`)) {
        return;
    }
    try {
        await $fetch(`${BASE_URL}/v1/tickets/${ticket.id}`, {
            method: 'DELETE',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            }
        });
        await updateTickets(pageNumber.value, itemsPerPage.value);
    } catch (err) {
        alert('Failed to delete ticket: ' + err);
        return;
    }
};
</script>

<style scoped>
.tickets-table, .tickets-table table th {
    width: 100%;
}

.tickets-table table tr {
    background-color: transparent;
}

.number {
    width: 8% !important;
}

td.number {
    font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
}

.subject, .status, .client {
    width: 12% !important;
}

.client .avatar-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    text-overflow: ellipsis;
}

.avatar-name img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
}

.status .open-ticket {
    color: var(--accent);
}

.status .closed-ticket {
    color: var(--light-gray)
}

.status .locked-ticket {
    color: gold !important;
}

.opened-at, .closed-at {
    width: 10% !important;
}

td.opened-at, td.closed-at {
    color: var(--light-gray);
}

.description {
    width: 30% !important;
    max-width: 250px !important;
    overflow: auto;
}

td.actions span {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

.empty-notice {
    margin: 2rem 0;
    color: var(--light-gray)
}

.search-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    margin-bottom: 1rem;
}
</style>