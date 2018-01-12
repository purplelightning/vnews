<template>
  <div class="picture-wrapper">
    <div class="top" :style="{background:themeColor}">
      <div class="icon icon-arrow_lift" @click="getBack"></div>
      <span class="title">图片</span>
    </div>
    <div class="picture" ref="picture">
      <ul class="picture-list">
        <li v-for="item in pcontent" class="item">
          <img :src="item.src" class="ii">
        </li>
      </ul>
    </div>
    <loading :ashow="!fflag"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {PHOTO} from 'common/js/url'
  import {mapActions, mapState} from 'vuex'
  import loading from 'components/loading/loading'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        apiUrl: PHOTO,
        pcontent: {},
        fflag: false,
        pullUpLoad: {//上拉加载
          threshold: -70,
        },
      }
    },
    created() {
      this.getImg()
    },
    methods: {
      getImg() {
        var _this = this
        this.$http.get(this.apiUrl).then((res) => {
          _this.pcontent = res.data.images
          _this.fflag = true
//          console.log(_this.pcontent)
//          获取完数据后，在初始化better-scroll
          _this.$nextTick(() => {
            _this._initScroll()
          })

        }).catch((error) => {
          console.log(error)
        })
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.picture, {
            click: true,
            pullUpLoad: this.pullUpLoad,
          })
        } else {
          this.scroll.refresh()
        }
        this.scroll.on('pullingUp', () => {
          console.log('没有数据')
        })
      },
      getBack() {
        this.openDrawer()
      },
      ...mapActions([
        'openDrawer'
      ])
    },
    components: {
      loading
    },
    computed: {
      ...mapState([
        'themeColor'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .picture-wrapper
    .top
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 60px
      line-height: 60px
      background: #ff1f00
      color: white
      text-align: center
      font-size: 20px
      .icon
        display: inline-block
        float: left
        line-height: 60px
        width: 40px
        height: 100%
      .title
        margin: auto

    .picture
      position: absolute
      top: 60px
      left: 0
      bottom: 0
      width: 100%
      overflow: hidden
      .picture-list
        text-align: center
        .item
          display: inline-block
          vertical-align: middle
          .ii
            width: 180px
            margin: 5px 10px
</style>
