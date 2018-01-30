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
            <div class="title">{{item.name}}</div>
            <div class="des">{{item.city}}/每周{{item.dayperweek}}天</div>
            <div class="name">{{item.company_name}}</div>
          </div>
          <div class="right">
            <div class="time">{{item.refresh}}</div>
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
        box-sizing: border-box
        overflow: hidden
        border-bottom: 1px solid #ccc
        .ii
          flex: 0 0 100px
          padding: 10px
          box-sizing: border-box
        .content
          flex: 1
          .title
            font-size: 20px
          .des
            color:#888
            font-size: 18px
        .right
          flex: 0 0 110px
          color: red
          font-weight: 600

</style>
