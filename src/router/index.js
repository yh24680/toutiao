import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const My = () => import('@/views/My')
const Question = () => import('@/views/Question')
const Video = () => import('@/views/Video')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/Search')
const Article = () => import('@/views/Article')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home', component: Home
      },
      {
        path: 'my', component: My, name: 'my'
      },
      {
        path: 'video', component: Video
      },
      {
        path: 'question', component: Question
      }
    ]
  },
  {
    path: '/login', component: Login
  },
  { path: '/search', component: Search },
  { path: '/article/:article_id', component: Article, name: 'article', props: true }// 加props: true 可以让路由和组件解耦

]

const router = new VueRouter({
  routes
})

export default router
