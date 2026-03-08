<template>
  <Header @showBillModal="changeModalComponent" />
  <div class="flex flex-col gap-8 w-full max-w-5xl pb-10 mt-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BillCard
        v-for="bill in bills"
        :bill="bill"
        @edit="handleEditBill(bill)"
        @delete="handleDeleteBill(id)"
      />
    </div>
    <Modal
      :currentComponent="modalComponent"
      :component-properties="componentPropertiesRef"
      @updateEvent="fetchData"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  Plus,
  Calendar,
  CheckCircle,
  Clock,
  Edit2,
  Trash,
  Repeat,
} from "lucide-vue-next";
import Button from "../ui/Button.vue";
import api from "../../utils/axios";
import Header from "../bills/Header.vue";
import BillCard from "../bills/BillCard.vue";
import BillsForm from "../bills/BillsForm.vue";
import useNotifications from "../../composables/useNotifications";
import { useApi } from "../../composables/useApi";
const { showErrorToast, showSuccessToast } = useNotifications();
const modalComponent = ref(null);
const componentPropertiesRef = ref({});
const { apiCall } = useApi();
const bills = ref([]);
const expandedBillId = ref(null);
const isLoading = ref(false);

const fetchData = async () => {
  const res = await api.get("/bills");
  bills.value = res.data.data;
};

async function handleDeleteBill(id) {
  if (!confirm("Are you sure you want to delete this expense?")) return;

  try {
    await apiCall(() => api.delete(`/bills/${id}`), {
      successMessage: "Expense deleted successfully",
      loadingRef: isLoading,
    });
    fetchData(); // Refresh table
  } catch (error) {
    console.log(error);
    showErrorToast("Failed to delete expense");
  }
}

// EDIT LOGIC
function handleEditBill(bill) {
  modalComponent.value = BillsForm;
  componentPropertiesRef.value = {
    title: "Edit Bill",
    billData: bill, // Pass existing data to form
    isEdit: true,
  };
  document.getElementById("my_modal_1").showModal();
}

function changeModalComponent(name) {
  modalComponent.value = BillsForm;
  componentPropertiesRef.value = { title: "Add Bill" };
  document.getElementById("my_modal_1").showModal();
}
onMounted(fetchData);
</script>
