<template>
    <article class="users-table">
        <table>
            <thead>
                <tr>
                    <th class="avatar">Avatar</th>
                    <th class="id">ID</th>
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
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.admin ? 'Admin' : 'User' }}</td>
                    <td>
                        <div class="purchased-products" v-for="project in restrictedProjects" :key="project.slug">
                            <label :for="`${user.id}-project-${project.slug}`">
                                <span v-if="user.projects.includes(project.slug)">{{ project.metadata.name }}</span>
                                <span v-else  class="unchecked">{{ project.metadata.name }}</span>
                            </label>
                            <input type="checkbox" :id="`${user.id}-project-${project.slug}`" :checked="user.projects.includes(project.slug)"
                                @change="updateUserProjects(user, project.slug)" />
                        </div>
                        <div class="no-purchased-products" v-if="!restrictedProjects.length">No products are restricted</div>
                    </td>
                    <td>
                        <button class="delete" :disabled="user.admin" @click="deleteUser(user)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="users.value" class="pagination-buttons">
            <div class="button-row">
                <label>Page:</label>
                <button @click="() => {pageNumber--; updateUsers()}" :disabled="pageNumber === 1">Previous</button>
                <input class="page-input" v-model="pageNumber" @change="updateUsers" type="number" min="1" :max="Math.ceil(users.value.numberOfElements / itemsPerPage)" />
                <label>/ {{ Math.ceil(users.value.numberOfElements / itemsPerPage) }}</label>
                <button @click="() => {pageNumber++; updateUsers()}" :disabled="pageNumber * itemsPerPage >= users.value.numberOfElements">Next</button>
            </div>
            <div class="button-row">
                <label>Per page:</label>
                <select class="page-input" v-model="itemsPerPage" @change="updateUsers">
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
                <label>({{ users.value.numberOfElements }} total)</label>
            </div>
        </div>
    </article>
</template>

<script setup>
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const pageNumber = ref(1);
const itemsPerPage = ref(15);
const users = ref(null);

const { auth, xsrf } = useAuth();
const restrictedProjects = await useRestrictedProjects();

const updateUsers = (async () => {
    users.value = await useAllUsers(pageNumber.value - 1, itemsPerPage.value);
});
await updateUsers();

const updateUserProjects = async (user, projectId) => {
    user.projects = user.projects.includes(projectId) ? user.projects.filter(p => p !== projectId) : [...user.projects, projectId];
    try {
        await $fetch(`${BASE_URL}/v1/users/${user.id}/projects`, {
            method: 'PUT',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            },
            body: JSON.stringify(user.projects)
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

.role {
    width: 10% !important;
}

.id, .username, .email {
    width: 20% !important;
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

.pagination-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
}

.pagination-buttons .page-input {
    width: 4rem;
    margin: 0 0.5rem;
}

.pagination-buttons label {
    margin-right: 0.5rem;
}
</style>