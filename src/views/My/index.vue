<template>
  <div class="main">
    <!-- 登陆后 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            round
            fit="cover"
            width="1.72rem"
            height="1.72rem"
            :src="userInfo.photo"
          />
          <span>热心市民余先生</span>
        </div>
        <div class="right">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{userInfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userInfo.like_count}}</p>
          <p>关注</p>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <div class="header header-nologin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <div>
      <van-grid :column-num="2">
        <van-grid-item icon="photo-o" text="收藏">
          <template #icon>
            <i class="toutiao toutiao-shoucang"></i>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="历史记录">
          <template #icon>
            <i class="toutiao toutiao-lishi"></i>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <div>
      <van-cell title="消息通知" is-link /><van-cell title="小爱同学" is-link />
    </div>
    <van-button
      type="default"
      class="logout"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      //   this.$dialog.confirm({
      //     title: '标题',
      //     message: '弹窗内容'
      //   })
      //     .then(() => {
      //       // on confirm
      //       console.log(123)
      //     })
      //     .catch(() => {
      //       // on cancel
      //       console.log(123)
      //     })
      try {
        await this.$dialog.confirm({ message: '确认退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  opacity: 0.9;
  background: rgba(56, 147, 250, 0.8) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
// 未登录
.header-nologin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-top: 15px;
  }
  p {
    font-size: 28px;
    font-weight: 400;
    color: #fff;
    padding: 0;
    margin: 0;
  }
}
// 已登录
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    padding-left: 32px;
    padding-right: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 20px;
        font-size: 30px;
        color: #fff;
      }
    }
    .right {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-family: MicrosoftYaHei;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #666666;
      line-height: 33px;
      text-align: center;
    }
  }
  .list {
    display: flex;
    // justify-content: space-around;
    li {
      flex: 1;
      text-align: center;
    }
    p {
      font-size: 25px;
      font-weight: 700;
      color: #ffffff;
    }
  }
}
.toutiao {
  font-size: 46px;
}
.van-grid {
  margin-top: 10px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/.van-grid-item__text {
  font-size: 28px;
}
.logout {
  margin-top: 10px;
  color: #eb5253;
}
.van-cell:nth-child(1) {
  margin-top: 10px;
}
// .main{
//   background-color: #F5F7F9;
// }
</style>
