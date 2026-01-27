<template>
  <Header>
    <template #header>
      <ExpenseHeader @buttonClick="changeModalComponent('ExpenseForm')" />
    </template>
  </Header>
  <div class="expense-cards">
    <Card
      title="Total I Owe"
      :value="myExpenseShare"
      variant="primary"
      :icon="CheckCheckIcon"
    />
    <Card
      title="Total owed to me"
      :value="totalOwedToMe"
      variant="warning"
      :icon="CheckCheckIcon"
    />
    <Card
      title="Your Net Balance"
      :value="yourNetBalance"
      variant="warning"
      :icon="CheckCheckIcon"
    />
    <Card
      title="Total Household Spending"
      :value="totalHouseholdSpending.toFixed(2)"
      variant="warning"
      :icon="CheckCheckIcon"
    />
  </div>
  <div class="mt-5">
    <ExpenseTable :expenses="expenses ?? []" :isLoading="isLoading" />
  </div>
  <Modal
    :currentComponent="modalComponent"
    :component-properties="componentPropertiesRef"
    @updateEvent="refreshExpenseTable"
  />
</template>
<script setup>
import ExpenseHeader from "../../expenses/Header.vue";
import Header from "../../ui/Header.vue";
import Card from "../../ui/Card.vue";
import ExpenseTable from "../../expenses/ExpenseTable.vue";
import ExpenseForm from "../../expenses/ExpenseForm.vue";
import Modal from "../../ui/Modal.vue";

import { useApi } from "../../../composables/useApi";
import useNotifications from "../../../composables/useNotifications";
import { useAuth } from "../../../composables/useAuth";
import api from "../../../utils/axios";

import { shallowRef, ref, onMounted, computed } from "vue";
import { CheckCheckIcon } from "lucide-vue-next";

const { apiCall } = useApi();
const { showSuccessToast, showErrorToast } = useNotifications();
const { authUser } = useAuth();
const modalComponent = shallowRef(null);
const componentPropertiesRef = ref({});
const expenses = ref([]);
const isLoading = ref(false);

const totalHouseholdSpending = computed(() => {
  return expenses.value.reduce((total, expense) => total + expense.amount, 0);
});

const myExpenseShare = computed(() => {
  return expenses.value.reduce((total, expense) => {
    const userShare = expense.splitDetails.amounts.find(
      (detail) => detail.user === authUser.value._id
    );
    return total + (userShare ? userShare.amount : 0);
  }, 0);
});

const totalOwedToMe = computed(() => {
  // Placeholder logic; replace with actual calculation
  const expensesPaidByUser = expenses.value.filter(
    (expense) => expense.paidBy._id === authUser.value._id
  );
  const totalExpense = expensesPaidByUser.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return totalExpense - myExpenseShare.value;
});

const yourNetBalance = computed(() => {
  return totalOwedToMe.value - myExpenseShare.value;
});

const fetchData = async () => {
  try {
    const response = await apiCall(() => api.get(`/expense`), {
      successMessage: "Expenses fetched successfully",
      loadingRef: isLoading,
    });

    showSuccessToast("Expenses loaded");
    expenses.value = response?.data.data.expenses;
  } catch (error) {
    showErrorToast(error.messsage ?? "Failed to load expenses");
    console.error("Error fetching expenses:", error);
  }
};

function changeModalComponent(name) {
  let componentProperties = {};
  switch (name) {
    case "ExpenseForm":
      componentProperties.title = "Add Expense";
      componentProperties.endpoint = "/expense";
      componentProperties.method = "post";
      modalComponent.value = ExpenseForm;
      break;
    default:
      break;
  }
  componentPropertiesRef.value = componentProperties;
  openModal();
}

function openModal() {
  document.getElementById("my_modal_1").showModal();
}

function refreshExpenseTable() {
  console.log("Refreshing Expense Table");
  fetchData();
}

onMounted(() => {
  fetchData();
});
</script>
<style>
.expense-cards {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
