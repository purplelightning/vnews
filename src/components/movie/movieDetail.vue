<template>
  <div class="detail-wrapper" v-show="fflag">
    <div class="top-wrapper">
      <div class="top">
        <div class="icon icon-arrow_lift" @click="goBack"></div>
        <span class="title">电影详情</span>
      </div>
      <div class="pic">
        <img :src="movieItem.image">
      </div>
    </div>
    <div class="content">
      <!--头部文字-->
      <div class="hheader">
        <div class="des">
          <div class="des-left">
            <div class="name">{{movieItem.alt_title}}</div>
            <span class="time" v-show="movieItem.attrs.year[0]">{{movieItem.attrs.year[0]}}</span>
            <div class="type" v-for="item in movieItem.attrs.movie_type">
              <span>/{{item}}</span>
            </div>
            <div class="orginalname">原名：{{movieItem.attrs.title[0]}}</div>
            <div class="pubtime">上映时间：{{movieItem.attrs.pubdate[1]}}</div>
            <div class="movieduration">片长：{{movieItem.attrs.movie_duration[0]}}</div>
          </div>
          <div class="des-right">
            <div class="rating">
              <div class="name">豆瓣评分</div>
              <div class="score">{{movieItem.rating.average}}</div>
              <star :size="24" :score="parseInt(movieItem.rating.average)"></star>
              <span class="ratingamount">{{movieItem.rating.numRaters}}人</span>
            </div>
          </div>
        </div>
        <div class="button-wrapper">
          <button id="want" class="watch">想看</button>
          <button id="watched" class="watch">看过
            <star :size="24" :score="0"></star>
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import star from 'components/star/star'

  export default {
    data() {
      return {
        movieItem: {},
        fflag: false,
        dscore:0
      }
    },
    created() {
      if (this.movieId) {
        this.getAaData('/v2/movie/' + this.movieId)
      }
    },
    methods: {
      goBack() {
        this.$router.push('movie')
      },
      getAaData(url) {
        let _this = this
        this.$http.get(url).then((res) => {
          _this.movieItem = res.data
          _this.fflag = true
          console.log(_this.movieItem)
        }).catch((err) => {
          console.log(err)
        })
      },

    },
    computed: {
      ...mapState([
        'movieId'
      ])
    },
    watch: {
      'movieId'() {
//        console.log(this.movieId)
        this.fflag=false//这里设置false不显示，直到得到数据再渲染
        this.getAaData(`/v2/movie/${this.movieId}`)
      }
    },
    components: {
      star
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .detail-wrapper
    position: absolute
    top: 0
    left: 0
    bottom: 0
    width: 100%
    background: #fff
    .top-wrapper
      width: 100%
      height: 340px
      background: #000
      .top
        width: 100%
        height: 60px
        line-height: 60px
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
          margin-left: -30px
      .pic
        width: 100%
        height: 280px
        box-sizing: border-box
        text-align: center
        img
          margin: 20px auto
          width: 36%

    .content
      .hheader
        padding:20px
        .des
          display: flex
          margin-bottom: 10px
          box-sizing: border-box
          font-size: 12px
          color: #666
          .des-left
            flex: 1
            margin-right: 20px
            .name
              margin-bottom: 20px
              font-size: 22px
              font-weight: 700
              color: black
            .time
              display: inline-block
            .type
              display: inline-block
              margin-bottom: 5px
            .orginalname
              margin-bottom: 5px
            .pubtime
              margin-bottom: 5px
          .des-right
            flex: 0 0 90px
            .rating
              width: 100%
              border: 1px solid #ccc
              box-sizing: border-box
              text-align: center
              padding: 10px
              box-shadow: -3px -3px 5px #ddd, -3px 3px 5px #ddd, 3px -3px 5px #ddd, 3px 3px 5px #ddd
              .score
                margin: 5px auto
                font-size: 20px
                font-weight: 700
                color: #000
        .button-wrapper
          display: flex
          .watch
            display: inline-block
            margin: 10px
            padding: 5px
            text-align: center
            color: #ffa742
            background: #fff
            border: 1px solid #ffa742
            border-radius: 3px
          #want
            flex: 1
          #watched
            flex: 2
</style>
