<template>
  <div class="menu" v-show="showMenu">
    <div class="top">
      <img :src="imgUrl" class="ii">
      <div class="des">#######</div>
    </div>
    <ul class="menu-list">
      <li v-for="(item,index) in menuArray" class="item" @click="selMenu(index)"
          :class="{'selected':menuArray[index].sel}">
        <span class="newicon" :class="menuArray[index].tt"></span>
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        count: 5,
        menuArray: [
          {
            title: '新闻',
            tt: 'icon-newspaper',
            sel: false
          },
          {
            title: '前端',
            tt: 'icon-html-five2',
            sel: false
          },
          {
            title: '阅读',
            tt: 'icon-book',
            sel: false
          },
          {
            title: '图片',
            tt: 'icon-images',
            sel: false
          }],
        imgUrl: '../../static/black.jpg'
      }
    },
    props: [
      'showMenu'
    ],
    methods: {
      selMenu(index) {
        for (let i = 0; i < this.menuArray.length; i++) {
          if (i === index) {
            this.menuArray[i].sel = true
          } else {
            this.menuArray[i].sel = false
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .menu
    position: absolute
    top: 0
    left: 0
    bottom: 0
    width: 250px
    height: 100%
    color: white
    background: #262626
    z-index: 10
    .top
      width: 100%
      height: 200px
      padding: 20px
      box-sizing: border-box
      text-align: center
      background: #393939
      .ii
        display: block
        margin: auto
        width: 100px
        height: 100px
        border-radius: 50%
        border: 1px solid #ff6d6f
      .des
        margin-top: 20px
        color: white
    .menu-list
      .item
        width: 100%
        height: 60px
        line-height: 60px
        border-bottom: 1px solid #ccc
        &.selected
          color: #3e8eff
        .newicon
          margin-left:30px
          margin-right:20px

</style>
