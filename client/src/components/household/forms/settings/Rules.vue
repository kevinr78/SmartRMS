<template>
  <div class="flex flex-col gap-8 w-full max-w-3xl pb-10">
    <div class="flex flex-col pb-2 text-center">
      <h2 class="text-2xl font-semibold text-primary">House Rules</h2>
      <p class="text-text-secondary text-sm mt-1 text-center">
        Establish and manage guidelines for a harmonious household.
      </p>
    </div>

    <div class="flex flex-col gap-8 text-left">
      <section
        class="bg-primary-light rounded-xl p-6 flex flex-col gap-4 shadow-sm"
      >
        <h3 class="font-medium text-primary text-lg pb-2 text-center">
          Add New Rule
        </h3>

        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full"
        >
          <div class="w-full flex-grow">
            <Input
              name="rule"
              placeholder="e.g., No loud music after 10 PM"
              :isRequired="false"
              type="text"
              v-model="newRule"
              class="w-full"
            />
          </div>
          <Button
            variant="primary"
            @button-click="addNewRule"
            class="w-full sm:w-auto px-6 whitespace-nowrap mt-1 sm:mt-0"
          >
            <template #icon><Plus size="18" /></template>
            Add Rule
          </Button>
        </div>
        <p class="text-left ml-1 text-error text-sm -mt-2" v-show="isEmptyRule">
          Rule cannot be empty.
        </p>
      </section>

      <section
        v-if="householdData?.houseRules?.length"
        class="bg-primary-light rounded-xl p-6 flex flex-col gap-4 shadow-sm"
      >
        <h3 class="font-medium text-primary text-lg pb-2 text-center">
          Current Rules
        </h3>

        <ul class="flex flex-col gap-3">
          <li
            v-for="houseRule in householdData.houseRules"
            :key="houseRule._id"
            class="flex flex-col bg-base-main shadow-sm rounded-lg p-4 w-full transition-colors duration-200"
          >
            <div
              v-if="editingRuleId === houseRule._id"
              class="flex flex-col sm:flex-row w-full gap-3 items-start sm:items-center"
            >
              <div class="w-full flex-grow">
                <Input
                  v-model="editRuleText"
                  class="w-full"
                  name="editRule"
                  type="text"
                />
              </div>
              <div class="flex gap-2 w-full sm:w-auto justify-end mt-1 sm:mt-0">
                <Button
                  variant="primary"
                  @button-click="saveEdit(houseRule._id)"
                  >Save</Button
                >
                <Button variant="outline" @button-click="cancelEdit"
                  >Cancel</Button
                >
              </div>
            </div>

            <div
              v-else
              class="group flex justify-between items-center w-full gap-4"
            >
              <p
                class="text-text-main font-medium text-left leading-snug break-words"
              >
                {{ houseRule.rule }}
              </p>

              <div
                class="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 shrink-0"
              >
                <button
                  class="p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-md transition-colors"
                  @click="startEdit(houseRule)"
                  title="Edit Rule"
                >
                  <Edit size="18" />
                </button>
                <button
                  class="p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-md transition-colors"
                  @click="removeRule(houseRule._id)"
                  title="Delete Rule"
                >
                  <CircleX size="18" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section
        v-else
        class="bg-primary-light/50 rounded-xl p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-primary/20"
      >
        <p class="text-text-secondary font-medium mb-1">
          No house rules established yet.
        </p>
        <p class="text-sm text-text-tertiary">
          Add your first rule above to set expectations for your household.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import Input from "../../../ui/Input.vue";
import Button from "../../../ui/Button.vue";
import { Plus, CircleX, Edit } from "lucide-vue-next";
import { ref } from "vue";
import useNotifications from "../../../../composables/useNotifications";
import { useAuth } from "../../../../composables/useAuth";

const { authUser } = useAuth();
const { showWarningToast } = useNotifications();

const newRule = ref("");
const isEmptyRule = ref(false);

// State for editing
const editingRuleId = ref(null);
const editRuleText = ref("");

const emit = defineEmits(["updateSettings"]);

const props = defineProps({
  householdData: {
    type: Object,
    required: false,
    default: () => ({ houseRules: [] }),
  },
});

// CREATE
function addNewRule() {
  isEmptyRule.value = false;
  if (newRule.value.trim()) {
    emit("updateSettings", {
      newRule: {
        rule: newRule.value.trim(),
        createdBy: authUser.value._id,
      },
    });
    newRule.value = "";
  } else {
    isEmptyRule.value = true;
  }
}

// UPDATE (Start editing)
function startEdit(rule) {
  editingRuleId.value = rule._id;
  editRuleText.value = rule.rule;
}

// UPDATE (Save edit)
function saveEdit(ruleId) {
  if (!editRuleText.value.trim()) {
    showWarningToast("Rule cannot be empty.");
    return;
  }

  emit("updateSettings", {
    updateRule: {
      ruleId: ruleId,
      rule: editRuleText.value.trim(),
    },
  });

  // Reset edit state
  editingRuleId.value = null;
  editRuleText.value = "";
}

// UPDATE (Cancel edit)
function cancelEdit() {
  editingRuleId.value = null;
  editRuleText.value = "";
}

// DELETE
function removeRule(ruleId) {
  emit("updateSettings", { deleteRuleId: ruleId });
}
</script>
