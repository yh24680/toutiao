<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="from">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '不符合手机号的格式',
          },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
        <!-- <MyIcon name="shouji" slot="left-icon"></MyIcon> -->
      </van-field>
      <van-field
        v-model.trim="code"
        name="code"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须为六位' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            v-if="iscCountDone"
            :time="time"
            format="ss s"
            @finish="iscCountDone = false"
          />
          <van-button
            v-else
            class="yzm"
            size="small"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '18266666666',
      code: '246810',
      time: 5 * 1000,
      iscCountDone: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.from.validate('mobile')
        console.log('校验通过')
        this.iscCountDone = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败，请重试')
        }
      } catch (err) {
        console.log(err)
        console.log('校验失败')
        this.$toast.fail('手机格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 160px;
  height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  color: #666;
  position: fixed;
  right: 10px;
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
</style>
