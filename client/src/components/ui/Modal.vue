<template>
  <Transition>
    <dialog id="my_modal_1" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <div class="flex justify-center">
          <!--    <h3 class="text-lg font-bold mb-4">
            {{ componentProperties.title }}
          </h3> -->
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
        <div class="modal-component">
          <slot name="modal-component">
            <component
              :is="currentComponent"
              v-bind:componentProperties="componentProperties"
              @updateHoushold="emit('updateHoushold', $event)"
              @updateEvent="emit('updateEvent', $event)"
            ></component>
          </slot>
        </div>
      </div>
    </dialog>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits(["updateHoushold", "updateEvent"]);
const props = defineProps({
  title: {
    type: String,
  },
  currentComponent: {
    type: Object,
  },
  componentProperties: {
    type: Object,
    required: true,
  },
});

console.log(props.componentProperties);
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
