import { createRouter, createWebHistory } from "vue-router";
import BaseAuthView from "./components/views/auth/BaseAuthView.vue";
import AppLayout from "./components/ui/layout/AppLayout.vue";
import Dashboard from "./components/views/Dashboard.vue";
import Household from "./components/views/Household.vue";
import Expenses from "./components/views/Expenses.vue";
import Chores from "./components/views/Chores.vue";
import JoinHouseHold from "./components/views/JoinHouseHold.vue";
import Bills from "./components/views/Bills.vue";
const routes = [
  {
    path: "/",
    component: BaseAuthView,
  },
  {
    path: "/join-household/:token",
    component: JoinHouseHold,
  },
  {
    path: "/home",
    component: AppLayout,
    children: [
      {
        path: "dashboard",
        component: Dashboard,
      },
      {
        path: "chores",
        component: Chores,
      },
      {
        path: "expenses",
        component: Expenses,
      },
      {
        path: "bills",
        component: Bills,
      },
      {
        path: "household",
        component: Household,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
