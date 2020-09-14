<template>
  <div class="main">
    <main-nav></main-nav>
    <div id="container">
      <main-aside></main-aside>
      <main-container></main-container>
    </div>
  </div>
</template>

<script>
  import MainNav from './main-nav.vue'
  import MainAside from './main-aside'
  import MainContainer from './main-container'
  export default{
    components: {MainNav, MainAside, MainContainer},
    data() {
      return {}
    },
    methods: {
      // tab页切换
      navHandle(tab) {
        this.active = tab.name
      }
    }
  }
</script>

<style lang="scss">
.main{
  #container{
    width: 100%;
    background: #fff;
    display: flex;
    flex-flow: row nowrap;
    
  }
}
</style>