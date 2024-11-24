<template>
    <div class="section">
        <PageHero v-if="is('hero')" :title="title" :body="body" :color1="props.color1" :color2="props.color2" :project="project">
            <PageButtonPair
                :button1Label="props.button1_label" :button1Icon="props.button1_icon" :button1Url="props.button1_url" 
                :button2Label="props.button2_label" :button2Icon="props.button2_icon" :button2Url="props.button2_url"
            />
        </PageHero>
        <PageHeaderWithText v-if="is('header_with_text')" :title="title" :body="body">
            <PageButtonPair
                :button1Label="props.button1_label" :button1Icon="props.button1_icon" :button1Url="props.button1_url" 
                :button2Label="props.button2_label" :button2Icon="props.button2_icon" :button2Url="props.button2_url"
            />
        </PageHeaderWithText>
        <PageImageWithText v-if="is('image_with_text')" :title="title" :body="body" :imageUrl="props.image_url" :imagePosition="props.image_position">
            <PageButtonPair :centered="false"
                :button1Label="props.button1_label" :button1Icon="props.button1_icon" :button1Url="props.button1_url" 
                :button2Label="props.button2_label" :button2Icon="props.button2_icon" :button2Url="props.button2_url"
            />
        </PageImageWithText>
        <PageFeatures v-else-if="is('features')" 
            :iconBackgroundColor1="props.icon_background_color1" :iconBackgroundColor2="props.icon_background_color2"
            :feature1Title="props.feature1_title" :feature1Icon="props.feature1_icon" :feature1Body="props.feature1_body"
            :feature2Title="props.feature2_title" :feature2Icon="props.feature2_icon" :feature2Body="props.feature2_body"
            :feature3Title="props.feature3_title" :feature3Icon="props.feature3_icon" :feature3Body="props.feature3_body"
        />
        <PageButtonPair v-else-if="is('button_pair')" 
            :button1Label="props.button1_label" :button1Icon="props.button1_icon" :button1Url="props.button1_url"
            :button2Label="props.button2_label" :button2Icon="props.button2_icon" :button2Url="props.button2_url"
        />
        <PagePlatformBadges v-else-if="is('platform_badges')" :project="project" 
            :badgeRangeStart="parseInt(props?.badge_range_start ?? '0')" :badgeRangeEnd="parseInt(props?.badge_range_end ?? '5')"
        />
        <hr v-else-if="is('horizontal_rule')" />
        <MDC v-else-if="is('paragraph')" :value="body" tag="p" unwrap="p" />
        <MDC v-else-if="is('title')" :value="title" tag="h1" unwrap="p" />
    </div>
</template>

<script setup>
const { section } = defineProps({
    project: {
        type: Object,
        required: true
    },
    section: {
        type: Object,
        required: true
    }
})
const { type, title, body, properties: props } = section;
const is = (t) => type === t;

</script>