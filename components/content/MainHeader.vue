<template>
    <div id="main-header">
        <div id="header-text">
            <h1>{{ title }}</h1>
            <p id="tagline">
                <ContentSlot :use="$slots.default" unwrap="p" />
            </p>
        </div>
        <a id="header-icon" href="https://twitter.com/William27528" target="_blank">
            <img src="assets/images/icons/william-head.png" id="head-graphic" class="shadow"
                alt="William278's player head" />
        </a>
    </div>
</template>

<style scoped>
#main-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

#main-header #header-text {
    display: flex;
    flex-direction: column;
}

#header-text h1 {
    margin: 0;
}

#header-text p {
    margin: 0;
    font-size: large;
}

#main-header #header-icon {
    display: flex;
    justify-content: flex-end;
}

#head-graphic {
    margin: 1.5em 0;
    border-radius: 0.5em;
}
</style>

<script>
export default {
    name: 'MainHeader',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>