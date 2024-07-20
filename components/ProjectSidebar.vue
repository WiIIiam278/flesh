<template>
    <div class="project-sidebar">
        <div class="header">
            <div class="meta">
                <h1 class="name">{{ meta.name }}</h1>
                <div class="pills">
                    <TagPill v-for="tag in meta.tags" :tag="tag" />
                </div>
            </div>
            <div class="icon" v-if="meta.icons">
                <object v-if="meta.icons['SVG']" :data="`/images/icons/${meta.icons['SVG']}`" type="image/svg+xml" />
                <img v-else-if="meta.icons['PNG']" :src="`/images/icons/${meta.icons['PNG']}`" />
            </div>
        </div>
        <div class="gallery" v-if="meta.images" @click="galleryClick()">
            <div v-for="image in meta.images"
                :class="'image hover-image ' + (meta.images.indexOf(image) === 0 ? 'shown' : '')" :key="image"
                :id="'gallery-' + meta.images.indexOf(image)">
                <img class="shadow" :src="`/images/${image.url}`" :alt="image.description" />
            </div>
        </div>
        <div class="tagline">{{ meta.tagline }}</div>
        <div class="buttons" v-if="meta.documentation || meta.github">
            <ButtonLink v-if="meta.documentation" :link="`/docs/${project.slug}`" icon="fa6-solid:book" hollow>
                {{ $t('link-docs') }}
            </ButtonLink>
            <ButtonLink v-if="meta.github" icon="fa6-brands:github" :link="meta.github" hollow>
                {{ $t('project-link-repository') }}
            </ButtonLink>
        </div>
        <div class="buttons" v-if="meta.links">
            <ButtonLink v-for="link in meta.links" :link="link.url" :icon="useLinkIcon(link)" hollow>
                {{ $t(`project-link-${link.id}`) }}
            </ButtonLink>
        </div>
        <div class="stats">
            <div class="stat" v-if="project.restricted && meta.suggestedRetailPrice">
                <div class="stat-descriptor">{{ $t('project-price') }}</div>
                <div class="stat-data">
                    {{$t('project-price-sterling', {'price': meta.suggestedRetailPrice.toFixed(2)})}}
                </div>
            </div>
            <div class="stat" v-if="meta.license?.length && meta.license !== 'All Rights Reserved'">
                <div class="stat-descriptor">{{ $t('project-license') }}</div>
                <div class="stat-data">
                    <IconifiedText icon="fa6-solid:scale-balanced">
                        {{ meta.license }}
                    </IconifiedText>
                </div>
            </div>
            <div class="stat" v-if="stats.downloadCount">
                <div class="stat-descriptor">{{ $t('project-downloads') }}</div>
                <div class="stat-data">
                    <IconifiedText icon="fa6-solid:download">
                        {{ 
                            stats.downloadCount >= 1000
                                ? (stats.downloadCount / 1000).toFixed(1) + 'k' 
                                : stats.downloadCount
                        }}
                    </IconifiedText>
                </div>
            </div>
            <div class="stat" v-if="stats.averageRating">
                <div class="stat-descriptor">{{ $t('project-average-rating') }}</div>
                <div class="stat-data">
                    <IconifiedText icon="fa6-solid:star">
                        {{ stats.averageRating.toFixed(1) }}
                    </IconifiedText>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { project } = defineProps({
    project: {
        type: Object,
        required: true
    }
})
const { metadata: meta } = project;
const stats = await useProjectStats(project.slug);

let galleryIndex = 0;
const galleryClick = () => {
    document.getElementById('gallery-' + galleryIndex).classList.remove('shown');
    galleryIndex++;
    if (galleryIndex >= project.assets.images.length) {
        galleryIndex = 0;
    }
    document.getElementById('gallery-' + galleryIndex).classList.add('shown');
}
</script>

<style scoped>
.project-sidebar {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    gap: 0.5rem;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.header .meta {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.meta .name {
    margin-bottom: 0;
}

.meta .pills {
    display: flex;
    margin-left: -0.1rem;
}

.header .icon {
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon img,
.icon object {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
}

.tagline {
    margin: 0.8rem 0;
}

.gallery .image {
    width: 100%;
    height: auto;
    display: none;
}

.gallery .shown {
    display: block !important;
}

.image img {
    max-height: 16rem;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 0.5rem;
}

.buttons {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
}

.stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
    margin: 0.5rem 0;
}

.stats .stat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0.175rem solid var(--light-gray);
    border-radius: 0.5rem;
    padding: 0.4rem 0.5rem;
}

.stat .stat-descriptor {
    font-size: 0.9rem;
    color: var(--light-gray);
}

.stat .license-link {
    margin-left: 0.3rem;
    font-size: 0.8rem;
}

/* Less than 800px */
@media screen and (max-width: 50rem) {
    .project-sidebar {
        min-width: 100%;
    }
}

/* Less than 650px */
@media screen and (max-width: 40.625rem) {

    /* Align everything centrally */
    .project-sidebar {
        align-items: center;
        margin: 1rem 0;
        max-width: 85vw;
    }

    /* Move the icon to the top */
    .header {
        flex-direction: column-reverse;
        text-align: center;
    }

    .header .meta {
        margin-bottom: 0.5rem;
    }

    .tagline {
        text-align: center;
    }

    .buttons {
        text-align: center;
    }

    .meta .pills {
        justify-content: center;
    }
}
</style>