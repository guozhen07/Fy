<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body{
  margin: 0;
  font-size: 18px;
}
#app {
  box-sizing: border-box;
  max-width: 1920px;
  min-width: 1024px;
  height: 940px;
  padding: 0 20px 20px 20px;
  background-image: linear-gradient(#63a1da, #d8e9fd);
  margin:0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
