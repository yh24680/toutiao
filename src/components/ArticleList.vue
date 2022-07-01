<template>
  <div>
    <van-cell-group>
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        ref="pullrefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell
            v-for="(item, index) in articleList"
            :key="index"
            :title="item.title"
            value="内容"
            label="描述信息"
          /> -->
          <ArticleItem
            v-for="(item, index) in articleList"
            :key="index"
            :article="item"
          ></ArticleItem>
        </van-list>

        <!-- <p>刷新次数: {{ count }}</p> -->
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import { getArticleList } from '@/api/home'
import ArticleItem from './ArticleItem.vue'
let ele = null // 全局
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  mounted () {
    // $el 就是渲染好的根组件
    ele = this.$refs.pullrefresh.$el
    console.log(this.$refs.pullrefresh)
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    // 获取文章列表数据
    async getArticleList () {
      if (this.refreshing) {
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        // console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    // 底部刷新
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      console.log('下拉刷新')
      this.refreshing = false // 防止用户把加载更多搞结束了
      this.loading = true // 重新加载数据
      this.articleList = []
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {
    channels: {
      handler (newVal) {
        console.log(newVal)
      },
      deep: true
    }
  },
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 180px;
}
</style>
