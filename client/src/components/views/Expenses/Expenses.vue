<template>
  <div class="flex flex-col gap-6">
    <ExpenseHeader @button-click="changeModalComponent('ExpenseForm')" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        title="Total I Owe"
        :value="`$${myExpenseShare.toFixed(2)}`"
        variant="primary"
        class="bg-primary-light border-none shadow-sm"
      />
      <Card
        title="Total Owed to Me"
        :value="`$${totalOwedToMe.toFixed(2)}`"
        variant="warning"
        class="bg-primary-light border-none shadow-sm"
      />
      <Card
        title="Net Balance"
        :value="`$${yourNetBalance.toFixed(2)}`"
        :class="yourNetBalance >= 0 ? 'text-success' : 'text-error'"
        class="bg-primary-light border-none shadow-sm"
      />
      <Card
        title="Household Spending"
        :value="`$${totalHouseholdSpending.toFixed(2)}`"
        variant="warning"
        class="bg-primary-light border-none shadow-sm"
      />
    </div>

    <section class="bg-primary-light rounded-xl p-4 shadow-sm">
      <ExpenseTable
        :expenses="expenses"
        :isLoading="isLoading"
        @refresh="fetchData"
        @edit="handleEditExpense"
        @delete="handleDeleteExpense"
      />
    </section>

    <Modal
      :currentComponent="modalComponent"
      :component-properties="componentPropertiesRef"
      @updateEvent="fetchData"
    />
  </div>
</template>

<script setup>
import ExpenseHeader from "../../expenses/Header.vue";
import Card from "../../ui/Card.vue";
import ExpenseTable from "../../expenses/ExpenseTable.vue";
import ExpenseForm from "../../expenses/ExpenseForm.vue";
import Modal from "../../ui/Modal.vue";
import { useApi } from "../../../composables/useApi";
import { useAuth } from "../../../composables/useAuth";
import api from "../../../utils/axios";
import useNotifications from "../../../composables/useNotifications";
import { shallowRef, ref, onMounted, computed } from "vue";

const { apiCall } = useApi();
const { authUser } = useAuth();
const expenses = ref([]);
const isLoading = ref(false);
const modalComponent = shallowRef(null);
const componentPropertiesRef = ref({});

const totalHouseholdSpending = computed(() =>
  expenses.value.reduce((total, exp) => total + exp.amount, 0)
);

const myExpenseShare = computed(() => {
  return expenses.value.reduce((total, expense) => {
    const share = expense.splitDetails?.amounts?.find(
      (a) => a.user === authUser.value._id
    );
    return total + (share ? share.amount : 0);
  }, 0);
});

const totalOwedToMe = computed(() => {
  return expenses.value.reduce((total, expense) => {
    if (expense.paidBy._id !== authUser.value._id) return total;
    const myShare =
      expense.splitDetails?.amounts?.find((a) => a.user === authUser.value._id)
        ?.amount || 0;
    return total + (expense.amount - myShare);
  }, 0);
});

const yourNetBalance = computed(
  () => totalOwedToMe.value - myExpenseShare.value
);

const fetchData = async () => {
  const response = await apiCall(() => api.get(`/expense`), {
    loadingRef: isLoading,
  });
  expenses.value = response?.data.data.expenses || [];
};

function changeModalComponent(name) {
  if (name === "ExpenseForm") {
    modalComponent.value = ExpenseForm;
    componentPropertiesRef.value = { title: "Add Expense" };
    document.getElementById("my_modal_1").showModal();
  }
}
const { showSuccessToast, showErrorToast } = useNotifications();

// DELETE LOGIC
async function handleDeleteExpense(id) {
  if (!confirm("Are you sure you want to delete this expense?")) return;

  try {
    await apiCall(() => api.delete(`/expense/${id}`), {
      successMessage: "Expense deleted successfully",
      loadingRef: isLoading,
    });
    fetchData(); // Refresh table
  } catch (error) {
    showErrorToast("Failed to delete expense");
  }
}

// EDIT LOGIC
function handleEditExpense(expense) {
  modalComponent.value = ExpenseForm;
  componentPropertiesRef.value = {
    title: "Edit Expense",
    expenseData: expense, // Pass existing data to form
    isEdit: true,
  };
  document.getElementById("my_modal_1").showModal();
}

onMounted(fetchData);
</script>
