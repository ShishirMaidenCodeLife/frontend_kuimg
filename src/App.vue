<template>
  <nav>
    <router-link to="/page1">Data Collection Interface</router-link> 
    <router-link to="/filemanager">File Manager</router-link> 
    <router-link to="/page2">ML Training Interface</router-link> 
    <router-link to="/page3">Image Tagging  Interface</router-link> 
    <router-link to="/tags">Tags Listing Interface</router-link>    
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
  background-color: #fcfaff;
}

nav {
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;


}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 30px;
}
nav a:hover {
  color: #c73c8be2;
  text-decoration-line: none;
}

nav a.router-link-exact-active {
  color: #e66db1;
}
</style>
