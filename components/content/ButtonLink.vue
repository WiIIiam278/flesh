<template>
    <a :href="link ? link : '#'" class="button-link">
        <div v-if="!$slots.default && icon">
            <Icon :name="icon" class="button-icon" />
        </div>
        <div v-else :class="`button ${hollow ? 'hollow' : 'filled'} ${hollow ? 'hollow' : 'filled'}-color-${color}`">
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
    margin: 0.15rem;
}

.button:hover {
    cursor: pointer;
}

.filled {
    color: var(--dark-gray);
}

.filled-color-accent {
    border: 0.2rem solid var(--accent);
    background-color: var(--accent);
}

.filled-color-red {
    border: 0.2rem solid rgb(255, 66, 66);
    background-color: rgb(255, 66, 66);
}

.hollow {
    background-color: none;
}

.hollow-color-accent {
    border: 0.2rem solid var(--accent);
    color: var(--accent);
}

.hollow-color-red {
    border: 0.2rem solid rgb(255, 66, 66);
    color: rgb(255, 66, 66);
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
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        hollow: {
            type: Boolean,
            required: false,
            default: false
        },
        color: {
            type: String,
            required: false,
            default: 'accent'
        }
    }
}
</script>