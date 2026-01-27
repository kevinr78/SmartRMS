<template>
  <div
    class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
  >
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Paid By</th>
          <th>Amount</th>
          <th>Your Share</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="7" class="text-center">Loading...</td>
        </tr>
        <tr v-else-if="expenses.length === 0 || !expenses">
          <td colspan="7" class="text-center">No expenses found.</td>
        </tr>
        <tr v-else v-for="expense in expenses" :key="expense.id">
          <td>{{ new Date(expense.date).toLocaleDateString() }}</td>
          <td>{{ expense.title }}</td>
          <td>{{ expense.category }}</td>
          <td>{{ expense.paidBy.fullName }}</td>
          <td>{{ expense.amount.toFixed(2) }}</td>
          <td>{{ calculateUserShare(expense) }}</td>
          <td class="flex gap-2">
            <!-- Actions such as Edit/Delete can be added here -->
            <button class="btn btn-sm btn-outline btn-neutral">
              <Pencil size="14" />
            </button>
            <button class="btn btn-sm btn-outline btn-error">
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
  const userShare = expense.splitDetails.amounts.find(
    (detail) => detail.user === authUser.value._id
  );
  return userShare ? userShare.amount.toFixed(2) : "0.00";
}
</script>
