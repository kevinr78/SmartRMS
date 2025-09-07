import {createWebHashHistory , createRouter, createWebHistory} from 'vue-router';
import BaseAuthView from './components/views/auth/BaseAuthView.vue';
import AppLayout from './components/layout/AppLayout.vue';

const routes = [
  {
    path :'/',
    component:BaseAuthView
  },{
    path:'/home',
    component: AppLayout
  }
];

export const router = createRouter({
  history:createWebHistory(),
  routes
})