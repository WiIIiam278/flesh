<template>
    <article class="users-table">
        <div v-if="users.value" class="search-options">
            <b>Displaying {{ users.value.numberOfElements }} user record(s)</b>
            <form class="search-box" v-on:submit="(e) => { e.preventDefault(); updateUsers(pageNumber.value, itemsPerPage.value); }">
                <input type="text" v-model="searchText" placeholder="Search by username" />
                <button type="submit">Search</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="avatar">Avatar</th>
                    <th class="id">ID</th>
                    <th class="created">Created</th>
                    <th class="username">Username</th>
                    <th class="email">Email</th>
                    <th class="role">Role</th>
                    <th class="purchases">Purchases</th>
                    <th class="actions" v-if="useIsUserRole(user, 'admin')">Actions</th>
                </tr>
            </thead>
            <tbody v-if="users.value">
                <tr v-for="item in users.value.content" :key="item.id">
                    <td class="avatar">
                        <img :src="item.avatar" alt="User avatar" />
                    </td>
                    <td><code>{{ item.id }}</code></td>
                    <td>{{ new Date(item.createdAt).toLocaleString() }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ `${item.email[0]}•••••@${item.email.split('@')[1]}` }}</td>
                    <td :class="`role-editor ${item.role?.toLowerCase()}-role`">
                        <select v-if="useIsUserRole(user, 'admin') && item.id !== user.id" v-model="item.role" @change="updateUserRole(item)">
                            <option v-for="role in ['user', 'staff', 'admin']" :class="`${role}-role`" :value="role.toUpperCase()">
                                {{ $t(`user-role-${role.toLowerCase()}`) }}
                            </option>
                        </select>
                        <span v-else>{{ $t(`user-role-${item.role.toLowerCase()}`) }}</span>
                    </td>
                    <td>
                        <div class="purchased-products" v-for="project in restrictedProjects" :key="project.slug">
                            <label :for="`${item.id}-project-${project.slug}`">
                                <span v-if="item.purchases.includes(project.slug)">{{ project.metadata.name }}</span>
                                <span v-else  class="unchecked">{{ project.metadata.name }}</span>
                            </label>
                            <input :disabled="!useIsUserRole(user, item.role)" type="checkbox" :id="`${item.id}-project-${project.slug}`" 
                                :checked="item.purchases.includes(project.slug)" @change="updateUserProjects(item, project.slug)" />
                        </div>
                        <div class="no-purchased-products" v-if="!restrictedProjects.length">No products can be purchased</div>
                    </td>
                    <td v-if="useIsUserRole(user, 'admin')">
                        <button class="delete" v-if="item.id !== user.id" @click="deleteUser(item)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination v-if="users.value" :data="users.value" v-on:update="(page, perPage) => updateUsers(page, perPage)" />
    </article>
</template>

<script setup>
const { t } = useI18n();

const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const pageNumber = ref(1);
const itemsPerPage = ref(15);
const users = ref(null);
const searchText = ref('');

const { user } = defineProps({
    user: {
        type: Object,
        required: true
    }
});
const { auth, xsrf } = useAuth();
const restrictedProjects = await useRestrictedProjects();

const updateUsers = (async (page, perPage) => {
    pageNumber.value = Math.max(1, page || pageNumber.value);
    itemsPerPage.value = Math.max(15, perPage || itemsPerPage.value);
    users.value = await useAllUsers(pageNumber.value - 1, itemsPerPage.value, searchText.value);
});
await updateUsers(pageNumber.value, itemsPerPage.value);

const updateUserProjects = async (toUpdate, projectId) => {
    toUpdate.purchases = toUpdate.purchases.includes(projectId) ? toUpdate.purchases.filter(p => p !== projectId) : [...toUpdate.purchases, projectId];
    try {
        await $fetch(`${BASE_URL}/v1/users/${toUpdate.id}/purchases`, {
            method: 'PUT',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            },
            body: JSON.stringify(toUpdate.purchases)
        });
    } catch (err) {
        alert('Failed to update user\'s products: ' + err);
        return;
    }
};

const updateUserRole = async (toUpdate) => {
    try {
        await $fetch(`${BASE_URL}/v1/users/${toUpdate.id}/role`, {
            method: 'PUT',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            },
            body: toUpdate.role.toUpperCase()
        });
    } catch (err) {
        alert('Failed to update user\'s role: ' + err);
        return;
    }
};

const deleteUser = async (toDelete) => {
    if (useIsUserRole(toDelete, 'admin')) {
        alert('You cannot delete an admin account ' + JSON.stringify(toDelete));
        return;
    }
    if (confirm(`Are you sure you want to delete ${toDelete.name}\'s account?`)) {
        await $fetch(`${BASE_URL}/v1/users/${toDelete.id}`, {
            method: 'DELETE',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            },
        });
        users.value.content = users.value.content.filter(u => u.id !== toDelete.id);
    }
};
</script>

<style scoped>
.users-table table th {
    width: 100%;
}

.avatar {
    width: 50px !important;
}

.avatar img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
}

.role-editor select {
    width: min-content;
}

.user-role, .user-role select {
    color: white;
}

.admin-role, .admin-role select {
    color: var(--red);
}

.staff-role, .staff-role select {
    color: var(--accent);
}

.role {
    width: 8% !important;
}

.id, .username, .email, .created {
    width: 15% !important;
}

.purchased-products {
    /* grid */
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
}

.purchased-products label {
    font-weight: 500 !important;
}

.purchased-products label .unchecked {
    color: var(--light-gray);
}

.no-purchased-products {
    color: var(--light-gray);
}

.search-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    margin-bottom: 1rem;
}

.search-options .search-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}

.users-table table tr {
    background-color: transparent;
}
</style>