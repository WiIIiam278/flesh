<template>
    <table>
        <thead>
            <tr>
                <th>{{ $t('dump-status-table-description') }}</th>
                <th>{{ $t('dump-status-table-value') }}</th>
            </tr>
        </thead>
        <tbody v-for="entry in Object.entries(status)">
            <tr>
                <td class="description">{{ entry[0] }}</td>
                <td class="value">{{ entry[1] }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
const { status } = defineProps({
    status: {
        type: Object,
        required: false
    }
})
</script>

<style scoped>
.description, .value {
    width: 50%;
}

.value {
    color: var(--light-gray);
}
</style>