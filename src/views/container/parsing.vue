<template>
  <div class="cj_parsing">
    <header class="parsing_header">
      <strong class="title">DESCRIPTION</strong>
    </header>
    <ul class="cj_attr_list">
      <template v-for="(value, key, index) in arrObj">
        <li class="cj_attr_item" :key="index">
          <label>{{key}}:</label>
          <el-input type="text" :value="value"></el-input>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      elementItem: {
        type: Object,
        default:function() {
          return {}
        }
      }
    },
    data() {
      return {
        arrObj: {}
      }
    },
    watch: {
      elementItem(newObj) {
        // label样式
        if (newObj.nodeLabel) {
          this.$set(this.arrObj, 'label', newObj.nodeLabel)
        }
        // link信息
        if (newObj.linkAttr) {
          this.$set(this.arrObj, 'link', newObj.linkAttr.type)
        }
        // 属性信息
        if (newObj.nodeAttr) {
          let keys = Object.keys(newObj.nodeAttr)
          keys.forEach(key => {
            this.$set(this.arrObj, key, newObj.nodeAttr[key])
          })
        }
      }
    }
  }
</script>

<style lang="scss">
.cj_parsing{
  box-sizing: border-box;
  display: inline-block;
  width: 30%;
  height: 98%;
  border: 1px solid #d5d5d5;
  vertical-align: top;
  .parsing_header{
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 24px;
  }
  .cj_attr_list{
    .cj_attr_item{
      padding: 5px 0 5px 15px;
      font-size: 22px;
      label{
        display: inline-block;
        min-width: 70px;
        text-align: right;
      }
      .el-input{
        display: inline-block;
        width: 300px;
        margin-left: 10px;
      }
    }
  }
}
ul,li{
  list-style: none;
}
</style>