<template>
  <div class="movie-wrapper" ref="movieWrapper">
    <div class="movie" v-show="fflag">
      <div class="top-header" :style="{background:themeColor}">
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
          <!--横向滚动列表-->
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
        <!--即将上映-->
        <div class="coming">
          <div class="coming-content">
            <span class="title">院线即将上映</span>
            <span class="more">全部{{comingData.total}}
            <span class=" icon icon-circle-right"></span></span>
          </div>
          <!--即将上映横向滚动-->
          <div class="coming-wrapper" ref="comingWrapper">
            <ul v-show="fflag2" class="coming-list" ref="comingList">
              <li v-for="(item,index) in comingMovie" class="item">
                <img :src="item.images.small">
                <div class="des">
                  <span class="name">{{item.title}}</span>
                  <span class="want">{{item.collect_count}}人想看</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
        <!--top250-->
        <div class="top" v-show="fflag3">
          <div class="title">豆瓣Top250</div>
          <ul class="top-list">
            <li v-for="(item,index) in topMovie.slice(0,4)" class="item">
              <span class="index">{{index + 1}}</span>
              <div class="ii">
                <img :src="item.images.small">
              </div>
              <div class="des">
                <div class="name">{{item.title}}</div>
                <star :size="24" :score="item.rating.average"></star>
                <span class="rating">{{item.rating.average}}</span>
                <span class="ratingnumber">{{item.collect_count}}人评价</span>
              </div>
            </li>
          </ul>
          <div class="bott">全部250部</div>
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

  const THEATRE = 'THEATRE'
  const COMING = 'COMING'

  export default {
    data() {
      return {
        apiUrl: MOVIE.INTHEATRE,
        comingUrl: MOVIE.INCOMING,
        topUrl: MOVIE.TOP,

        movieData: [],//用数组存储  正在上映电影
        allData: {},

        comingMovie: [],//即将上映的电影
        comingData: {},

        topMovie: [],
        topData: {},

        fflag: false,
        fflag2: false,
        fflag3: false
      }
    },
    created() {
      if (this.fflag == true) {
        return
      }
      this.getAsyncData(this.apiUrl)
      this.getComingData(this.comingUrl)
      this.getTopData(this.topUrl)
    },
    mounted() {
      //执行时机优先于watch的执行时机
      this._initMovies()
      this._initComing()
      this._initAllMovie()
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
      },
      'comingMovie'() {
        this._initComing()
      }
    },
    methods: {
      _initAllMovie() {
        if (!this.allScroll) {
          this.allScroll = new BScroll(this.$refs.movieWrapper, {
            click: true
          })
        } else {
          this.allScroll.refresh()
        }
      },
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
      _initComing() {//即将上映scroll
        if (this.comingData.total) {
          let picWidth = 100
          let margin = 6
          let width = (picWidth + margin) * this.comingData.count - margin;//ul宽度
          this.$refs.comingList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.coScroll) {
              this.coScroll = new BScroll(this.$refs.comingWrapper, {
                scrollX: true,
                eventPassThrough: 'vertical',
                click: true
              });
            } else {
              this.coScroll.refresh();
            }
          })
        }
      },
      //异步获取数据  好像不能只用异步函数，会报错
      //因为电影数据的格式相同，所以这里对电影进行分类，传递不同的参数，给data赋值
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
      //好像不能用同名的异步函数，所以这里又定义了一个
      getComingData(url) {
        let _this = this
        this.$http.get(url).then((res) => {
          _this.comingData = res.data
          _this.comingMovie = res.data.subjects
          _this.fflag2 = true
          console.log(_this.comingData)
        }).catch((err) => {
          console.log(err)
        })
      },
      getTopData(url) {
        let _this = this
        this.$http.get(url).then((res) => {
          _this.topData = res.data
          _this.topMovie = res.data.subjects
          _this.fflag3 = true
          console.log(_this.topData)
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
    bottom: 0
    background: #fff
    overflow: hidden
    .movie
      text-align: center
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
        .title
          margin: auto

      .content
        .theatre
          padding: 10px 10px 20px 10px
          border-bottom: 1px solid #ddd
          .title-content
            position: relative
            height: 40px
            line-height: 40px
            text-align: left
            .title
              font-size: 16px
            .more
              position: absolute
              right: 0px
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

        .coming
          padding: 10px
          .coming-content
            position: relative
            height: 40px
            line-height: 40px
            text-align: left
            .title
              font-size: 16px
            .more
              position: absolute
              right: 0px
              vertical-align: top
              font-size: 12px
              color: #ccc
          .coming-wrapper
            width: 100%
            overflow: hidden
            .coming-list
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
                .want
                  font-size: 10px
                  color: #888

        .top
          text-align: left
          padding: 20px
          .title
            font-weight: 700
            margin-bottom: 20px
          .top-list
            margin-bottom: 10px
            .item
              display: flex
              width: 100%
              height: 66px
              .index
                flex: 0 0 20px
                line-height: 66px
              .ii
                flex: 0 0 40px
                height: 66px
                margin-right: 10px
                img
                  margin-top: 5px
                  width: 40px
                  height: 55px
              .des
                display: inline-block
                flex: 1
                height: 66px
                color: #888
                font-size: 12px
                border-bottom: 1px solid #ccc
                .name
                  margin-top: 10px
                  margin-bottom:5px
                  height: 25px
                  color: #444
                star
                  display: inline-block
                  height: 30px
                .rating
                  margin-right: 10px
          .bott
            color: #888
            font-size: 15px
            text-align: center
</style>
