<template>
  <div class="intern-wrapper">
    <div class="top-header" :style="{background:themeColor}">
      <div class="icon icon-arrow_lift" @click="getBack"></div>
      <span class="title">前端实习</span>
      <div class="icon2 icon-search"></div>
    </div>
    <div class="cities">
      <span class="city" @click="changeCity(1)">杭州</span>
      <span class="city" @click="changeCity(2)">上海</span>
      <span class="city" @click="changeCity(3)">南京</span>
    </div>
    <div class="intern-content" v-show="fflag">
      <div class="intern" ref="intern">
        <ul>
          <li v-for="item in internData" class="item">
            <div class="ii">
              <img :src="item.logo_url" width="80" height="80">
            </div>
            <div class="content">
              <div class="title">{{item.name | ssl}}</div>
              <div class="des">{{item.city | ssplace}}/每周{{item.dayperweek | ssl}}天</div>
              <div class="name">{{item.company_name}}</div>
            </div>
            <div class="right">
              <div class="time">{{item.refresh | ssdate}}</div>
              <div class="salary">￥{{item.minsalary}}-{{item.maxsalary}}/天</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading" v-show="!fflag">
      <img src="../../../static/loading.gif">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {INTERN} from 'common/js/url'
  import {mapActions, mapState} from 'vuex'
  import BScroll from 'better-scroll'

  let head = 'interns/search?p='
  let tail = '&k=前端&i=&c=杭州&s=-&x=&d=&m='
  let count = 1

  export default {
    data() {
      return {
        fflag: false,
        internData: [],
        //是否开启上拉加载，同上，上拉无stop参数，这里需要注意是负数
        pullUpLoad: {
          threshold: -70,
        },
        apiUrl: INTERN
      }
    },
    methods: {
      changeCity(index) {
        if (index === 1) {
          tail = '&k=前端&i=&c=杭州&s=-&x=&d=&m='
        } else if (index === 2) {
          tail = '&k=前端&i=&c=上海&s=-&x=&d=&m='
        } else {
          tail = '&k=前端&i=&c=南京&s=-&x=&d=&m='
        }
        this.apiUrl = head + 1 + tail
        count = 1
        this.internData = []
        this.getData(this.apiUrl)
      },
      getData(url) {
        let _this = this
        this.$http.get(url).then((res) => {
//          console.log(res.data.msg)
          _this.internData = this.internData.concat(res.data.msg)
          console.log(_this.internData)
          _this.fflag = true
        }).catch((err) => {
          console.log(err)
        })
      },
      initScroll() {
        if (!this.iScroll) {
          this.iScroll = new BScroll(this.$refs.intern, {
            click: true,
            scrollY: true,
            pullUpLoad: this.pullUpLoad
          })
        } else {
          this.iScroll.refresh()
        }
        this.iScroll.on('pullingUp', () => {
          this.fflag = false
//          setTimeout(() => {
          this.refreshPage()
          console.log(count)
//          }, 10)
        })
      },
      getBack() {
        this.openDrawer()
      },
      refreshPage() {
        count++
        if (count <= 3) {
          let url = head + 2 + tail
          this.getData(url)
        } else if (count > 3 && count < 6) {
          let url = head + 3 + tail
          this.getData(url)
        } else {
          let url = head + 4 + tail
          this.getData(url)
        }
      },
      ...mapActions([
        'openDrawer'
      ])
    },
    created() {
      this.getData(this.apiUrl)
    },
    mounted() {
      this.initScroll()
    },
    watch: {
      internData() {
        this.initScroll()
      }
    },
    computed: {
      ...mapState([
        'themeColor'
      ])
    },
    filters: {
      ssl: function (value) {
//        let arr = value.split('&')
        let arr = value.split(/[&]/)
//        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          switch (arr[i]) {
            case '#xf1b1':
              arr[i] = '5'
              break
            case '#xebe9':
              arr[i] = '3'
              break
            case '#xf124':
              arr[i] = '前'
              break
            case '#xe65c':
              arr[i] = '端'
              break
            case '#xf856':
              arr[i] = '工'
              break
            case '#xeefa':
              arr[i] = '程'
              break
            case '#xf154':
              arr[i] = '师'
              break
            case '#xf747':
            case '#xefb5':
              arr[i] = 'w'
              break
            case '#xed10':
              arr[i] = 'e'
              break
            case '#xe543':
              arr[i] = 'b'
              break
            case '#xee44':
              arr[i] = '0'
              break
            case '#xec1e':
              arr[i] = '1'
              break
            case '#xe9d5':
              arr[i] = '4'
              break
            case '#xe376':
              arr[i] = '6'
              arr[i] = arr[i]
              break
            default:
              arr[i] = arr[i]
          }
        }
//        console.log(arr)
        let str = arr.join('')
        let subStr = new RegExp('#xe65c', 'ig')
        let res = str.replace(subStr, '端')
        if(arr.length>9){
          return res.slice(0,8)+'...'
        }
        return res
      },
      ssdate: function (value) {
        let arr = value.split(/[&:-]/)
        for (let i = 0; i < arr.length; i++) {
          switch (arr[i]) {
            case '#xee44':
              arr[i] = '0'
              break
            case '#xec1e':
              arr[i] = '1'
              break
            case '#xe18a':
              arr[i] = '2'
              break
            case '#xebe9':
              arr[i] = '3'
              break
            case '#xe9d5':
              arr[i] = '4'
              break
            case '#xf1b1':
              arr[i] = '5'
              break
            case '#xf379':
              arr[i] = '6'
              break
            case '#xe434':
              arr[i] = '8'
              break
            case '#xe376':
              arr[i] = '9'
              break
            default:
              arr[i] = arr[i]
          }
        }
        arr[3] = '-'
        arr[6] = '-'
        arr[9] = ':'
        return arr.join('')
      },
      ssplace: function (value) {
        let subStr = new RegExp('&#xe65b', 'ig')
        return value.replace(subStr, '广')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .intern-wrapper
    position: absolute
    top: 0
    bottom: 0
    right:0
    left: 0
    width: 100%
    background: #efffff
    .top-header
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
      .icon2
        display: inline-block
        float: right
        line-height: 60px
        width: 40px
        height: 100%
      .title
        margin: auto
    .cities
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      .city
        flex: 1
        text-align: center
        border: 1px solid #ccc

    .intern-content
      position: absolute
      top: 100px
      left: 0
      bottom: 0
      width: 100%
      .intern
        width: 100%
        height: 100%
        overflow: hidden
        .item
          display: flex
          width: 100%
          height: 110px
          color: #888
          box-sizing: border-box
          border-bottom: 1px solid #ccc
          .ii
            flex: 0 0 100px
            padding: 10px
            box-sizing: border-box
          .content
            flex: 1
            font-size: 14px
            .title
              margin: 10px 0
              font-size: 20px
              color: black
            .des
              margin-bottom: 10px
              color: #888
          .right
            flex: 0 0 110px
            font-weight: 600
            .time
              margin: 20px 0 20px 0
              text-align: center
              font-size: 14px
            .salary
              color: #ff4e20
              font-weight: 700

    .loading
      width: 100%
      height: 100%
      img
        display: block
        margin: 100px auto
        width: 150px
        height: 150px

</style>
