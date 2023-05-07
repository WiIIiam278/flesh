<template>
    <div class="overbar">
        <slot />
    </div>
</template>

<style scoped>
.overbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>