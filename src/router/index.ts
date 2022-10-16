import { createRouter, createWebHistory, RouteRecordRaw  } from 'vue-router';
import Layout from '@/Layout/index.vue'

const routes: Array<RouteRecordRaw>= [
  {
    path: '/',
    name:"/",
    component: Layout,
    redirect: 'home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: { title: '首页', access: 0, Auth: true }
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404/index.vue'),
},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  //使用浏览器的回退或者前进时，重新返回时保留页面滚动位置，跳转页面的话，不触发。
  // scrollBehavior(to,from,savePosition){
  //   if(savePosition){
  //     return savePosition;
  //   }else{
  //     return {top:0};
  //   }
  // }
});

export default router;
