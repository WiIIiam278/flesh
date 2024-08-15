<template>
    <article class="tickets-table">
        <table>
            <thead>
                <tr>
                    <th class="number">{{ t('tickets-header-number') }}</th>
                    <th class="subject">{{ t('tickets-header-subject') }}</th>
                    <th class="description">{{ t('tickets-header-description') }}</th>
                    <th class="status">{{ t('tickets-header-status') }}</th>
                    <th class="opened-at">{{ t('tickets-header-opened-at') }}</th>
                    <th class="closed-at">{{ t('tickets-header-closed-at') }}</th>
                </tr>
            </thead>
            <tbody v-if="tickets.value">
                <tr v-for="ticket in tickets.value.content" :key="ticket.id">
                    <td class="number">
                        <IconifiedText icon="fa6-solid:ticket">#{{ ticket.id.toString().padStart(4, '0') }}</IconifiedText>
                    </td>
                    <td class="subject">
                        <IconifiedProject v-if="matchSubject(ticket.subject)" :project="matchSubject(ticket.subject)" />
                        <span v-else>{{ t('ticket-subject-other') }}</span>
                    </td>
                    <td class="description">{{ ticket.description }}</td>
                    <td class="status">
                        <IconifiedText icon="fa6-solid:check" v-if="ticket.status == 1">{{ t('ticket-status-open') }}</IconifiedText>
                        <IconifiedText icon="fa6-solid:lock" v-else-if="ticket.status == 2">{{ t('ticket-status-closed') }}</IconifiedText>
                        <IconifiedText icon="fa6-solid:pause" v-else-if="ticket.status == 3">{{ t('ticket-status-locked') }}</IconifiedText>
                    </td>
                    <td class="opened-at">{{ ticket.openDate ? new Date(ticket.openDate).toLocaleString() : "" }}</td>
                    <td class="closed-at">{{ ticket.closeDate ? new Date(ticket.closeDate).toLocaleString() : "" }}</td>
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
const { t } = useI18n();

const pageNumber = ref(1);
const itemsPerPage = ref(15);
const tickets = ref(null);
const projects = await useAllProjects();

const { user } = defineProps({
    user: {
        type: Object,
        required: true
    }
});
const { auth, xsrf } = useAuth();

const updateTickets = (async (page, perPage) => {
    pageNumber.value = Math.max(1, page || pageNumber.value);
    itemsPerPage.value = Math.max(15, perPage || itemsPerPage.value);
    tickets.value = await useTickets(pageNumber.value - 1, itemsPerPage.value);
});
await updateTickets(pageNumber.value, itemsPerPage.value);

const matchSubject = (subject) => projects.value.find(proj => proj.slug === subject);
</script>

<style scoped>
.tickets-table, .tickets-table table th {
    width: 100%;
}

.tickets-table table tr {
    background-color: transparent;
}

.number {
    font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
    width: 8% !important;
}

.subject, .status {
    width: 12% !important;
}

.opened-at, .closed-at {
    width: 15% !important;
}

.description {
    width: 35% !important;
}

.empty-notice {
    margin: 2rem 0;
    color: var(--light-gray)
}
</style>