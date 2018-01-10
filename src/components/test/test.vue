<template>
  <div class="test">
    <div>测试</div>
    <div class="and icon-android">

    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import jsonp from 'jsonp'
  import axios from 'axios'

  const url = 'http://api.laifudao.com/open/tupian.json'//jsonp不显示
  const url2 = "http://v.juhe.cn/toutiao/index?type=shehui&key=3771c3180f6dd01a974767a2ebc763f1"
  const url3 = 'http://v.juhe.cn/toutiao/index'
  const url4 = 'http://api.douban.com/v2/movie/in_theaters'
  const url5 = 'https://free-api.heweather.com/s6/weather/forecast?' +
    'key=9501a32f34e54b2d96db5fb7827e56cb&location=nanjing'

  //新闻首页
  const url6 = 'https://3g.163.com/touch/reconstruct/article/list/BBM54PGAwangning/0-10.html'
  const url66 = 'touch/reconstruct/article/list/BBM54PGAwangning/0-10.html'

  export default {
    created() {
//      这也能解决url4
      jsonp(url4, null, function (err, data) {
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
        }
      })

      //这个没有跨域，访问失败
//      this.$http.get(url66).then(function (res) {
//        console.log(res.data)
//      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .test
    position: absolute
    top: 60px
    width: 100%
    height: 100%
    background: #46e4ff
    .and
      font-size:25px
</style>
