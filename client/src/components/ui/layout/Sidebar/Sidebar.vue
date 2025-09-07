<template>
  <aside class="border-r-1  border-r-light-border flex flex-col h-full">
    <header
      class="flex p-4 justify-center items-center border-b-light-border border-b-1"
    >
      <div class="bg-blue-bg rounded-lg p-2 mr-3">
        <School :size="iconSize" color="#fefeff" />
      </div>
      <div class=" hidden lg:flex flex-col items-start">
        <h1 class="font-bold text-2xl text-primary-text">RoomSync</h1>
        <p class="overflow-auto hidden xl:block">HouseHold Manager</p>
      </div>
    </header>
    <section class="flex-1 border-b-1 border-b-light-border pt-5">
      <h1 class="text-tertiary-text text-left ml-3 hidden lg:block mb-4">NAVIGATION</h1>
      <ul class="flex sm:items-center md:items-start px-4 flex-col">
        <SidebarLink title="DashBoard" sub-heading="Overview & Activity">
          <template #icon>
            <House :size="iconSize" :color="iconColor" />
          </template>
        </SidebarLink>
        <SidebarLink title="Chores" sub-heading="Tasks & Assignments">
          <template #icon>
            <BrushCleaning :size="iconSize" :color="iconColor" />
          </template>
        </SidebarLink>
        <SidebarLink title="Expenses" sub-heading="Purchases">
          <template #icon>
            <DollarSign :size="iconSize" :color="iconColor" />
          </template>
        </SidebarLink>
        <SidebarLink title="Bills" sub-heading="Recurring Payments">
          <template #icon>
            <NotepadText :size="iconSize" :color="iconColor" />
          </template>
        </SidebarLink>
        <SidebarLink title="Household" sub-heading="Members & Settings">
          <template #icon>
            <Users :size="iconSize" :color="iconColor" />
          </template>
        </SidebarLink>
      </ul>
    </section>
    <footer>
      <p>Kevin Rodrigues</p>
      <p>edlwe2vfdn.com</p>
    </footer>
  </aside>
</template>
<script setup lang="ts">
import {
  School,
  House,
  BrushCleaning,
  Users,
  NotepadText,
  DollarSign,
} from "lucide-vue-next";
import SidebarLink from "./SidebarLink.vue";
import { ref } from "vue";

const iconSize = ref<number>(26);
const iconColor = ref<string>("#7b889c");
</script>


<style>

</style>