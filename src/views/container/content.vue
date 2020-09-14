<template>
  <div class="cj_content">
    <header class="content_menu">
      <template v-for="(item,index) in tabMenu">
        <div :key="index" :class="['content_menu_item', {'selected': item.id==tabSelected.id}]" @click="selectTab(item)">
          <span>{{item.title}}</span>
        </div>
      </template>
    </header>
    <section class="content_tools">
      <button class="cj_btn cj_btn_text" @click="saveHandle">保存</button>
      <button class="cj_btn cj_btn_text" @click="editorHandle">编辑</button>
      <button class="cj_btn cj_btn_text" @click="viewHandle">视图</button>
      <button class="cj_btn cj_btn_text" @click="searchHandle">查询</button>
    </section>
    <section class="content_editor">
      <div class="cj_editor">
        <div class="code" contenteditable="true" v-html="html"></div>
      </div>
      <div id="mount-point" class="cj_html">

      </div>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue/dist/vue.esm.js'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        isEditor: true,
        html: ``,
        elemntList: []
      }
    },
    computed: {
      ...mapState({
        tabMenu: 'tabMenu',
        tabSelected: 'tabSelected'
      })
    },
    watch: {
      tabSelected(newObj) {
        this.html = newObj.htmlStr
        this.elemntList = newObj.objList
        this.mountDom(newObj.htmlStr)
      }
    },
    methods: {
      // 选择tab页
      selectTab(item) {
        this.$store.commit('selectPage', item)
      },
      // 保存
      saveHandle() {
      },
      // 编辑
      editorHandle() {
        this.isEditor = true
      },
      // 视图
      viewHandle() {
        this.isEditor = false
      },
      // 搜索
      searchHandle() {},
      // 挂载到DOM上
      mountDom(html) {
        let vm = this
        var Profile = Vue.extend({
              template: `<div class="code mount_html">${html}</div>`,
              data() {
                return {
                  selectedId: ''
                }
              },
              methods: {
                // 点击获取当前行的信息
                analyzeHandle(id) {
                  this.selectedId = id
                  let elementItem = vm.elemntList.filter(item => {
                    return item.id == id
                  })[0]
                  vm.$emit('setParse', elementItem)
                },
              }
            })
        let dom = new Profile().$mount()
        // let dom = renderHtml(html)
        let domList = document.getElementsByClassName('mount_html')
        let parentDom = document.getElementById('mount-point')
        if (domList.length > 0) {
          parentDom.removeChild(domList[0])
        }
        parentDom.append(dom.$el)
      }
    },
    mounted() {}
  }
</script>

<style lang="scss">
.cj_content{
  box-sizing: border-box;
  display: inline-block;
  width: 70%;
  height: 98%;
  border: 1px solid #d5d5d5;
  vertical-align: top;
  .content_menu{
    height: 40px;
    overflow-x: auto;
    overflow-y: hidden;
    transform: translateY(2px);
    .content_menu_item{
      display: inline-block;
      height: 40px;
      padding: 0 10px 0 10px;
      line-height: 36px;
      border: 1px solid #d1d1d1;
      background-color: #f1f1f1;
      cursor: pointer;
      &.selected{
        background-color: #fff;
        border-bottom: none;
      }
    }
  }
  .content_tools{
    padding: 5px 10px;
    border-bottom: 1px solid #d1d1d1;
    border-top: 1px solid #d1d1d1;
    .cj_btn{
      cursor: pointer;
      &.cj_btn_text{
        font-size: 18px;
        color: #333;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        margin-left: 10px;
      }
    }
  }
  .content_editor{
    height: 760px;
    .cj_editor{
      height: 380px;
      overflow-y: auto;
      border: none;
      border-bottom: 1px solid #d1d1d1;
      background-color: #efefef;
    }
    .el-textarea__inner{
      overflow: hidden;
      border: none;
    }
    .cj_html{
      height: 380px;
      overflow-y: auto;
      padding: 10px 15px;
      font-size: 14px;
      .code{
        background-color: #fff;
        line-height: 24px;
        font-size: 14px;
        &::before{
          outline-color: #fff;
          background-color: #fff;
        }
      }
      .selected{
        background-color: rgba(216,233,253, 0.5);
      }
    }
    .code{
      padding: 5px 10px 10px 40px;
      font-size: 13px;
      line-height: 18px;
      background-color: #efefef;
      font-family: "Lucida Console", Consolas, Monaco;
      white-space: pre-wrap;
      word-break: break-all;
      position: relative;
      &::before{
        content: '01\A 02\A 03\A 04\A 05\A 06\A 07\A 08\A 09\A 10\A 11\A 12\A 13\A 14\A 15\A 16\A 17\A 18\A 19\A 20\A 21\A 22\A 23\A 24\A 25\A 26\A 27\A 28\A 29\A 30\A 31\A 32\A 33\A 34\A 35\A 36\A 37\A 38\A 39\A 40\A 41\A 42\A 43\A 44\A 45\A 46\A 47\A 48\A 49\A 50\A 51\A 52\A 53\A 54\A 55\A 56\A 57\A 58\A 59\A 60\A 61\A 62\A 63\A 64\A 65\A 66\A 67\A 68\A 69\A 70\A 71\A 72\A 73\A 74\A 75\A 76\A 77\A 78\A 79\A 80\A 81\A 82\A 83\A 84\A 85\A 86\A 87\A 88\A 89\A 90\A 91\A 92\A 93\A 94\A 95\A 96\A 97\A 98\A 99';
        position: absolute;
        top: 5px;
        bottom: 10px;
        left: 0;
        text-align: left;
        background-color: #efefef;
        color: #333;
        outline: 20px solid #efefef;
        overflow: hidden;
      }
    }
  }
}
</style>

