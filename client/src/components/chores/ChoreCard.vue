<template>
  <div
    :key="chore._id"
    class="bg-primary-light rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
  >
    <div class="flex justify-between items-start">
      <h3 class="font-bold text-text-main text-lg">{{ chore.title }}</h3>
      <div>
        <span
          :class="getPriorityClass(chore.priority)"
          class="badge border-none px-3 py-2 text-xs font-bold uppercase mr-2"
        >
          {{ chore.priority }}
        </span>
        <span
          class="badge badge-base-eggshell border-none px-3 py-2 text-xs font-bold uppercase"
        >
          <Repeat2 :size="16" />
          {{ chore.frequency }}
        </span>
      </div>
    </div>

    <p class="text-text-secondary text-sm text-left line-clamp-2">
      {{ chore.instructions }}
    </p>

    <div
      class="flex items-center justify-between mt-2 pt-3 border-t border-border-light/40"
    >
      <div class="flex items-start gap-2 flex-col">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-text-main">
            Assigned To - {{ chore.assignedTo?.fullName || "Unassigned" }}
          </span>
        </div>
      </div>
      <div class="flex gap-1">
        <button
          @click="emit('edit', chore)"
          class="btn btn-ghost btn-xs text-text-secondary hover:text-primary"
        >
          <Edit2 size="14" />
        </button>
        <button
          @click="emit('delete', chore._id)"
          class="btn btn-ghost btn-xs text-text-secondary hover:text-error"
        >
          <Trash size="14" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Plus, Edit2, Trash, ClipboardCheck, Repeat2 } from "lucide-vue-next";
const emit = defineEmits(["edit", "delete"]);
const props = defineProps({
  chore: {
    required: true,
  },
});

const getPriorityClass = (priority) => {
  if (priority === "high") return "bg-error text-white";
  if (priority === "medium") return "bg-warning text-white";
  return "bg-success text-white";
};
</script>
