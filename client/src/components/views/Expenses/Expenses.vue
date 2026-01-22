<template>
  <Header>
    <template #header>
      <ExpenseHeader @buttonClick="changeModalComponent('ExpenseForm')" />
    </template>
  </Header>
  <div class="expense-cards">
    <Card
      title="Total I Owe"
      value="1"
      variant="primary"
      :icon="CheckCheckIcon"
    />
    <Card
      title="Total owed to me"
      value="1"
      variant="warning"
      :icon="CheckCheckIcon"
    />
    <Card
      title="Net Balance"
      value="1"
      variant="warning"
      :icon="CheckCheckIcon"
    />
    <Card
      title="Total Household Spending"
      value="1"
      variant="warning"
      :icon="CheckCheckIcon"
    />
  </div>
  <div class="mt-5">
    <ExpenseTable />
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
import { CheckCheckIcon } from "lucide-vue-next";
import ExpenseTable from "../../expenses/ExpenseTable.vue";
import ExpenseForm from "../../expenses/ExpenseForm.vue";
import Modal from "../../ui/Modal.vue";
import { shallowRef, ref } from "vue";
const modalComponent = shallowRef(null);
const componentPropertiesRef = ref({});

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

function refreshExpenseTable(data) {
  console.log("Refreshing Expense Table");
  console.log("Expense Table should refresh now", data);
}
</script>
<style>
.expense-cards {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
