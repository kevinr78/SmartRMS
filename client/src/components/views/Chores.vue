<template>
  <div class="flex flex-col gap-6 w-full pb-10">
    <Header
      v-model:search="filters.search"
      @toggleView="viewType = $event"
      @changeModal="changeModalComponent"
      :currentView="viewType"
    />
    <Filters
      :categories="CATEGORIES"
      :options="PRIORITIES"
      v-model:category="filters.category"
      v-model:statuses="filters.status"
    />
    <transition name="fade" mode="out-in">
      <div class="flex flex-col gap-4">
        <section v-if="filteredChores.length">
          <div
            v-if="viewType === 'list'"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <ChoreCard
              v-for="chore in filteredChores"
              :chore="chore"
              @edit="editChore(chore)"
              @delete="confirmDelete(chore._id)"
            />
          </div>
          <div
            v-else
            class="bg-primary-light p-6 rounded-2xl shadow-sm min-h-[500px]"
          >
            <Calendar @select="editChore($event)" :events="filteredChores" />
          </div>
        </section>

        <section
          v-else
          class="bg-primary-light/50 rounded-xl p-12 text-center border-2 border-dashed border-primary/20"
        >
          <div
            class="bg-base-main w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"
          >
            <ClipboardCheck class="text-primary" size="32" />
          </div>
          <p class="text-text-main font-semibold">No chores found</p>
          <p class="text-text-secondary text-sm mt-1">
            Start by adding a new chore for your household.
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
import { ClipboardCheck } from "lucide-vue-next";
import Header from "../chores/Header.vue";
import Button from "../ui/Button.vue";
import api from "../../utils/axios";
import { useApi } from "../../composables/useApi";
import Modal from "../ui/Modal.vue";
import ChoreForm from "../chores/ChoreForm.vue";
import Filters from "../ui/Filters.vue";
import ChoreCard from "../chores/ChoreCard.vue";
import Calendar from "../ui/Calendar.vue";

const modalComponent = ref(null);
const componentPropertiesRef = ref({});
const { apiCall } = useApi();
const chores = ref([]);
const isLoading = ref(false);
const filters = ref({ search: "", category: "all", status: "all" });
const viewType = ref("list");
import { PRIORITIES, FREQUENCY, CATEGORIES } from "../chores/constants";

const fetchData = async () => {
  const response = await apiCall(() => api.get("/chores"), {
    loadingRef: isLoading,
  });
  chores.value = response?.data?.data || [];
};

function changeModalComponent(name) {
  modalComponent.value = ChoreForm;
  componentPropertiesRef.value = { title: "Add Chore" };
  document.getElementById("my_modal_1").showModal();
}

async function confirmDelete(id) {
  if (!confirm("Are you sure you want to delete this chore?")) return;

  try {
    await apiCall(() => api.delete(`/chores/${id}`), {
      successMessage: "Chore deleted successfully",
      loadingRef: isLoading,
    });
    fetchData(); // Refresh table
  } catch (error) {
    showErrorToast("Failed to delete chore");
  }
}

function editChore(chore) {
  modalComponent.value = ChoreForm;
  componentPropertiesRef.value = {
    title: "Edit Chore",
    choreData: chore, // Pass existing data to form
    isEdit: true,
  };
  document.getElementById("my_modal_1").showModal();
}

const filteredChores = computed(() => {
  return chores.value.filter((chore) => {
    const matchSearch = chore.title
      .toLowerCase()
      .includes(filters.value.search.toLowerCase());
    const matchCat =
      filters.value.category === "all" ||
      chore.category === filters.value.category;
    const matchPriority =
      filters.value.priority === "all" ||
      chore.status === filters.value.priority;
    return matchSearch && matchCat && matchPriority;
  });
});

onMounted(fetchData);
</script>
