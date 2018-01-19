<template>
  <div class="movielist-wrapper" ref="movielistWrapper">
    <ul class="movie-list" ref="movieList" v-show="casts.length>0">
      <li v-for="item in casts.concat(casts)" class="item">
        <img :src="picUrl" width="120" height="144">
        <!--<img :src="item.avatars.small">-->
        <div class="name" v-if="showName">{{item.split(' ')[0]}}</div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'

  export default {
    props: {
      casts: {
        type: Array
      },
      showName: {
        type: Boolean
      },
      pic: {
        type: String
      }

    },
    computed: {
      picUrl() {
        return '../../../static/' + this.pic + '.jpg'
      }
    },
//    获取影人图片还要跨域，就不做了
//    data() {
//      return {
//        casts: [],
//        fflag: false
//      }
//    },
    methods: {
//      initData(url) {
//        let _this = this
//        this.$http.get(url).then((res) => {
//          _this.casts = res.data.casts
//          _this.fflag = true
//          console.log(_this.casts)
//        }).catch((error) => {
//          console.log(error)
//        })
//      },
      initCart() {
        if (this.casts.length > 0) {
          let picWidth = 100
          let margin = 6
          let width = (picWidth + margin) * 15 - margin
          this.$refs.movieList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.liScroll) {
              this.liScroll = new BScroll(this.$refs.movielistWrapper, {
                scrollX: true,
                eventPassThrough: 'vertical',
                click: true
              })
            } else {
              this.liScroll.refresh()
            }
          })
        }
      }
    },
    created() {
//      this.initData('/v2/movie/subject/' + this.movieId)
    },
//    computed: {
//      ...mapState([
//        'movieId'
//      ])
//    },
    watch: {
      'casts'() {
        this.initCart()
      }
    },
    mounted() {
      this.initCart()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .movielist-wrapper
    width: 100%
    height: 300px
    overflow: hidden
    .movie-list
      .item
        display: inline-block
        width: 130px
        margin-right: 6px
        text-align: center
        &:last-child
          margin-right: 0
        .name
          font-size: 12px
          color: black

</style>
