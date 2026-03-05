<template>
  <aside class="flex flex-col h-full w-full bg-base-main">
    <header
      class="flex p-6 justify-center lg:justify-start items-center border-b border-border-light"
    >
      <div
        class="bg-primary rounded-xl p-2.5 lg:mr-3 shadow-sm flex items-center justify-center"
      >
        <School :size="24" class="text-white" />
      </div>
      <div class="hidden lg:flex flex-col items-start">
        <h1
          class="font-bold text-2xl text-text-main leading-tight tracking-tight"
        >
          RoomSync
        </h1>
        <p
          class="text-xs text-text-secondary font-medium tracking-wide uppercase mt-0.5"
        >
          Household Manager
        </p>
      </div>
    </header>

    <section class="flex-1 py-6 overflow-y-auto">
      <h2
        class="text-xs font-semibold text-text-tertiary uppercase tracking-wider text-left ml-6 hidden lg:block mb-4"
      >
        Navigation
      </h2>
      <ul class="flex flex-col gap-2 px-3">
        <SidebarLink
          v-for="link in sidebarLinks"
          :key="link.path"
          :title="link.title"
          :sub-title="link['sub-title']"
          :link="link.path"
        >
          <template #icon>
            <component
              :is="link.icon"
              :size="22"
              class="text-text-secondary group-hover:text-primary transition-colors duration-200"
            />
          </template>
        </SidebarLink>
      </ul>
    </section>

    <footer class="p-4 border-t border-border-light mt-auto">
      <Button
        variant="outline"
        class="w-full flex justify-center lg:justify-start gap-2 border-border-light hover:bg-error/10 hover:text-error hover:border-error/20 text-text-secondary transition-all"
        @button-click="useAuth().logout()"
      >
        Logout
      </Button>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import { School } from "lucide-vue-next";
import SidebarLink from "./SidebarLink.vue";
import sidebarLinks from "./sidebarLinks";
import { useAuth } from "../../../../composables/useAuth";
import Button from "../../Button.vue";
</script>
