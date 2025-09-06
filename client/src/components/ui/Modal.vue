<template>
  <Teleport to="body">
  <Transition>
    <dialog id="my_modal_1" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div class="modal-component">
          <p class="py-4">Press ESC key or click the button below to close</p>
          <slot name="modal-component">
            <component :is="currentComponent"></component>
          </slot>
        </div>
      </div>
    </dialog>
  </Transition>
  </Teleport>
</template>

<script setup lang="ts">

defineProps({
  title: {
    type: String,
  },
  currentComponent: {
    type: Object,
  },
  showModal:{
    type:Boolean
  }
});


</script>
<style>
  .v-enter-active, .v-leave-active{
    transition: opacity 0.5s ease;
  }
  .v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>