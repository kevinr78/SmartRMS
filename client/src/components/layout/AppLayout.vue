<template>
    <main class="grid grid-cols-5 grid-rows-5 gap-4 h-full">
      <div class="col-span-1 row-span-5">
        <Sidebar />
      </div>
      <div class="col-span-4 row-span-5 col-start-2">
        <section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim molestiae delectus saepe aliquam assumenda et qui a libero aut, deleniti hic illum nostrum reprehenderit praesentium quia itaque tempore placeat tempora.
        </section>
      </div>
    </main>
</template>

<script setup>
import Sidebar from '../ui/layout/Sidebar/Sidebar.vue';
</script>