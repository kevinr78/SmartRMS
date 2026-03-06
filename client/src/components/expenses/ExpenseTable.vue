<template>
  <div class="overflow-x-auto w-full">
    <table class="table w-full text-left">
      <thead class="text-text-secondary border-b border-border-light">
        <tr>
          <th class="font-semibold">Date</th>
          <th class="font-semibold">Description</th>
          <th class="font-semibold">Category</th>
          <th class="font-semibold">Paid By</th>
          <th class="font-semibold">Amount</th>
          <th class="font-semibold">Your Share</th>
          <th class="font-semibold text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="text-text-main">
        <tr v-if="isLoading">
          <td colspan="7" class="text-center py-8">
            <span class="loading loading-spinner"></span>
          </td>
        </tr>
        <tr v-else-if="!expenses.length">
          <td colspan="7" class="text-center py-8 text-text-tertiary">
            No expenses found.
          </td>
        </tr>
        <tr
          v-for="expense in expenses"
          :key="expense._id"
          class="hover:bg-base-main transition-colors border-b border-border-light/50"
        >
          <td class="text-sm">
            {{ new Date(expense.date).toLocaleDateString() }}
          </td>
          <td class="font-medium">{{ expense.title }}</td>
          <td>
            <span class="badge badge-ghost badge-sm capitalize">{{
              expense.category
            }}</span>
          </td>
          <td>{{ expense.paidBy?.firstName || "Unknown" }}</td>
          <td class="font-semibold">${{ expense.amount.toFixed(2) }}</td>
          <td class="text-primary font-medium">
            ${{ calculateUserShare(expense) }}
          </td>
          <td class="flex justify-end gap-2">
            <button
              class="btn btn-ghost btn-xs text-text-secondary hover:text-primary"
              @click="$emit('edit', expense)"
            >
              <Pencil size="14" />
            </button>
            <button
              class="btn btn-ghost btn-xs text-text-secondary hover:text-error"
              @click="$emit('delete', expense._id)"
            >
              <Trash size="14" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "../../composables/useAuth";
import { Trash, Pencil } from "lucide-vue-next";
const { authUser } = useAuth();
const emit = defineEmits(["edit", "delete", "refresh"]);
const props = defineProps({
  expenses: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});

function calculateUserShare(expense) {
  if (!expense.splitDetails || !Array.isArray(expense.splitDetails)) {
    return "0.00";
  }

  const userShare = expense.splitDetails.find((detail) => {
    const userId = detail.user?._id || detail.user;
    return userId === authUser.value._id;
  });

  return userShare ? userShare.amount.toFixed(2) : "0.00";
}
</script>
