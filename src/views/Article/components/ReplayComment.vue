<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left> <van-icon name="cross" /> </template
    ></van-nav-bar>
    <CommentItem :item="comment" class="commetn"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in commentList"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="buttom">
      <van-button
        plain
        type="primary"
        round
        block
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>
    <van-popup v-model="isAddCommentShow" position="bottom">
      <AddComment
        v-if="isAddCommentShow"
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        @add-comment="
          commentList.unshift($event);
          isAddCommentShow = false;
        comment.reply_count++
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import CommentItem from './CommentItem.vue'
import { getComment } from '@/api/comments'
export default {
  name: 'ReplayComment',
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 10,
      commentList: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getComment({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        console.log(res)
        this.commentList = res.data.data.results
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: {
    CommentItem,
    AddComment
  }
}
</script>

<style scoped lang='less'>
.commetn {
  margin-top: 92px;
  // margin-bottom: 110px;
}
.comment1 {
  margin-bottom: 110px;
}
.buttom {
  position: fixed;
  bottom: 0;
  width: 750px;
  height: 110px;
  padding: 10px 30px;
  background: #fafafa;
}
</style>
