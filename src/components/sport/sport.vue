<template>
  <div class="sport" ref="sport">
    <keep-alive>
      <newstemp :fatherUrl="surl"></newstemp>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import newstemp from 'components/newstemp/newstemp'
  import {SPORT} from 'common/js/url'


  export default {
    data() {
      return {
        surl: SPORT
      }
    },
    components: {
      newstemp
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .sport
    position: absolute
    top: 60px
    bottom: 0
    left: 0
    width: 100%
</style>
