<template>
    <article class="transactions-table">
        <div v-if="transactions.value" class="search-options">
            <b>{{ t('transactions-header-record-count', { 'count': transactions.value.page.totalElements }) }}</b>
            <form class="filter-boxes" @submit="(e) => { e.preventDefault(); pageNumber = 0; updateTransactions(pageNumber.value, itemsPerPage.value); }">
                <input class="email-search" type="text" v-model="emailFilter" :placeholder="t('search-by-email')" />
                <button type="submit">Search</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="timestamp">{{ t('transactions-header-timestamp') }}</th>
                    <th class="project">{{ t('transactions-header-project') }}</th>
                    <th class="processor">{{ t('transactions-header-processor') }}</th>
                    <th class="marketplace">{{ t('transactions-header-marketplace') }}</th>
                    <th class="reference">{{ t('transactions-header-reference') }}</th>
                    <th class="email">{{ t('transactions-header-email') }}</th>
                    <th class="amount">{{ t('transactions-header-amount') }}</th>
                    <th class="status">{{ t('transactions-header-status') }}</th>
                </tr>
            </thead>
            <tbody v-if="transactions.value">
                <tr v-for="transaction in transactions.value.content" :key="transaction.id">
                    <td class="timestamp">{{ transaction.timestamp ? useTimeFormat(transaction.timestamp, true) : "" }}</td>
                    <td class="project"><IconifiedProject v-if="transaction.projectGrantSlug" :project="getProject(transaction.projectGrantSlug)" /></td>
                    <td class="processor"><Icon :name="`fa6-brands:${transaction.processor?.toLowerCase()}`" />&nbsp;{{ formatProcessor(transaction.processor) }}</td>
                    <td class="marketplace">{{ transaction.marketplace }}</td>
                    <td class="reference">{{ transaction.transactionReference }}</td>
                    <td class="email">{{ transaction.email }}</td>
                    <td class="amount">{{ transaction.amount }}&nbsp;{{ transaction.currency }}</td>
                    <td class="status">
                        <div class="avatar-name" v-if="transaction.grantedToName?.length">
                            <img v-if="transaction.grantedToAvatar" :src="transaction?.grantedToAvatar" alt="User avatar" onerror="this.style.display='none'" />
                            <span>{{ transaction.grantedToName ?? $t('user-deleted') }}</span>
                        </div>
                        <div :class="text">{{ getStatus(transaction) }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="transactions.value && !transactions.value.content">
            <IconifiedText class="empty-notice" icon="fa6-solid:coins">{{ $t('no-transactions-notice') }}</IconifiedText>
        </div>
        <Pagination v-if="transactions.value" :data="transactions.value" v-on:update="(page, perPage) => updateTransactions(page, perPage)" />
    </article>
</template>

<script setup>
const { t } = useI18n();

const pageNumber = ref(1);
const itemsPerPage = ref(15);
const emailFilter = ref('');
const transactions = ref(null);

const projects = await useRestrictedProjects();
const getProject = (proj) => projects.find(p => p.slug === proj)

const { user } = defineProps({
    user: {
        type: Object,
        required: false
    }
});

const formatProcessor = (processor) => {
    if (processor === 'STRIPE') {
        return 'Stripe';
    }
    if (processor === 'PAYPAL') {
        return 'PayPal'
    }
}

const getStatus = (transaction) => {
    if (transaction.refunded) {
        return t('transaction-status-refunded');
    }
    if (transaction.passedValidation) {
        return t('transaction-status-complete');
    }
    return t('transaction-status-failed-validation');
}

const updateTransactions = (async (page, perPage) => {
    pageNumber.value = Math.max(1, page || pageNumber.value);
    itemsPerPage.value = Math.max(15, perPage || itemsPerPage.value);
    transactions.value = await useAllTransactions(pageNumber.value - 1, itemsPerPage.value, emailFilter.value);
});
await updateTransactions(pageNumber.value, itemsPerPage.value);
</script>

<style scoped>
.transactions-table, .transactions-table table th {
    width: 100%;
}

.transactions-table table tr {
    background-color: transparent;
}

.status {
    min-width: 120px !important;
    text-align: center;
}

.status .text {
    margin: 0.2rem 0;
}

.project, .processor, .reference {
    width: 12% !important;
}

.status .avatar-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    text-overflow: ellipsis;
}

.avatar-name img {
    width: 25px;
    height: 25px;
    border-radius: 100%;
}

table .empty-notice {
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

.search-options .filter-boxes {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}

.filter-boxes input {
    max-width: 150px;
}
</style>