<template>
  <div>
    <!-- 我的频道 -->
    <div class="channel-contaier">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          round
          size="mini"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <div>
        <van-row>
          <van-col span="6" v-for="(item, index) in myHomeList" :key="item.id">
            <div
              class="inner"
              @click="onClick(index)"
              :style="{ color: active === index ? 'red' : '' }"
            >
              {{ item.name }}
              <van-icon
                class="close"
                name="close"
                size="17px"
                v-if="index !== 0"
                v-show="isCloseShow"
              ></van-icon>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 频道推荐 -->
    <div class="channel-contaier">
      <div class="title">
        <h3>频道推荐</h3>
      </div>
      <div>
        <van-row>
          <van-col span="6" v-for="item in tuiJianList" :key="item.id">
            <div class="inner van-ellipsis" @click="add(item.id)">
              +{{ item.name }}
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  props: {
    myHomeList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      this.tuiJianList = res.data.data.channels.filter(item => this.myHomeList.every(item1 => item1.id !== item.id))
      console.log(this.tuiJianList)
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      tuiJianList: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.tuiJianList.findIndex(item => item.id === id)
      this.myHomeList.push(this.tuiJianList[index])
      this.tuiJianList.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        if (index === 0) return
        const obj = this.myHomeList[index]
        this.myHomeList.splice(index, 1)
        this.tuiJianList.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('change-article', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-contaier {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 20px;
    h3 {
      font-size: 32px;
      font-weight: normal;
      color: #333;
    }
    .van-button {
      height: 40px;
      width: 104px;
      font-size: 20px;
      border-radius: 20px;
    }
  }
  .inner {
    position: relative;
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: 400;
    text-align: center;
    line-height: 86px;
    margin-top: 15px;
    margin-left: 16px;
  }
  .close {
    position: absolute;
    right: -10px;
    top: -10px;
  }
}
</style>
