import { createRouter, createWebHistory} from 'vue-router';
import BaseAuthView from './components/views/auth/BaseAuthView.vue';
import AppLayout from './components/ui/layout/AppLayout.vue';
import Dashboard from './components/views/DashBoard/Dashboard.vue';
import Household from './components/views/Household/Household.vue';
const routes = [
  {
    path :'/',
    component:BaseAuthView
  },{
    path:'/home',
    component: AppLayout,
    children:[
      {
        path:'dashboard',
        component:Dashboard
      },
      {
        path:'chores',
        component:'chores'
      },
      {
        path:'expenses',
        component:'Expenses'
      },
      {
        path:'bills',
        component:'Bills'
      },
      {
        path:'household',
        component:Household
      },
    ]
  }
];

export const router = createRouter({
  history:createWebHistory(),
  routes
})