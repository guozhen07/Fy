<template>
  <div class="main_container">
    <!-- <el-input type="textarea" autosize v-model="txtContent"></el-input> -->
    <cj-content @setParse="setParse"></cj-content>
    <cj-parsing :elementItem="elementItem"></cj-parsing>
  </div>
</template>

<script>
  import CjContent from './container/content'
  import CjParsing from './container/parsing'
  export default{
    components: {CjContent, CjParsing},
    data() {
      return {
        txtContent: '',
        elementItem: {}
      }
    },
    methods: {
      // 获取结构信息并赋值
      setParse(elementItem) {
        this.elementItem = elementItem
      }
    }
  }
</script>

<style lang="scss">
.main_container{
  flex-grow: 1;
}
</style>