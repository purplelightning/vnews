<template>
  <div class="picture-wrapper">
    <div class="top">
      <div class="icon icon-arrow_lift" @click="getBack"></div>
      <span class="title">图片</span>
    </div>
    <div class="picture">
      <ul class="picture-list">
        <li v-for="item in pcontent" class="item">
          <img :src="item.src" class="ii">
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {PHOTO} from 'common/js/url'
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        apiUrl: PHOTO,
        pcontent: {}
      }
    },
    created() {
      this.getImg()
    },
    methods: {
      getImg() {
        var _this = this
        this.$http.get(this.apiUrl).then((res) => {
          _this.pcontent = res.data.images
//          console.log(_this.pcontent)
        }).catch((error) => {
          console.log(error)
        })
      },
      getBack() {
        this.openDrawer()
      },
      ...mapActions([
        'openDrawer'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .picture-wrapper
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
        width:40px
        height:100%
      .title
        margin:auto

    .picture
      position: absolute
      top: 60px
      left: 0
      bottom: 0
      width: 100%
      .picture-list
        .item
          .ii
            width: 140px
</style>
