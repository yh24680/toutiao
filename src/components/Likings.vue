<template>
  <van-icon name="good-job-o" color @click="onClick" />
</template>

<script>
export default {
  name: 'Likings',
  created () { },
  data () {
    return {}
  },
  methods: {
    onClick () {
      console.log('点赞')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
