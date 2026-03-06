<template>
  <div class="flex flex-col gap-6 w-full max-w-4xl pb-10">
    <header
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div class="text-left">
        <h2 class="text-2xl font-bold text-text-main">Chore Management</h2>
        <p class="text-text-secondary text-sm">
          Keep your household organized and clean.
        </p>
      </div>
      <Button
        variant="primary"
        @button-click="changeModalComponent"
        class="px-6 shadow-sm"
      >
        <template #icon><Plus size="18" /></template>
        Add Chore
      </Button>
    </header>

    <div class="flex flex-col gap-4">
      <section
        v-if="chores.length"
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div
          v-for="chore in chores"
          :key="chore._id"
          class="bg-primary-light rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start">
            <h3 class="font-bold text-text-main text-lg">{{ chore.name }}</h3>
            <div>
              <span
                :class="getPriorityClass(chore.priority)"
                class="badge border-none px-3 py-2 text-xs font-bold uppercase mr-2"
              >
                {{ chore.priority }}
              </span>
              <span
                class="badge badge-base-eggshell border-none px-3 py-2 text-xs font-bold uppercase"
              >
                <Repeat2 :size="16" />
                {{ chore.frequency }}
              </span>
            </div>
          </div>

          <p class="text-text-secondary text-sm text-left line-clamp-2">
            {{ chore.instructions }}
          </p>

          <div
            class="flex items-center justify-between mt-2 pt-3 border-t border-border-light/40"
          >
            <div class="flex items-start gap-2 flex-col">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-text-main">
                  Assigned To - {{ chore.assignedTo?.fullName || "Unassigned" }}
                </span>
              </div>
            </div>
            <div class="flex gap-1">
              <button
                @click="editChore(chore)"
                class="btn btn-ghost btn-xs text-text-secondary hover:text-primary"
              >
                <Edit2 size="14" />
              </button>
              <button
                @click="confirmDelete(chore._id)"
                class="btn btn-ghost btn-xs text-text-secondary hover:text-error"
              >
                <Trash size="14" />
              </button>
            </div>
          </div>
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
    <Modal
      :currentComponent="modalComponent"
      :component-properties="componentPropertiesRef"
      @updateEvent="fetchData"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Plus, Edit2, Trash, ClipboardCheck, Repeat2 } from "lucide-vue-next";
import Button from "../ui/Button.vue";
import api from "../../utils/axios";
import { useApi } from "../../composables/useApi";
import Modal from "../ui/Modal.vue";
import ChoreForm from "../chores/ChoreForm.vue";
const modalComponent = ref(null);
const componentPropertiesRef = ref({});
const { apiCall } = useApi();
const chores = ref([]);
const isLoading = ref(false);

const fetchData = async () => {
  const response = await apiCall(() => api.get("/chores"), {
    loadingRef: isLoading,
  });
  chores.value = response?.data?.data || [];
};

const getPriorityClass = (priority) => {
  if (priority === "high") return "bg-error text-white";
  if (priority === "medium") return "bg-warning text-white";
  return "bg-success text-white";
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

onMounted(fetchData);
</script>
