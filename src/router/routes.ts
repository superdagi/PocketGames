import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/letter',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SmallLetter.vue') }],
  },
  //route for ath: '', component: () => import('pages/TenFriend.vue')
  {
    path: '/ten-friends',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TenFriend.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
