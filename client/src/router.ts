import { createRouter, createWebHistory } from "vue-router";
import BaseAuthView from "./components/views/auth/BaseAuthView.vue";
import AppLayout from "./components/ui/layout/AppLayout.vue";
import Dashboard from "./components/views/DashBoard/Dashboard.vue";
import Household from "./components/views/Household/Household.vue";
import Expenses from "./components/views/Expenses/Expenses.vue";
import JoinHouseHold from "./components/views/Household/JoinHouseHold.vue";
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
        component: "chores",
      },
      {
        path: "expenses",
        component: Expenses,
      },
      {
        path: "bills",
        component: "Bills",
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
