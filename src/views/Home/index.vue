<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar @click="onSearch">
      <template #title>
        <van-button
          type="info"
          class="search-btn"
          round
          icon="search"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 导航栏 -->
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in myHomeList" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menus"></div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '98%', paddingTop: '1rem' }"
      close-icon-position="top-left"
      closeable
    >
      <ChannelPanel
        :myHomeList="myHomeList"
        :active="active"
        @change-article="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
// import ChannelPanel from '@/views/Home/Components/ChannelPanel.vue'
import ChannelPanel from '@/views/Home/Components/ChannelPanel'

import { getMyChannels } from '@/api/home'
import { getItem, setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () { this.geMyHome() },
  data () {
    return {
      active: 0,
      myHomeList: {},
      isChannelPanelShow: false
    }
  },
  methods: {
    onSearch () {
      console.log(123)
    },
    async geMyHome () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          // console.log(res)
          this.myHomeList = res.data.data.channels
          console.log(this.myHomeList)
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang= "less">
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.3);
  /* opacity: 0.2; */
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border: 1px solid #edeff3;
  &:nth-child(9) {
    border-right: 0;
  }
  &:nth-child(1) {
    border-left: 0;
  }
}
/deep/ .van-tabs__line {
  width: 40px;
  background-color: #3390ff;
}
.menu {
  min-width: 100px;
  height: 88px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 88px;
}
.menus {
  min-width: 100px;
  height: 88px;
  background: rgba(255, 255, 255, 1);
}
.toutiao {
  font-size: 33px;
}
.van-nav-bar {
  position: fixed;
  width: 750px;
}
/deep/.van-tabs__wrap {
  position: fixed;
  top: 92px;
  z-index: 1;
  width: 750px;
}
/deep/.van-pull-refresh {
  /* calc 是css计算属性中的函数 */
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
