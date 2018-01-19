<template>
  <div class="movielist-wrapper" ref="movielistWrapper">
    <ul class="movie-list" ref="movieList" v-show="casts.length>0">
      <li v-for="item in casts" class="item" ref="item">
        <img src="../../../static/cat.png" ref="img">
        <!--<img :src="item.avatars.small">-->
        <div class="name">{{item.split(' ')[0]}}</div>
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
      picWidth: {
        type: Number
      },
      picHeight: {
        type: Number
      },
      mRight: {
        type: Number
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
          let picWidth = this.picWidth
          let margin = this.mRight
          let width = (picWidth + margin) * this.casts.length - margin
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
      },
      setAdd() {
        this.$refs.item.style.width = this.picWidth + 'px'
        this.$refs.img.style.width = this.picWidth + 'px'
        this.$refs.img.style.height = this.picHeight + 'px'
        this.$refs.img.style['margin-right'] = this.picHeight + 'px'
        alert(this.$refs.item.style.width)
      },
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
        this.setAdd()
        this.initCart()
      }
    },
    mounted() {
      this.setAdd()
      this.initCart()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .movielist-wrapper
    width: 100%
    height: 200px
    overflow: hidden
    .movie-list
      .item
        display: inline-block
        width:100px
        margin-right:10px
        text-align: center
        &:last-child
          margin-right: 0
        img
          width:100px
          height:150px
        .name
          font-size: 12px
          color: black

</style>
