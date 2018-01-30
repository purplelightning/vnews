<template>
  <div class="intern-wrapper">
    <div class="top-header" :style="{background:themeColor}">
      <div class="icon icon-arrow_lift" @click="getBack"></div>
      <span class="title">前端实习</span>
      <div class="icon2 icon-search"></div>
    </div>
    <div class="intern">
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
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {INTERN} from 'common/js/url'
  import {mapActions, mapState} from 'vuex'
  import BScroll from 'better-scroll'

  let apiUrl='interns/search?p=1&k=%E5%89%8D%E7%AB%AF&i=&c=%E6%9D%AD%E5%B7%9E&s=-&x=&d=&m='


  export default {
    data() {
      return {
        fflag: true,
        internData: []
      }
    },
    methods: {
      getData(url) {
        this.$http.get(url).then((res) => {
//          console.log(res.data.msg)
          this.internData = res.data.msg
        }).catch((err) => {
          console.log(err)
        })
      },
      initScroll() {

      },
      getBack() {
        this.openDrawer()
      },
      ...mapActions([
        'openDrawer'
      ])
    },
    created() {
      this.getData(INTERN)
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
        console.log(str)
        let subStr = new RegExp('#xe65c', 'ig')
        let res = str.replace(subStr, '端')
        return res
      },
      ssdate: function (value) {
        let arr = value.split(/[&:-]/)
        for (let i = 0; i < arr.length; i++) {
          switch (arr[i]) {
            case '#xf1b1':
              arr[i] = '5'
              break
            case '#xebe9':
              arr[i] = '3'
              break
            case '#xee44':
              arr[i] = '0'
              break
            case '#xec1e':
              arr[i] = '1'
              break
            case '#xf379':
              arr[i] = '6'
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

    .intern
      width: 100%
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
          flex: 0 0 200px
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
          width: 100%
          color: red
          font-weight: 600
          .time
            margin: 20px 0 20px 0
            text-align: center
            font-size: 14px
          .salary
            color: #ff4e20
            font-weight: 700

</style>
