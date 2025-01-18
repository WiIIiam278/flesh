<template>
    <div>
        <div class="picker">
            <div class="picker-panel">
                <label for="project-select">Select Project:</label>
                <select id="project-select" v-model="editing" :disabled="!projects?.length">
                    <option v-for="project in projects" :key="project.slug" :value="project" >
                        {{ project.slug }}
                    </option>
                </select>
            </div>
            <div class="button-panel">
                <NuxtLink v-if="editing" :to="`/project/${editing?.slug}`">
                    <IconifiedText icon="fa6-solid:arrow-up-right-from-square">View Project</IconifiedText>
                </NuxtLink>
                <button :disabled="!editing" class="red" @click="deleteProject">Delete</button>
                <button :disabled="!editing" @click="saveProject">Save</button>
                <Icon v-if="saved" class="saved-check" name="fa6-solid:check" />
                <button @click="newProject">Create New&hellip;</button>
            </div>
        </div>
        <div v-if="!editing" class="no-project-selected">
            <IconifiedText icon="fa6-solid:question">No projects have been created yet.</IconifiedText>
            <button @click="newProject">Create New&hellip;</button>
        </div>
        <div class="editor-panel" v-else>
            <!-- slug box, 1-64 chars -->
            <div>
                <label for="slug">Slug</label>
                <input id="slug" v-model="editing.slug" type="text" placeholder="Slug" />
            </div>
            <!-- metadata.name box, 1-64 chars -->
            <div>
                <label for="name">Name</label>
                <input id="name" v-model="editing.metadata.name" type="text" placeholder="Name" />
            </div>
            <!-- metadata.tagline two-line box, up to 2k chars -->
            <div>
                <label for="tagline">Tagline</label>
                <textarea v-model="editing.metadata.tagline" placeholder="Tagline"></textarea>
            </div>
            <!-- metadata.license box, 1-64 chars -->
            <div>
                <label for="license">Source Code License</label>
                <input v-model="editing.metadata.license" type="text" placeholder="License" />
            </div>
            <!-- metadata.github box, 1-64 chars -->
            <div>
                <label for="repository">Repository</label>
                <input v-model="editing.metadata.github" type="text" placeholder="GitHub Repository" />
            </div>
            <!-- sortWeight stepper -->
            <div>
                <label for="project-sortWeight">Sort Weight</label>
                <input id="project-sortWeight" v-model="editing.metadata.sortWeight" type="number" />
            </div>
            <!-- archived checkbox -->
            <div>
                <label for="project-archived">Is Archived</label>
                <input id="project-archived" v-model="editing.metadata.archived" type="checkbox" />
            </div>
            <!-- documentation checkbox -->
            <div>
                <label for="project-documentation">Has Documentation</label>
                <input id="project-documentation" v-model="editing.metadata.documentation" type="checkbox" />
            </div>
            <!-- hidden checkbox -->
            <div>
                <label for="project-hidden">Is Hidden</label>
                <input id="project-hidden" v-model="editing.metadata.hidden" type="checkbox" />
            </div>
            <!-- listDownloads checkbox -->
            <div>
                <label for="project-listDownloads">List Downloads</label>
                <input id="project-listDownloads" v-model="editing.metadata.listDownloads" type="checkbox" />
            </div>
            <!-- tags -->
            <div>
                <label for="project-tags">Tags</label>
                <div class="editor-section" id="project-tags">
                    <input v-for="(_, index) in editing.metadata.tags" v-model="editing.metadata.tags[index]" type="text" placeholder="Tag" />
                    <div class="list-buttons">
                        <button @click="editing.metadata.tags.push('')">Add Tag</button>
                        <button class="red" @click="editing.metadata.tags.pop()">Remove Tag</button>
                    </div>
                </div>
            </div>
            <!-- maintainers -->
            <div>
                <label for="project-maintainers">Maintainers</label>
                <div class="editor-section" id="project-maintainers">
                    <input v-for="(_, index) in editing.metadata.maintainers" v-model="editing.metadata.maintainers[index]" type="text" placeholder="Maintainer name" />
                    <div class="list-buttons">
                        <button @click="editing.metadata.maintainers.push('')">Add Maintainer</button>
                        <button class="red" @click="editing.metadata.maintainers.pop()">Remove Maintainer</button>
                    </div>
                </div>
            </div>
            <!-- links -->
            <div>
                <label for="project-links">Links</label>
                <div class="editor-section" id="project-links">
                    <div class="link-map" v-for="(_, index) of editing.metadata.links">
                        <input v-model="editing.metadata.links[index].id" type="text" placeholder="Link ID" />
                        <input v-model="editing.metadata.links[index].url" type="text" placeholder="Link URL" />
                    </div>
                    <div class="list-buttons">
                        <button @click="editing.metadata.links.push({ id: 'Example', url: 'https://example.com' })">Add Link</button>
                        <button class="red" @click="editing.metadata.links.pop()">Remove Link</button>
                    </div>
                </div>
            </div>
            <!-- compatibleSoftware -->
            <div>
                <label for="project-compatible-software">Compatible Software</label>
                <div class="editor-section" id="project-compatible-software">
                    <input v-for="(_, index) in editing.metadata.compatibleSoftware" v-model="editing.metadata.compatibleSoftware[index]" type="text" placeholder="Software name" />
                    <div class="list-buttons">
                        <button @click="editing.metadata.compatibleSoftware.push('')">Add Software</button>
                        <button class="red" @click="editing.metadata.compatibleSoftware.pop()">Remove Software</button>
                    </div>
                </div>
            </div>
            <!-- icons -->
            <div>
                <label for="project-icons">Icons</label>
                <div class="editor-section" id="project-icons">
                    <div class="icons-map" v-for="format in ALLOWED_IMAGE_TYPES">
                        <div class="icon-path">
                            <label :for="`${format}-icon`">{{ format }} icon</label>
                            <input :id="`${format}-icon`" v-model="editing.metadata.icons[format]" type="text" placeholder="Icon path" />
                        </div>
                        <div>
                            <img v-if="editing.metadata.icons[format]" :src="`/images/icons/${editing.metadata.icons[format]}`" onerror="this.style.display='none'" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- images -->
            <div>
                <label for="project-images">Images</label>
                <div class="editor-section" id="project-images">
                    <div class="link-map" v-for="(_, index) of editing.metadata.images">
                        <input v-model="editing.metadata.images[index].url" type="text" placeholder="Image URL" />
                        <input v-model="editing.metadata.images[index].description" type="text" placeholder="Image Description" />
                    </div>
                    <div class="list-buttons">
                        <button @click="editing.metadata.images.push({ url: 'https://example.com/image.png', description: 'An example image' })">Add Image</button>
                        <button class="red" @click="editing.metadata.images.pop()">Remove Image</button>
                    </div>
                </div>
            </div>
            <!-- specialProperties -->
            <div>
                <label for="project-specialProperties">Special Properties</label>
                <div class="editor-section" id="project-specialProperties">
                    <div class="link-map" v-for="(_, index) of editing.metadata.properties">
                        <input v-model="editing.metadata.properties[index].key" type="text" placeholder="Property Key" />
                        <input v-model="editing.metadata.properties[index].value" type="text" placeholder="Property Value" />
                    </div>
                    <div class="list-buttons">
                        <button @click="editing.metadata.properties.push({ key: 'Foo', value: 'Bar' })">Add Property</button>
                        <button class="red" @click="editing.metadata.properties.pop()">Remove Property</button>
                    </div>
                </div>
            </div>
            <!-- restricted checkbox -->
            <div>
                <label for="project-restricted">Is Premium Product (Restricted)</label>
                <input id="project-restricted" v-model="editing.restricted" type="checkbox" />
            </div>
            <!-- metadata.suggestedRetailPrice box, number -->
            <div v-if="editing.restricted">
                <label for="suggestedRetailPrice">Suggested Retail Price</label>
                <div class="price-line">
                    <span>{{ useRuntimeConfig().public.CURRENCY_SYMBOL }}</span>
                    <input v-model="editing.metadata.suggestedRetailPrice" type="number" step="0.01" placeholder="0.00" />
                </div>
            </div>
            <!-- metadata.linkedDiscordRole box, 18 chars -->
            <div v-if="editing.restricted">
                <label for="linkedDiscordRole">Linked Discord Role ID</label>
                <input v-model="editing.metadata.linkedDiscordRole" type="text" placeholder="Linked Discord Role ID" />
            </div>
        </div>
    </div>
</template>

<script setup>
const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const ALLOWED_IMAGE_TYPES = ['PNG', 'SVG'];

const { auth, xsrf } = useAuth();
const projects = await useAllProjects();
const editing = defineModel('editing');
editing.value = projects.value.length ? projects.value[0] : null;
const saved = ref(false);

const getDefaultProject = ((slug) => `
{
  "slug": "${slug}",
  "restricted": false,
  "metadata": {
    "name": "${slug}",
    "tagline": "Enter a tagline for the project",
    "license": "Apache-2.0",
    "tags": [
      "example",
      "example 2"
    ],
    "github": "https://github.com/WiIIiam278/${slug}",
    "pullReadmeFromGithub": true,
    "links": [
      {
        "id": "spigot",
        "url": "https://www.spigotmc.org/resources/${slug}.12345/"
      }
    ],
    "maintainers": [
      "William278"
    ],
    "compatibleSoftware": [
    ],
    "suggestedRetailPrice": "0",
    "linkedDiscordRole": "",
    "archived": false,
    "documentation": true,
    "listDownloads": true,
    "hidden": false,
    "sortWeight": 1,
    "releaseChannels": [],
    "icons": {
      "SVG": "${slug}.svg",
      "PNG": "${slug}.png"
    },
    "images": [
    ],
    "properties": [
    ]
  }
}
`);

const newProject = () => {
    const slug = prompt('Enter a slug identifier for the new project:');
    if (!slug) return;

    // Ensure the name is valid
    if (!slug.length || slug.length > 63 || !/^[a-z0-9-]+$/.test(slug)) {
        useAlert('Slugs must be 1-63 characters long and only contain lowercase letters, numbers, and hyphens', 'Invalid project slug');
        return;
    }

    // Ensure the project doesn't already exist
    if (projects.value.find(proj => proj.slug === slug)) {
        useAlert('A project with that slug already exists', 'Invalid project slug');
        return;
    }

    // Create and save new project
    projects.value.push(JSON.parse(getDefaultProject(slug)));
    editing.value = projects.value[projects.value.length - 1];
    saveProject();
}

const saveProject = async () => {
    if (!editing.value) {
        useAlert('Please select a project first.', 'Cannot save project');
        return;
    }
    try {
        await $fetch(`${BASE_URL}/v1/projects/${editing.value.slug}`, 
        {
            method: 'PUT',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            },
            body: JSON.stringify(editing.value)
        });
        saved.value = true;
        setTimeout(() => saved.value = false, 3000);
    } catch (err) {
        useAlert('Failed to save project: ' + err, 'Error');
        return;
    }
}

const deleteProject = async () => {
    if (!editing.value) {
        useAlert('Please select a project first.', 'Cannot delete project');
        return;
    }
    if (confirm('Are you sure you want to delete this project?')) {
        try {
            await $fetch(`${BASE_URL}/v1/projects/${editing.value.slug}`, 
            {
                method: 'DELETE',
                credentials: auth ? 'include' : 'omit',
                headers: {
                    'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                    'X-XSRF-TOKEN': xsrf
                }
            });
        } catch (err) {
            useAlert('Failed to delete project: ' + err, 'Error');
            return;
        }
        projects.value = projects.value.filter(proj => proj.slug !== editing.value.slug);
        editing.value = projects.value.length ? projects.value[0] : null;
    }
}
</script>

<style scoped>
.picker {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
}

@media screen and (max-width: 725px) {
    .picker {
        flex-direction: column;
        gap: 0.5rem;
    }
    .picker .picker-panel {
        justify-content: center;
    }
}

.picker .picker-panel {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    font-weight: 700;
}

.picker .button-panel {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
}

.button-panel .saved-check {
    color: var(--accent);
}

.no-project-selected {
    margin: 4rem 0;
    color: var(--light-gray);
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
}

.editor-panel {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 1rem;
    background-color: var(--gray);
    padding: 2rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.editor-panel .two-column {
    grid-column: span 2;
}

.editor-panel div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.editor-panel .editor-section {
    background-color: var(--background);
    padding: 1rem;
    border-radius: 0.5rem;
}

.editor-section img {
    max-width: 75px;
    max-height: 75px;
    align-self: center;
}

.editor-panel .list-buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: center;
}

.editor-panel .link-map {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0.5rem;
}

.editor-panel .icons-map {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
}

.icons-map .icon-path {
    width: 100%;
}

.editor-panel .price-line {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    font-weight: 700;
}
</style>