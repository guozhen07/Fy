<template>
  <div class="main_nav">
    <div class="main_logo">
      <img class="logo" src="../assets/imgs/logo.png" alt="logo">
      <el-menu 
        mode="horizontal"
        background-color="#63a1da"
        text-color="#fff"
        active-text-color="#fff"
        :activeIndex="0"
        @select="selectHandle">
        <el-submenu index="1">
          <template slot="title">文件</template>
          <el-menu-item index="1-1">创建项目</el-menu-item>
          <el-menu-item index="1-2">创建文件夹</el-menu-item>
          <el-menu-item index="1-3">创建文件</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      selectHandle(){
        this.activeIndex = 0
      }
    }
  }
</script>

<style lang="scss">
.main_nav{
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .main_logo{
    display: flex;
    align-items: center;
    img.logo{
      height: 30px;
      width: 30px;
    }
    .main_title{
      font-size: 20px;
      margin-left: 10px;
    }
  }
}
</style>