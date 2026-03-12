<template>
  <div class="flex flex-col gap-6 w-full pb-10">
    <Header
      @changeModal="changeModalComponent"
      @search="handleSearch"
      @toggleView="viewType = $event"
      :currentView="viewType"
      v-model:search="filters.search"
    />
    <Filters
      :categories="CATEGORIES"
      :options="OPTIONS"
      v-model:category="filters.category"
      v-model:statuses="filters.status"
    />

    <transition name="fade" mode="out-in">
      <div>
        <div
          v-if="viewType === 'list'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <BillCard
            v-for="bill in filteredBills"
            :key="bill._id"
            :bill="bill"
            @edit="handleEditBill"
            @delete="handleDeleteBill"
            @togglePaid="handleTogglePaid"
          />
        </div>

        <div
          v-else
          class="bg-primary-light p-6 rounded-2xl shadow-sm min-h-[500px]"
        >
          <BillCalendar :events="filteredBills" @select="handleEditBill" />
        </div>
        <section
          v-if="!filteredBills.length || !bills.length"
          class="bg-primary-light/50 rounded-xl p-12 text-center border-2 border-dashed border-primary/20"
        >
          <div
            class="bg-base-main w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"
          >
            <ReceiptText class="text-primary" size="32" />
          </div>
          <p class="text-text-main font-semibold">No Bills found</p>
          <p class="text-text-secondary text-sm mt-1">
            Start by adding a new bill for your household.
          </p>
        </section>
      </div>
    </transition>

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
  Filter,
  CircleX,
  ReceiptText,
} from "lucide-vue-next";
import Button from "../ui/Button.vue";
import api from "../../utils/axios";
import Header from "../bills/Header.vue";
import BillCard from "../bills/BillCard.vue";
import BillsForm from "../bills/BillsForm.vue";
import useNotifications from "../../composables/useNotifications";
import BillCalendar from "../ui/Calendar.vue";
import Filters from "../ui/Filters.vue";
import { useApi } from "../../composables/useApi";
import { CATEGORIES, OPTIONS } from "../bills/constants";

const { showErrorToast, showSuccessToast } = useNotifications();
const modalComponent = ref(null);
const componentPropertiesRef = ref({});
const { apiCall } = useApi();
const bills = ref([]);
const expandedBillId = ref(null);
const isLoading = ref(false);

const filters = ref({ search: "", category: "all", status: "all" });

const fetchData = async () => {
  const res = await api.get("/bills");
  bills.value = res.data.data;
};

const viewType = ref("list"); // 'list' or 'calendar'

const filteredBills = computed(() => {
  return bills.value.filter((bill) => {
    const matchSearch = bill.title
      .toLowerCase()
      .includes(filters.value.search.toLowerCase());
    const matchCat =
      filters.value.category === "all" ||
      bill.category === filters.value.category;
    const matchStatus =
      filters.value.status === "all" || bill.status === filters.value.status;
    return matchSearch && matchCat && matchStatus;
  });
});

async function handleTogglePaid(billId) {
  // Logic to toggle current user's split status
  await apiCall(() => api.patch(`/bills/${billId}/toggle-paid`), {
    successMessage: "Payment status updated!",
  });
  fetchData();
}

const handleSearch = (val) => (filters.value.search = val);

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
