import request from '@/utils/request'

export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}

/**
 * 添加用户
 * @param {用户id} target
 * @returns
 */
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消用户
 * @param {用户id} target
 * @returns
 */
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}

/**
 * 添加收藏
 * @param {文章id} target
 * @returns
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}
/**
 * 取消收藏
 * @param {文章id} target
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
/**
 * 点赞
 * @param {文章的id} target
 * @returns
 */
export const addLikings = (target) => {
  return request({
    method: 'POST',
    url: 'article/likings',
    data: {
      target
    }
  })
}

/**
 * 点赞
 * @param {文章的id} target
 * @returns
 */
export const delLiking = (target) => {
  return request({
    method: 'DELETE',
    url: `article/likings/${target}`
  })
}
