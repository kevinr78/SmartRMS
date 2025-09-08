<template>
    <main class="grid grid-cols-5 grid-rows-5  h-full ">
      <div class="col-span-1 row-span-5 fixed">
        <Sidebar />
      </div>
      <div class="col-span-4 row-span-5 col-start-2 overflow-auto">
        <section class="bg-eggshell min-h-full ">
          <div class="overflow-y-auto">
            <router-view></router-view>
          </div>
        </section>
      </div>
    </main>
</template>

<script setup>
import Sidebar from './Sidebar/Sidebar.vue';
</script>