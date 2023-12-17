<template>
  <nav>
    <router-link to="/page1">Data Collection Interface</router-link> |
    <router-link to="/filemanager">File Manager</router-link> |
    <router-link to="/page2">ML Training Interface</router-link> |
    <router-link to="/page3">Image Tagging  Interface</router-link> |
    <router-link to="/tags">Tags Listing Interface</router-link> |
    <router-link to="/viewTags"> Tags Display Interface</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
