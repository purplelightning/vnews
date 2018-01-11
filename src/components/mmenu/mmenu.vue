<template>
  <div class="menu" v-show="showMenu">
    <div class="top">
      <img :src="imgUrl" class="ii">
      <div class="des">十二</div>
    </div>
    <ul class="menu-list">
      <li v-for="(item,index) in menuArray" class="item">
        <router-link :to="item.towhere" class="rou">
          <span class="newicon" :class="item.tt"></span>
          {{item.title}}
        </router-link>
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
            sel: false,
            towhere: '/homepage'
          },
          {
            title: '前端',
            tt: 'icon-html-five2',
            sel: false,
            towhere: '/qina'
          },
          {
            title: '阅读',
            tt: 'icon-book',
            sel: false,
            towhere: '/ads'
          },
          {
            title: '图片',
            tt: 'icon-images',
            sel: false,
            towhere: '/picture'
          }],
        imgUrl: '../../static/xin.jpg'
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
      },
//      showIndex(index) {
//        console.log(index)
//      }
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
        border: 1px solid #46e4ff
      .des
        margin-top: 20px
        color: white
    .menu-list
      .item
        width: 100%
        height: 60px
        line-height: 60px
        border-bottom: 1px solid #ccc
        .rou
          display: block
          color: #ccc
          &.active
            color: #3e8eff
          .newicon
            margin-left: 30px
            margin-right: 20px


</style>
