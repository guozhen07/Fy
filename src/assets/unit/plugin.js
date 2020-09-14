export default{
  install: function(Vue, options) {
    console.log(options)
    // 将字符串解析成json对象
    Vue.prototype.$resolveStr = function(str) {
      let random = parseInt(Math.random()*1000)
      let list = str.split('\n').map((item, index) => {
        return {id:`${random}_${index+1}`, text: item.replace(/\s/g, ''), type: "part", list: []}
      })
      
      list.forEach((item) => {
        // 检查label
        if(/^[\s\S]+:/.test(item.text)) {
          let index = item.text.indexOf(':')
          item.list.push({text: `${item.text.slice(0, index)}`, type: "label"})
        }
        // 检查关系nexus
        if(/:\([_A-Za-z]+\)/.test(item.text)) {
          let txt = item.text.match(/:\([_A-Za-z]+\)/)[0].replace(':', '')
          item.list.push({text: `${txt}`, type: 'nexus'})
        }
        // 检查注释note
        if(/\([\u4e00-\u9fa5]+\)/.test(item.text)) {
          let txt = item.text.match(/\([\u4e00-\u9fa5]+\)/)[0]
          item.list.push({text: `${txt}`, type: 'note'})
        }
        // 检查list
        if (/\[[\s\S]+:[\s\S]+\]/.test(item.text)) {
          let txt = item.text.match(/\[[\s\S]+:[\s\S]+\]/)[0].replace('[', '').replace(']', '')
          let charList = [...txt], indexList = [], startList = [], strList = []
          charList.forEach((char, index) => {
            if (char == ':') {
              indexList.push(index)
            }
          })
          indexList.forEach(charIndex => {
            startList.push(txt.lastIndexOf(',', charIndex))
          })
          startList.forEach((startIndex, index) => {
            if(startList[index+1]) {
              strList.push(txt.slice(startIndex+1, startList[index+1]))
            } else {
              strList.push(txt.slice(startIndex+1))
            }
          })
          let newList = strList.map(str => {
            let sl = str.split(':')
            let obj = {}
            obj.key = sl[0]
            obj.value = sl[1]
            return obj
          })
          item.list.push({text: txt, type: 'list', list: newList})
        }
      })
      return list
    }
    // 将json对象编译成html
    Vue.prototype.$compileToHtml = function(list) {
      if (Array.isArray(list) && list.length > 0) {
        let htmlStr = ''
        list.map((item) => {
          let html = ''
          // 判断nodeLabel
          if (item.nodeLabel) {
            html += `<label>${item.nodeLabel}</label>`
          }
          // 判断关系类型linkAttr
          if (item.linkAttr) {
            html += `:(${item.linkAttr.type})`
          }
          // 判断属性nodeAttr
          if (item.nodeAttr) {
            let snapHtml = ''
            let keys = Object.keys(item.nodeAttr)
            keys.forEach((key, index) => {
              if (index + 1 == keys.length) {
                snapHtml += `${key}:${item.nodeAttr[key]}`
              } else {
                snapHtml += `${key}:${item.nodeAttr[key]},`
              }
            })
            html += `[${snapHtml}]`
          }
          // 判断层次floor
          let tabs = ''
          if (item.floor == 0 || !item.floor) {
            html = `${html}`
          } else {
            for(let i = 1; i <= parseInt(item.floor); i++) {
              tabs += '&nbsp;&nbsp;&nbsp;&nbsp;'
            }
          }
          html = `<div @click="analyzeHandle(${item.id})" :class="{selected: ${item.id}==selectedId}">${tabs}${html}</div>`
          return html
        }).forEach(str => {
          htmlStr += str
        })
        return htmlStr
      } else {
        return `<div></div>`
      }
    };
    // 
  }
}