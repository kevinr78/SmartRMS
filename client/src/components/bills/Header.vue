<template>
  <header
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
  >
    <div class="text-left">
      <h2 class="text-2xl font-bold text-text-main">Bills Management</h2>
      <p class="text-text-secondary text-sm">
        Maintain all your bills in one place!
      </p>
    </div>
    <Button
      variant="primary"
      @button-click="emit('showBillModal')"
      class="px-6 shadow-sm"
    >
      <template #icon><Plus size="18" /></template>
      Add Bill
    </Button>
  </header>
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

const emit = defineEmits(["showBillModal"]);
</script>
