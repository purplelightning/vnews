<template>
  <div class="movie-wrapper">
    <div class="movie" v-show="fflag">
      <div class="top" :style="{background:themeColor}">
        <div class="icon icon-arrow_lift" @click="getBack"></div>
        <span class="title">电影</span>
      </div>
      <!--<button @click="showContent">显示内容</button>-->
      <div class="content" ref="content">
        <!--正在热映-->
        <div class="theatre">
          <div class="title-content">
            <span class="title">影院热映</span>
            <span class="more">全部{{allData.total}}
            <span class=" icon icon-circle-right"></span> </span>
          </div>

          <!--横向滚动-->
          <div class="mo-wrapper" ref="moWrapper">
            <ul v-show="fflag" class="mo-list" ref="moList">
              <li v-for="(item,index) in movieData" class="item">
                <img :src="item.images.small" @click="goDetail(index)">
                <!--<img src="../../../static/cat.png">-->
                <div class="des">
                  <span class="name">{{item.title}}</span>
                  <star :size="24" :score="item.rating.average"></star>
                  <span class="ratings">{{item.rating.average}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <loading2 :bshow="!fflag"></loading2>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState, mapActions} from 'vuex'
  import {MOVIE} from 'common/js/url'
  import star from 'components/star/star'
  import loading2 from 'components/loading/loading2'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        apiUrl: MOVIE.INTHEATRE,
        movieData: [],//用数组存储
        allData: {},
        fflag: false
      }
    },
    created() {
      if (this.fflag == true) {
        return
      }
      this.getAsyncData(this.apiUrl)
    },
    mounted() {
      //执行时机优先于watch的执行时机
      this._initMovies();
    },
    computed: {
      ...mapState([
        'themeColor'
      ]),
    },
    //观测更新
    watch: {
      'movieData'() {
        this._initMovies();
      }
    },
    methods: {
      _initMovies() {//横向滚动函数 正在上映的电影
        if (this.allData.total) {
          let picWidth = 100
          let margin = 6
          let width = (picWidth + margin) * this.allData.count - margin;//ul宽度
          this.$refs.moList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.moScroll) {
              this.moScroll = new BScroll(this.$refs.moWrapper, {
                scrollX: true,
                eventPassThrough: 'vertical',
                click: true
              });
            } else {
              this.moScroll.refresh();
            }
          })
        }
      },
      //异步获取数据
      getAsyncData(url) {
        let _this = this
        this.$http.get(url).then((res) => {
          _this.allData = res.data
          _this.movieData = res.data.subjects
          _this.fflag = true
//          console.log(_this.movieData)
        }).catch((err) => {
          console.log(err)
        })
      },
      goDetail(index) {
//        console.log(this.movieData[index])
        this.setMovieId(this.movieData[index].id)
        this.$router.push('/movieDetail')
      },
      getBack() {
        this.openDrawer()
      },
      ...mapActions([
        'openDrawer', 'setMovieId'
      ])
    },
    components: {
      star, loading2
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .movie-wrapper
    position: absolute
    top: 0
    left: 0
    width: 100%
    bottom:0
    background: #fff
    .movie
      text-align: center
      .top
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

      .content
        .theatre
          .title-content
            position: relative
            height: 40px
            line-height: 40px
            text-align: left
            .title
              margin-left: 10px
              font-size: 16px
            .more
              position: absolute
              right: 5px
              vertical-align: top
              font-size: 12px
              color: #ccc

          .mo-wrapper
            width: 100%
            overflow: hidden

            .mo-list
              font-size: 0
              .item
                display: inline-block
                width: 100px
                margin-right: 6px
                font-size: 12px
                text-align: left
                &:last-child
                  margin-right: 0
                img
                  width: 100px
                  height: 144px
                .name
                  display: block
                  font-size: 12px
                  font-weight: 600

                  overflow: hidden
                  white-space: nowrap /*不会折行*/
                  text-overflow: ellipsis
                star
                  display: inline-block
                  font-size: 12px
                .ratings
                  display: inline-block
                  font-size: 12px


</style>
