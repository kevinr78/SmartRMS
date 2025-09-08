const basepath= 'home';
import {
  House,
  BrushCleaning,
  Users,
  NotepadText,
  DollarSign,
} from "lucide-vue-next";
import type { Component } from "vue";

interface SideBarProps {
    path:string,
    title:string,
    'sub-title':string,
    icon:Component
  }

const sidebarLinks:SideBarProps[] =  [
  {
    path:`${basepath}/dashboard`,
    title:'Dashboard',
    'sub-title':'Overview & Activity',
    icon:House
  },
  {
    path:`${basepath}/chores`,
    title:'Chores',
    'sub-title':'Tasks & Assignments',
    icon:BrushCleaning
  },
  {
    path:`${basepath}/expenses`,
    title:'Expenses',
    'sub-title':'Purchases',
    icon:DollarSign
  },
  {
    path:`${basepath}/bills`,
    title:'Bills',
    'sub-title':'Recurring Payments',
    icon:NotepadText
  },
  {
    path:`${basepath}/household`,
    title:'Household',
    'sub-title':'Members & Settings',
    icon:Users
  }
]

export default sidebarLinks