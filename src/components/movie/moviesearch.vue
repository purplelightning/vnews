<template>
  <div class="search-wrapper">
    <div class="search">
      <div class="icon icon-evil"></div>
      <input type="text" class="searchmov" placeholder="电影"
             v-model="msg"
      >
      <div class="done" @click="doSearch">搜索</div>
      <div class="cancel" @click="goBack">取消</div>
    </div>
    <div class="content">
      <ul v-show="searchData">
        <li v-for="item in searchMovie">

        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {MOVIE} from 'common/js/url'

  export default {
    data() {
      return {
        apiUrl: MOVIE.SEARCH,
        searchData: {},
        searchMovie: [],
        flag: false,
        msg: ''
      }
    },
    methods: {
      goBack() {
        this.$router.push('/movie')
      },
      getData(url) {
        let _this = this
        this.$http.get(url).then((res) => {
          _this.searchData = res.data
          _this.searchMovie = res.data.subjects
          console.log(_this.searchData)
        }).catch((error) => {
          console.log(error)
        })
      },
      doSearch() {
        this.getData(this.seaUrl)
      }
    },
    watch: {
//      'msg'() {
//        console.log(this.msg)
//      }
    },
    computed: {
      seaUrl() {
        return this.apiUrl + this.msg
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .search-wrapper
    position: fixed
    top: 0
    left: 0
    bottom: 0
    width: 100%
    background: #fff
    .search
      position: relative
      height: 40px
      padding: 10px
      color: #888
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
</style>
