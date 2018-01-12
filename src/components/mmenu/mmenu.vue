<template>
  <!--整个容器-->
  <!--<div class="menu-wrapper" v-show="showMenu" @click="close">-->
  <transition name="move">
    <!--侧边栏-->
    <div class="menu" @click.stop="" v-show="showMenu">
      <div class="top">
        <img :src="imgUrl" class="ii">
        <div class="des">挽歌</div>
      </div>
      <ul class="menu-list">
        <li v-for="(item,index) in menuArray" class="item" @click="close">
          <router-link :to="item.towhere" class="rou">
            <span class="newicon" :class="item.tt"></span>
            {{item.title}}
          </router-link>
        </li>
        <li class="item" @click="openColorDialog">
          <div class="rou">
            <span class="newicon icon-joomla"></span>
            换肤
          </div>
        <li class="item" @click="openColorDialog">
          <div class="rou">
            <span class="newicon icon-favorite"></span>
            love
          </div>
        </li>
      </ul>

      <!--换肤对话框-->
      <div class="theme" v-show="themeFlag" @click.stop="">
        <div class="back" @click="closeColorDialog">
          <span class="icon icon-arrow_lift"></span>
        </div>
        <h3>主题</h3>
        <div class="dia">
          <div v-for="(item,index) in colorArray" class="round" :style="{background:item}"
               @click="changeColor(index)">
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!--</div>-->


</template>

<script type="text/ecmascript-6">
  import {mapActions, mapState} from 'vuex'

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
        imgUrl: '../../static/xin.jpg',
        themeFlag: false
      }
    },
    props: [
      'showMenu'
    ],
    methods: {
//      selMenu(index) {
//        for (let i = 0; i < this.menuArray.length; i++) {
//          if (i === index) {
//            this.menuArray[i].sel = true
//          } else {
//            this.menuArray[i].sel = false
//          }
//        }
//      },
      changeColor(index) {
        this.changeBackgroundColor(index)//传递index
//        console.log(this.themeColor)
        this.closeColorDialog()//关闭颜色框
        this.close()//关闭侧边栏
      },
      openColorDialog() {
        this.themeFlag = true
      },
      closeColorDialog() {
        this.themeFlag = false
      },
      close() {
        this.closeDrawer()
      },
      ...mapActions([
        'closeDrawer',
        'changeBackgroundColor'
      ])
    },
    computed: {
      ...mapState([
        'colorArray',
        'themeColor'
      ])
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
    &.move-enter, &.move-leave-to
      opacity: 0
      transform: translateX(-100%)
    &.move-enter-active, &.move-leave-active
      transition: all .5s
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
            margin-right: 30px
    .theme
      position: fixed
      top: 0
      left: 0
      bottom: 0
      width: 100%
      color: white
      background: linear-gradient(to bottom right, rgba(166, 22, 22, 1), rgba(22, 22, 222, 1))
      z-index: 20
      .back
        display: block
        width: 50px
        heigth: 50px
        font-size: 22px
        .icon
          display: block
          padding: 10px
      .dia
        margin: auto
        width: 300px
        height: 180px
        .round
          display: inline-block
          margin: 15px 12px
          width: 50px
          height: 50px
          border-radius: 50%
          background: #000
</style>
