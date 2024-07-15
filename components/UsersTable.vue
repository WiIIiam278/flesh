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
                    <th class="actions">Actions</th>
                </tr>
            </thead>
            <tbody v-if="users.value">
                <tr v-for="user in users.value.content" :key="user.id">
                    <td class="avatar">
                        <img :src="user.avatar" alt="User avatar" />
                    </td>
                    <td><code>{{ user.id }}</code></td>
                    <td>{{ new Date(user.createdAt).toLocaleString() }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td :class="user.admin ? 'admin-role' : ''">{{ user.admin ? 'Admin' : 'User' }}</td>
                    <td>
                        <div class="purchased-products" v-for="project in restrictedProjects" :key="project.slug">
                            <label :for="`${user.id}-project-${project.slug}`">
                                <span v-if="user.purchases.includes(project.slug)">{{ project.metadata.name }}</span>
                                <span v-else  class="unchecked">{{ project.metadata.name }}</span>
                            </label>
                            <input type="checkbox" :id="`${user.id}-project-${project.slug}`" :checked="user.purchases.includes(project.slug)"
                                @change="updateUserProjects(user, project.slug)" />
                        </div>
                        <div class="no-purchased-products" v-if="!restrictedProjects.length">No products can be purchased</div>
                    </td>
                    <td>
                        <button class="delete" :disabled="user.admin" @click="deleteUser(user)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination v-if="users.value" :data="users.value" v-on:update="(page, perPage) => updateUsers(page, perPage)" />
    </article>
</template>

<script setup>
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const pageNumber = ref(1);
const itemsPerPage = ref(15);
const users = ref(null);
const searchText = ref('');

const { auth, xsrf } = useAuth();
const restrictedProjects = await useRestrictedProjects();

const updateUsers = (async (page, perPage) => {
    pageNumber.value = Math.max(1, page || pageNumber.value);
    itemsPerPage.value = Math.max(15, perPage || itemsPerPage.value);
    users.value = await useAllUsers(pageNumber.value - 1, itemsPerPage.value, searchText.value);
});
await updateUsers(pageNumber.value, itemsPerPage.value);

const updateUserProjects = async (user, projectId) => {
    user.purchases = user.purchases.includes(projectId) ? user.purchases.filter(p => p !== projectId) : [...user.purchases, projectId];
    try {
        await $fetch(`${BASE_URL}/v1/users/${user.id}/purchases`, {
            method: 'PUT',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            },
            body: JSON.stringify(user.purchases)
        });
    } catch (err) {
        alert('Failed to update user\'s products: ' + err);
        return;
    }
};

const deleteUser = async (user) => {
    if (user.admin) {
        alert('You cannot delete an admin account');
        return;
    }
    if (confirm(`Are you sure you want to delete ${user.name}\'s account?`)) {
        await $fetch(`${BASE_URL}/v1/users/${user.id}`, {
            method: 'DELETE',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            },
        });
        users.value.content = users.value.content.filter(u => u.id !== user.id);
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

.admin-role {
    color: var(--red);
}

.role {
    width: 8% !important;
}

.id, .username, .email, .created {
    width: 15% !important;
}

.purchased-products {
    display: flex;
    flex-direction: row;
    align-items: center;
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
</style>