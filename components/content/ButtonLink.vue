<template>
    <a :href="link" class="button-link">
        <div v-if="!$slots.default && icon">
            <Icon :name="icon" class="button-icon" />
        </div>
        <div v-else :class="hollow ? 'button hollow' : 'button filled'">
            <span v-if="icon">
                <IconifiedText :icon="icon">
                    <ContentSlot :use="$slots.default" unwrap="p" />
                </IconifiedText>
            </span>
            <span v-else>
                <ContentSlot :use="$slots.default" unwrap="p" />
            </span>
        </div>
    </a>
</template>

<style scoped>
.button {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;
    border: 0.2rem solid var(--accent);
    margin: 0.15rem;
}

.filled {
    background-color: var(--accent);
    color: var(--dark-gray);
}

.hollow {
    background-color: none;
    color: var(--accent);
}

.button-icon {
    margin-top: 0.15rem;
    font-size: 1.6rem;
}
</style>

<script>
export default {
    name: 'Button',
    props: {
        link: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: false
        },
        hollow: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>