<template>
  <div class="main_aside" :style="{width: width}">
    <ul class="cj_menu">
      <template v-for="(item1, index1) in objList">
        <li :key="index1" class="cj_menu_item" v-if="item1.type==1">
          <div class="cj_item_title" @click="selectHandle(item1)">
            <i :class="['el-icon-arrow-right', {'cj_selected': item1.selected}]"></i>
            <span>{{item1.title}}</span>
          </div>
          <ul class="cj_submenu" v-show="item1.selected">
            <template v-for="(item2, index2) in item1.list">
              <li :key="index2" class="cj_menu_item" v-if="item2.type==2">
                <div class="cj_item_title" @click.stop="selectHandle(item2)">
                  <i :class="['el-icon-arrow-right', {'cj_selected': item2.selected}]"></i>
                  <span>{{item2.title}}</span>
                </div>
                <ul class="cj_submenu" v-show="item2.selected">
                  <template v-for="(item3, index3) in item2.list">
                    <li :key="index3" class="cj_menu_item" v-if="item3.type==3">
                      <div class="cj_item_title" @click.stop="selectFile(item3)">
                        <i class="el-icon-document"></i>
                        <span>{{item3.title}}</span>
                      </div>
                    </li>
                  </template>
                </ul>
              </li>
              <li :key="index2" class="cj_menu_item" v-if="item2.type==3">
                <div class="cj_item_title" @click.stop="selectFile(item2)">
                  <i class="el-icon-document"></i>
                  <span>{{item2.title}}</span>
                </div>
              </li>
            </template>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  export default{
    props: {
      width: {
        default: '300px'
      }
    },
    data() {
      return {
        objList: []
      }
    },
    methods: {
      // 获取sidebar列表
      getSidebar() {
        this.$http.get('/mock/menu.json').then(({data}) => {
          if (data.code == 0) {
            this.objList = data.data
            console.log(this.objList)
          }
        })
      },
      // 获取数据
      getContentData(url) {
        this.$http.get(url).then(({data}) => {
          if (data.code == 0) {
            // 生成随机数
            let random = parseInt(Math.random()*1000)
            // 给每个对象增加一个临时ID
            let elemntList = data.data.map((item, index) => {
              item.id = `${random}${index+1}`
              return item
            })
            // let html = this.$compileToHtml(elemntList)
            //this.mountDom(this.html)
            return elemntList
          }
        })
      },
      // 点击选择文件夹
      selectHandle(item) {
        item.selected = !item.selected
      },
      // 选择文件
      selectFile(item) {
        let url = ''
        if (item.id == 1003) {
          url = '/mock/data.json'
        } else if (item.id == 1004) {
          url = '/mock/data1.json'
        }
        this.$http.get(url).then(({data}) => {
          if (data.code == 0) {
            // 生成随机数
            let random = parseInt(Math.random()*1000)
            // 给每个对象增加一个临时ID
            let elemntList = data.data.map((item, index) => {
              item.id = `${random}${index+1}`
              return item
            })
            let html = this.$compileToHtml(elemntList)
            //this.mountDom(this.html)
            let tabItem = {id: item.id, title: item.title, objList: elemntList, htmlStr: html}
            this.$store.commit('addtabMenu', tabItem)
          }
        })
      }
    },
    mounted() {
      this.getSidebar()
    }
  }
</script>

<style lang="scss">
.main_aside{
  flex-grow: 0;
  height: calc( 900px - 60px);
  border: 1px solid #ddd;
  cursor: pointer;
  ul{
    list-style-type: none;
    li{
      list-style-type: none;
      .cj_item_title{
        .el-icon-arrow-right{
          transform: rotate(0deg);
          transition: transform .3s;
          &.cj_selected{
            transform: rotate(90deg);
            transition: transform .3s;
          }
        }
      }
    }
  }
}
</style>