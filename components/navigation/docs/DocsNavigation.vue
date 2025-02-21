<template>
    <div class="navigation">
        <div class="section" v-for="section of navigation">
            <div class="title">{{ section.name }}</div>
            <div class="links">
                <div class="link" v-for="link of section.children">
                    <div class="link-section">
                        <NuxtLink class="name-link" :to="link.url" :title="link.title">
                            <div class="page-name">
                                <IconifiedText :icon="link.icon">{{ link.title }}</IconifiedText>
                            </div>
                        </NuxtLink>
                        <Icon @click="expandCollapseLink(link.order)" class="expand-collapse"
                            :name="getLinkExpandIcon(link.order)" v-if="link.children?.length" />
                    </div>
                    <div class="link child" v-if="isLinkExpanded(link.order) > -1" v-for="sublink of link.children">
                        <NuxtLink class="link-section" :to="sublink.url" :title="sublink.title">
                            <div class="page-name">
                                <IconifiedText :icon="sublink.icon">{{ sublink.title }}</IconifiedText>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { navigation, project } = defineProps({
    navigation: {
        type: Object,
        required: true
    },
    project: {
        type: Object,
        required: true
    }
})
const { metadata: meta } = project;
const expandedLinks = ref([]);
const isLinkExpanded = (link) => expandedLinks.value.indexOf(link);
const getLinkExpandIcon = (link) => `fa6-solid:chevron-${isLinkExpanded(link) > -1 ? 'down' : 'right'}`
const expandCollapseLink = (link) => isLinkExpanded(link) > -1
    ? expandedLinks.value.splice(isLinkExpanded(link), 1)
    : expandedLinks.value.push(link);
</script>

<style scoped>
.navigation .section .title {
    color: var(--light-gray);
    margin-bottom: 0.5rem;
}

.section {
    margin: 1.75rem 0;
    border-bottom: 0.125rem solid var(--gray);
}

.link {
    border-top: 0.125rem solid var(--gray);
}

.link .title {
    padding: 0.25rem 0;
}

.link-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.link-section .name-link {
    width: 60%;
}

.link-section .expand-collapse {
    color: var(--white);
    margin-right: 1rem;
    font-size: 1.225rem;
    cursor: pointer;
}

.page-name {
    padding: 0.65rem 0;
}

.link.child .page-name {
    margin-left: 1rem;
}

.page-name .icon {
    color: var(--accent);
    margin-right: 0.75rem;
}
</style>