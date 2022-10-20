<template>
  <NuxtPage />
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
  --dark-gray: #202020;
  --background: #282828;
  --shadow: 0 0 0.75rem rgba(0, 0, 0, 0.1);
}

/* Scrollbar style rules (font, bg color) */
html {
  color-scheme: dark;
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
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
  box-shadow: var(--shadow);
}

/* Interactive images */
.hover-image:hover {
  filter: brightness(85%);
  cursor: pointer;
  transform: scale(1.025);
}

/* Heading anchor links and rules */
h1 {
  margin-top: 0;
  font-size: 1.8rem;
}

h1 a,
h2 a,
h3 a,
h4 a,
h5 a {
  color: inherit;
  text-decoration: none !important;
}

/* Horizontal rules */
hr {
  border: 0;
  border-top: 0.2rem solid var(--light-gray);
  margin: 1.5rem 0;
}

/* Article (markdown) content */
article {
  max-width: 80vw;
  margin: 0 auto;
  padding: 0;
}

article h1, h2 {
  border-bottom: var(--gray) 0.125rem solid;
  padding-bottom: 0.25rem;
}

article img,
article object {
  max-width: 100%;
}

article pre {
  display: block;
  background-color: var(--dark-gray);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
  overflow: auto !important;
  position: relative !important;
}

article pre code {
  overflow: auto;
  word-break: normal;
  word-wrap: normal;
  background-color: unset !important;
  padding: unset !important;
  border-radius: unset !important;
}

article table {
  display: block;
  overflow: auto !important;
  position: relative !important;
}

/* Tables */
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: 0.5rem 0;
  border-color: var(--light-gray);
}

table th,
table td {
  text-align: left;
  padding: 0.5rem;
  border: 0.1rem solid var(--light-gray);
}

table th {
  text-align: center;
  font-weight: bold;
}

table tr:nth-child(even) {
  background-color: var(--gray);
}

code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
}

code {
  background-color: var(--dark-gray);
  padding: 0.2rem;
  border-radius: 0.2rem;
}
</style>