<template>
  <div
    :key="bill._id"
    class="bg-primary-light p-6 rounded-xl shadow-sm border-none flex flex-col gap-4 text-left transition-all duration-300 relative overflow-hidden"
  >
    <div
      v-if="bill.isRecurring"
      class="absolute -right-8 top-4 rotate-45 bg-primary/10 text-primary text-[10px] font-bold py-1 px-10"
      title="Recurring Bill"
    >
      RECURRING
    </div>
    <div class="flex justify-between items-start">
      <div class="flex flex-col gap-1">
        <span class="text-xs font-bold uppercase tracking-widest text-primary">
          {{ bill.category }}
        </span>
        <div
          v-if="bill.isRecurring"
          class="flex items-center gap-1 text-[10px] font-medium text-text-secondary"
        >
          <Repeat size="10" />
          <span class="capitalize">{{ bill.frequency }}</span>
        </div>
      </div>

      <span
        :class="getStatusBadgeClass(bill.status)"
        class="badge border-none px-3 py-2 text-[10px] font-bold"
      >
        {{ bill.status }}
      </span>
    </div>

    <div>
      <h3 class="text-lg font-bold text-text-main">{{ bill.title }}</h3>
      <p class="text-2xl font-black text-primary mt-1">
        ${{ bill.totalAmount.toFixed(2) }}
      </p>
    </div>

    <div class="flex items-center gap-2 text-text-secondary text-sm">
      <Calendar size="14" />
      <span>Due: {{ new Date(bill.dueDate).toLocaleDateString() }}</span>
    </div>

    <div class="w-full bg-base-main rounded-full h-1.5 mt-2">
      <div
        class="bg-primary h-1.5 rounded-full transition-all duration-500"
        :style="{ width: calculateProgress(bill) + '%' }"
      ></div>
    </div>

    <div class="flex justify-between items-center mt-2">
      <span class="text-xs text-text-tertiary font-medium"
        >{{ getPaidCount(bill) }} paid</span
      >

      <div class="flex gap-2">
        <button
          @click="emit('edit', bill)"
          class="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          <Edit2 size="16" />
        </button>

        <button
          @click="emit('delete', bill._id)"
          class="p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors"
        >
          <Trash size="16" />
        </button>

        <Button
          variant="primary"
          class="btn-xs text-primary font-bold"
          @button-click="toggleDetails(bill._id)"
        >
          {{ expandedBillId === bill._id ? "Close" : "Details" }}
        </Button>
      </div>
    </div>
    <div
      v-if="expandedBillId === bill._id"
      class="mt-4 pt-4 border-t border-border-light/40 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2"
    >
      <p
        class="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-1"
      >
        Roommate Status
      </p>

      <div
        v-for="split in bill.splits"
        :key="split.user._id"
        class="flex justify-between items-center bg-base-main p-3 rounded-lg shadow-sm"
      >
        <div class="flex flex-col text-left">
          <span class="text-sm font-semibold text-text-main">
            {{ split.user.fullName || "Roommate" }}
          </span>
          <span class="text-[10px] text-text-secondary">
            Share: ${{ split.amount.toFixed(2) }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <span
            v-if="split.isPaid"
            class="flex items-center gap-1 text-[10px] font-bold text-success uppercase"
          >
            <CheckCircle size="12" /> Paid
          </span>
          <span
            v-else
            class="flex items-center gap-1 text-[10px] font-bold text-text-tertiary uppercase"
          >
            <Clock size="12" /> Pending
          </span>
        </div>
      </div>
    </div>
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
const expandedBillId = ref(null);
const isLoading = ref(false);

const emit = defineEmits(["edit", "delete"]);
const props = defineProps({
  bill: {
    required: true,
  },
});

const getStatusBadgeClass = (status) => {
  if (status === "Fully Paid") return "bg-success text-white";
  if (status === "Partially Paid") return "bg-warning text-white";
  return "bg-error text-white";
};

const toggleDetails = (id) => {
  expandedBillId.value = expandedBillId.value === id ? null : id;
};

const calculateProgress = (bill) => {
  const paid = bill.splits.filter((s) => s.isPaid).length;
  return (paid / bill.splits.length) * 100;
};

const getPaidCount = (bill) => {
  const paid = bill.splits.filter((s) => s.isPaid).length;
  return `${paid}/${bill.splits.length}`;
};
</script>
