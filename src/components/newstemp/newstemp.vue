<template>
  <div class="newstempWrapper">
    <div class="pull" v-show="pullFlag">
      <img src="../../../static/loading.gif">
    </div>
    <div class="newstemp" ref="newstemp" v-show="news">
      <ul>
        <li v-for="item in finalData" class="item" @click="getFullPage(item.url)">
          <img class="ii" v-lazy="item.imgsrc">
          <div class="detail">
            <div class="title">{{item.title}}</div>
            <div class="wrapper">
              <span class="time">{{item.ptime}}</span>
              <span class="ratings">评论:{{item.commentCount | setComment}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="push" v-show="pushFlag">
      <img src="../../../static/loading.gif">
    </div>
    <div class="loading" v-show="!newsFlag">
      <img src="../../../static/loading.gif" v-show="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        apiUrl: this.fatherUrl,
        news: '',
        newsFlag: false,
        pullFlag: false,
        pushFlag: false,
        tipShow: false,
        count: 0,
        //是否开启下拉刷新，可传入true或者false,如果需要更多配置可以传入一个对象
        pullDownRefresh: {
          threshold: 70,
//          stop: 40
        },
        //是否开启上拉加载，同上，上拉无stop参数，这里需要注意是负数
        pullUpLoad: {
          threshold: -70,
          moreText: '加载更多'
        },
        finalData: [],//用于存储格式化的数据
      }
    },
    props: [
      'fatherUrl'
    ],
    methods: {
      //页面跳转
      getFullPage(url) {
//        console.log(url)
        window.location.href = url
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.newstemp, {
              click: true,
//            freeScroll: true,
              scrollY: true,
              pullUpLoad: this.pullUpLoad,
              pullDownRefresh: this.pullDownRefresh,
            }
          )
        } else {
          //告诉better-scroll数据已加载，能够重复加载
          this.scroll.finishPullUp()
          this.scroll.finishPullDown()
          this.scroll.refresh()
        }

        //上拉加载
        this.scroll.on('pullingUp', () => {
          this.pushFlag = true
          this.count = this.count + 10
//          console.log(this.count)
          setTimeout(() => {
            this.refreshPage(this.count)
            this.pushFlag = false
          }, 1000)
        })
        //下拉刷新
        this.scroll.on('pullingDown', () => {
          this.pullFlag = true
          setTimeout(() => {
            this.getAsynData(this.apiUrl)
            this.pullFlag = false
          }, 1000)
        })
//        this.scroll.on('scrollEnd', () => {
//          if (this.scroll.movingDirectionX !== 0) {
//            console.log('左')
//          }
//          if (this.scroll.movingDirectionY === 1) {
//            console.log('下')
//          } else {
//            console.log('上')
//          }
//        })
      },

      //异步获取数据并初始化better-scroll
      getAsynData(url) {
        let _this = this
        this.$http.get(url).then((res) => {
          _this.news = res.data
          _this.newsFlag = true
          //获得新数据并合并到最终数组里
          let temp = (_this.formatData(_this.news))
          _this.finalData = _this.finalData.concat(temp)
//          console.log(_this.finalData)
          _this.$nextTick(() => {
            _this._initScroll()
          })
        }).catch((error) => {
          console.log(error)
        })
      },
      //上拉刷新页面
      refreshPage(number) {
        this.getAsynData(this.getNewPageUrl(number))
      },

      //格式化传入的数据，返回一个对象
      formatData(data) {
        if (data) {
          let dea = data.slice(9, this.news.length - 1)
          let ndea = JSON.parse(dea)
          //这里得根据不同的url传递不同的值
          let eleArray = this.fatherUrl.split('/')
          let ele = eleArray[eleArray.length - 2]
          return ndea[ele]
        }
      },
      //获取新的url
      getNewPageUrl(number) {//新的url
        if (number > 50) {
          alert('没有更多数据')
          return
        }
        let urlArray = this.fatherUrl.split('/')
        if (urlArray[urlArray.length - 1] === `${number}-10.html`) {
          return
        }
        let url = ''
        for (let i = 0; i < urlArray.length - 1; i++) {
          url += urlArray[i] + '/'
        }
        url += `${number}-10.html`
        return url
      }
    },
    created() {
      this.getAsynData(this.apiUrl)
    },
    computed: {},
    filters: {
      setComment(value) {
        if (parseInt(value) >= 10000) {
          value = Math.floor(value / 10000) + "万"
        }
        return value
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .newstempWrapper
    width: 100%
    height: 100%
    .pull
      width: 100%
      height: 60px
      img
        display: block
        margin: 10px auto
        width: 40px
    .newstemp
      width: 100%
      height: 100%
      overflow: hidden
      .item
        position: relative
        display: flex
        height: 90px
        padding: 10px
        box-sizing: border-box
        img
          flex: 0 0 100px
          width: 100px
          height: 80px
          margin-right: 5px
        .detail
          flex: 1
          position: relative
          vertical-align: top
          height: 80px
          .title
            font-size: 18px
          .wrapper
            position: absolute
            display: flex
            left: 0
            right: 0
            bottom: 5px
            font-size: 12px
            .time
              flex: 1
              display: inline-block
            .ratings
              flex: 0 0 60px
              display: inline-block
      .tip
        width: 100%
        height: 50px
        background: #3ffff3
        z-index: 1
    .push
      position: fixed
      left: 0
      bottom: 0
      width: 100%
      height: 60px
      img
        display: block
        margin: 10px auto
        width: 40px
    .loading
      position: absolute
      top: 0
      left: 0
      bottom: 0
      width: 100%
      height: 100%
      background: rgba(222, 222, 222, .8)
      img
        display: block
        margin: 100px auto
        width: 150px
        height: 150px

</style>
