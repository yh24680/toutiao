<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show',$event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getComment } from '@/api/comments'
export default {
  name: 'ArticleComment',
  props: {
    commentList: {
      type: Array,
      required: true
    },
    source: {
      type: [Number, String],
      required: true
    },
    type: {
      type: String,
      required: true,
      validator (val) {
        return ['a', 'c'].includes(val)
      }
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offset: null
      },
      // commentList: [],
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getComment(this.paramsObj)
        console.log(res)
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('setCount', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getCommentList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    CommentItem
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
