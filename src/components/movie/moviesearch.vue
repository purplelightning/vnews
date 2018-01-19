<template>
  <div class="search-wrapper">
    <div class="search">
      <div class="top">
        <div class="icon icon-evil"></div>
        <input type="text" class="searchmov" placeholder="电影"
               v-model="msg" @keyup.enter="doSearch"
        >
        <div class="done" @click="doSearch">搜索</div>
        <div class="cancel" @click="goBack">取消</div>
      </div>
      <div class="content" ref="content">
        <div class="list-wrapper" v-show="fflag">
          <div class="count">共{{searchData.total}}个电影</div>
          <ul class="search-list" ref="searchList">
            <li v-for="item in searchMovie" class="item">
              <div class="ii">
                <img :src="item.images.small">
              </div>
              <div class="des">
                <div class="title">{{item.title}}</div>
                <div class="rating" v-show="item.rating.average>0">
                  <star :size="24" :score="item.rating.average"></star>
                  <span class="rating">{{item.rating.average}}</span>
                </div>
                <div class="rating" v-show="item.rating.average==0">
                  还没有评分
                </div>

                <div class="director">导演：{{item.directors[0].name}}</div>
                <div class="casts">
                  主演：<span v-for="tt in item.casts.slice(0,2)">{{tt.name}}/</span>
                  <span>{{item.casts[2].name}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {MOVIE} from 'common/js/url'
  import star from 'components/star/star'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        apiUrl: MOVIE.SEARCH,
        searchData: {},
        searchMovie: [],
        fflag: false,
        msg: ''
      }
    },
    methods: {
      initScroll() {
        if (!this.searchScroll) {
          this.searchScroll = new BScroll(this.$refs.content, {
            click: true
          })
        } else {
          this.searchScroll.refresh()
        }
      },
      goBack() {
        this.fflag = false
        this.$router.push('/movie')
      },
      getData(url) {
        let _this = this
        this.$http.get(url).then((res) => {
          _this.searchData = res.data
          _this.searchMovie = res.data.subjects
          _this.fflag = true
          console.log(_this.searchData)
        }).catch((error) => {
          console.log(error)
        })
      },
      doSearch() {
        this.getData(this.seaUrl)
      },
      onload() {
        this.searchScroll.refresh()
      }
    },
    watch: {
      'searchMovie'() {
        this.initScroll()
      }
    },
    computed: {
      seaUrl() {
        return this.apiUrl + this.msg
      }
    },
    components: {
      star
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .search-wrapper
    position: absolute
    top: 0
    left: 0
    bottom: 0
    width: 100%
    background: #fff
    .search
      position :relative
      height:100%
      .top
        height: 40px
        padding: 10px
        color: #888
        border-bottom: 1px solid #ccc
        .icon
          display: inline-block
          vertical-align: middle
          font-size: 18px
        .searchmov
          vertical-align: middle
          margin: 0 10px
          border-bottom: 1px solid #c8cccf
          width: 220px
          height: 25px
        .done
          display: inline-block
          position: absolute
          right: 50px
          top: 10px
          padding: 5px
        .cancel
          display: inline-block
          position: absolute
          right: 10px
          top: 10px
          padding: 5px
      .content
        position: absolute
        top:60px
        bottom: 0
        left:0
        width: 100%
        overflow: hidden
        .list-wrapper
          .count
            padding-left: 15px
            height: 30px
            line-height: 30px
            color: #cccccc
            font-size: 14px
            border-bottom: 1px solid rgba(222, 222, 222, .7)
          .search-list
            height: 100%
            .item
              display: flex
              margin-bottom: 10px
              padding: 15px
              width: 100%
              box-sizing: border-box
              border-bottom: 1px solid rgba(222, 222, 222, .7)
              .ii
                flex: 0 0 80px
                img
                  width: 60px
              .des
                flex: 1
                font-size: 14px
                color: #888
                .title
                  margin-bottom: 10px
                  font-size: 16px
                  color: #000
                  font-weight: 700
                .rating
                  font-size: 12px
                .director
                  margin: 10px 0 5px 0
                .casts
                  height: 14px
                  width: 100%
                  text-overflow: ellipsis

              &:last
                margin-bottom: 40px
</style>
