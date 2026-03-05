<template>
  <div class="flex h-screen bg-base-eggshell font-sans overflow-hidden">
    <div
      class="w-20 lg:w-64 xl:w-72 flex-shrink-0 hidden md:block transition-all duration-300 border-r border-border-light z-10"
    >
      <Sidebar />
    </div>

    <main
      class="flex-1 flex flex-col h-screen overflow-hidden bg-base-eggshell"
    >
      <div class="flex-1 overflow-y-auto p-6 md:p-8">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from "./Sidebar/Sidebar.vue";
</script>
