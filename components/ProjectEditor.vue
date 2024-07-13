<template>
    <div>
        <div class="picker">
            <div class="picker-panel">
                <label for="project-select">Select Project:</label>
                <select id="project-select" v-model="editing">
                    <option v-for="project in projects" :key="project.slug" :value="project" >
                        {{ project.slug }}
                    </option>
                </select>
            </div>
            <div class="button-panel">
                <button :disabled="!editing" class="delete" @click="deleteProject">Delete</button>
                <button :disabled="!editing" @click="saveProject">Save</button>
                <Icon v-if="saved" class="saved-check" name="fa6-solid:check" />
                <button @click="newProject">Create New&hellip;</button>
            </div>
        </div>
        <div v-if="!editing" class="no-project-selected">
            <IconifiedText icon="fa6-solid:question">No project selected</IconifiedText>
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
                <label for="license">License</label>
                <input v-model="editing.metadata.license" type="text" placeholder="License" />
            </div>
            <!-- metadata.repository box, 1-64 chars -->
            <div>
                <label for="repository">Repository</label>
                <input v-model="editing.metadata.repository" type="text" placeholder="Repository" />
            </div>
            <!-- metadata.readmePath box, 1-64 chars -->
            <div>
                <label for="readmePath">README Path</label>
                <input v-model="editing.metadata.readmePath" type="text" placeholder="README Path" />
            </div>
            <!-- archived checkbox -->
            <div>
                <label for="project-archived">Is archived</label>
                <input id="project-archived" v-model="editing.metadata.archived" type="checkbox" />
            </div>
            <!-- documentation checkbox -->
            <div>
                <label for="project-documentation">Has documentation</label>
                <input id="project-documentation" v-model="editing.metadata.documentation" type="checkbox" />
            </div>
            <!-- hidden checkbox -->
            <div>
                <label for="project-hidden">Is hidden</label>
                <input id="project-hidden" v-model="editing.metadata.hidden" type="checkbox" />
            </div>
            <!-- restricted checkbox -->
            <div>
                <label for="project-restricted">Is restricted (premium)</label>
                <input id="project-restricted" v-model="editing.restricted" type="checkbox" />
            </div>
            <!-- tags -->
            <div>
                <label for="project-tags">Tags</label>
                <div class="editor-section" id="project-tags">
                    <input v-for="(tag, index) in editing.metadata.tags" :key="tag" v-model="editing.metadata.tags[index]" type="text" placeholder="Tag" />
                    <div class="list-buttons">
                        <button @click="editing.metadata.tags.push('')">Add Tag</button>
                        <button class="delete" @click="editing.metadata.tags.pop()">Remove Tag</button>
                    </div>
                </div>
            </div>
            <!-- maintainers -->
            <div>
                <label for="project-maintainers">Maintainers</label>
                <div class="editor-section" id="project-maintainers">
                    <input v-for="(tag, index) in editing.metadata.maintainers" :key="tag" v-model="editing.metadata.maintainers[index]" type="text" placeholder="Maintainer name" />
                    <div class="list-buttons">
                        <button @click="editing.metadata.maintainers.push('')">Add Maintainer</button>
                        <button class="delete" @click="editing.metadata.maintainers.pop()">Remove Maintainer</button>
                    </div>
                </div>
            </div>
            <!-- links -->
            <div>
                <label for="project-links">Links</label>
                <div class="editor-section" id="project-links">
                    <div class="link-map" v-for="(key, index) in Object.keys(editing.metadata.links)">
                        <input v-model="Object.keys(editing.metadata.links)[index]" type="text" placeholder="Link label" />
                        <input v-model="editing.metadata.links[key]" type="text" placeholder="Link URL" />
                    </div>
                    <div class="list-buttons">
                        <button @click="editing.metadata.links[`Untitled ${Object.keys(editing.metadata.links).length + 1}`] = 'https://example.com'">Add Link</button>
                        <button class="delete" @click="delete editing.metadata.links[Object.keys(editing.metadata.links).pop()]">Remove Link</button>
                    </div>
                </div>
            </div>
            <!-- icons -->
            <div>
                <label for="project-icons">Icons</label>
                <div class="editor-section" id="project-icons">
                    <div class="link-map" v-for="format in ALLOWED_IMAGE_TYPES">
                        <div>
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
                    <div class="link-map" v-for="(key, index) in Object.keys(editing.metadata.images)">
                        <input v-model="Object.keys(editing.metadata.images)[index]" type="text" placeholder="Link label" />
                        <input v-model="editing.metadata.images[key]" type="text" placeholder="Link URL" />
                    </div>
                    <div class="list-buttons">
                        <button @click="editing.metadata.images[`Image ${Object.keys(editing.metadata.images).length + 1}`] = 'https://example.com/image.png'">Add Image</button>
                        <button class="delete" @click="delete editing.metadata.images[Object.keys(editing.metadata.images).pop()]">Remove Image</button>
                    </div>
                </div>
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
const saved = ref(false);

const getDefaultProject = ((slug) => `
{
  "slug": "${slug}",
  "restricted": false,
  "metadata": {
    "name": "${slug}",
    "tagline": "Enter a description here",
    "license": "Apache-2.0",
    "tags": [
      "example",
      "example 2"
    ],
    "repository": "https://github.com/WiIIiam278/${slug}",
    "readmePath": "/about-${slug}",
    "links": {
      "spigot": "https://www.spigotmc.org/resources/${slug}.12345/"
    },
    "maintainers": [
      "William278"
    ],
    "archived": false,
    "documentation": true,
    "hidden": false,
    "icons": {
      "SVG": "${slug}.svg",
      "PNG": "${slug}.png"
    }
  }
}
`);

const newProject = () => {
    const name = prompt('Enter a name for the new project');
    if (!name) return;
    if (!name.length || name.length > 63) {
        alert('Invalid project name');
        return;
    }

    let newProj = JSON.parse(getDefaultProject(name));
    projects.value.push(newProj);
    editing.value = newProj;
    saveProject();
}

const saveProject = async () => {
    try {
        const savedProject = await $fetch(`${BASE_URL}/v1/projects/${editing.value.slug}`, 
        {
            method: 'PUT',
            credentials: auth ? 'include' : 'omit',
            headers: {
                'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
                'X-XSRF-TOKEN': xsrf
            },
            body: JSON.stringify(editing.value)
        });
        editing.value = savedProject;
        saved.value = true;
        setTimeout(() => saved.value = false, 3000);
    } catch (err) {
        alert('Failed to save project: ' + err);
        return;
    }
}

const deleteProject = async () => {
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
            alert('Failed to delete project: ' + err);
            return;
        }
        projects.value = projects.value.filter(proj => proj.slug !== editing.value.slug);
        editing.value = null
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
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.editor-panel {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 1rem;
    background-color: var(--gray);
    padding: 1rem;
    border-radius: 0.5rem;
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
</style>