import request from '@/utils/request'
import store from '@/store'

export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

// 登录
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 用户信息
export const getUserInfo = () => {
  return request({
    url: '/user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
