<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - William278.net` : 'Open source Minecraft server software & game projects - William278.net';
  },
  meta: [
    {
      name: 'description',
      content: 'Easily-accessible documentation and information site for all of William278\'s Minecraft plugins, projects & games'
    }
  ],
})
</script>

<!-- Global styles -->
<style>
/* Colors */
:root {
  --accent: #00fb9a;
  --white: #f5f5f5;
  --light-gray: #969696;
  --gray: #373737;
  --dark-gray: #242424;
  --background: #282828;
}

/* Core style rules (font, bg color) */
html {
  color-scheme: dark;
}

body {
  font-family: 'Nunito', sans-serif;
  background-color: var(--background);
  color: var(--white);

  /* Disable margin and padding */
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Default link styling */
a {
  text-decoration: none;
  color: var(--accent);
}

a:hover {
  text-decoration: underline;
  filter: brightness(85%);
}

/* Disable SVG pointer events */
object {
  pointer-events: none;
}

/* Box shadow */
.shadow {
  box-shadow: 0 0 0.75rem rgba(0, 0, 0, 0.1);
}
</style>