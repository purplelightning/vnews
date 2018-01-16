<template>
  <div class="movie-wrapper">
    <div class="top" :style="{background:themeColor}">
      <div class="icon icon-arrow_lift" @click="getBack"></div>
      <span class="title">电影</span>
    </div>
    <!--<button @click="showContent">显示内容</button>-->
    <div class="movie" ref="movie">
      <div class="theatre">
        <div class="title-content">
          <span class="title">影院热映</span>
          <span class="more">全部{{allData.total}}
            <span class=" icon icon-circle-right"></span> </span>
        </div>

        <div class="mo-wrapper" ref="moWrapper">
          <ul v-show="fflag" class="mo-list" ref="moList">
            <li v-for="item in movieData" class="item">
              <img :src="item.images.small">
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
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState, mapActions} from 'vuex'
  import {MOVIE} from 'common/js/url'
  import star from 'components/star/star'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        apiUrl: MOVIE.INTHEATRE,
        movieData: [],
        allData: {},
        fflag: false
      }
    },
    mounted() {
      this.getAsyncData(this.apiUrl)
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
    ready() {//执行时机优先于watch的执行时机
      this._initMovies();
      //设置内层的宽度超过外层的宽度
      if (this.allData.total) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * 20 - margin;//ul宽度
        this.$refs.moList.style.width = width + 'px';
        this.$nextTick(() => {
          this.moScroll = new BScroll(this.$refs.moWrapper, {
            scrollX: true,
            eventPassThrough: 'vertical'
          });
        })
      }
    },
    methods: {
      _initMovies() {//横向滚动函数
        if (this.allData.total) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * 20 - margin;//ul宽度
          this.$refs.moList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.moScroll) {
              this.moScroll = new BScroll(this.$refs.moWrapper, {
                scrollX: true,
                eventPassThrough: 'vertical'
              });
            } else {
              this.moScroll.refresh();
            }
          })
        }
      },
      getAsyncData(url) {
        let _this = this
        this.$http.get(url).then((res) => {
          _this.allData = res.data
          _this.movieData = res.data.subjects
          _this.fflag = true
          console.log(_this.movieData)
        }).catch((err) => {
          console.log(err)
        })
      },
//      showContent() {
//        console.log(this.movieData[0].rating)
//      },
      getBack() {
        this.openDrawer()
      },
      ...mapActions([
        'openDrawer'
      ])
    },
    components: {
      star
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .movie-wrapper
    text-align: center
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

    .movie
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
          width:100%
          overflow: hidden
          white-space: nowrap /*不会折行*/
          .mo-list
            font-size:0
            .item
              display: inline-block
              width: 120px
              margin-right: 6px
              font-size: 12px
              &:last-child
                margin-right: 0
              img
                width: 120px
                height:174px
              .name
                display: block
                font-size: 12px
                font-weight: 600
              star
                display: inline-block
                font-size: 12px
              .ratings
                display: inline-block
                font-size: 12px

</style>
