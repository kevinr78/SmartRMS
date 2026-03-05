<template>
  <h2 class="font-medium">House Rules</h2>
  <div class="flex items-end">
    <Input
      name="rule"
      placeholder="Add a new house rule..."
      :is-required="false"
      class="w-full"
      type="text"
      v-model="newRule"
    />
    <Button variant="primary" class="ml-2" @button-click="addNewRule">
      <template #icon>
        <Plus />
      </template>
    </Button>
  </div>
  <p class="text-left ml-1 mt-4 text-warning" v-show="isEmptyRule">
    Rule cannot be empty
  </p>
  <section class="mt-4">
    <ol>
      <li
        v-for="(houseRule, index) in householdData.houseRules"
        :key="houseRule.id"
        class="flex flex-col bg-base-300 gap-2 mb-2 p-2 rounded-md justify-between w-full"
      >
        <div class="group flex justify-between">
          <p class="font-light">
            {{ houseRule.rule }}
          </p>
          <div class="flex gap-2">
            <div
              class="hidden cursor-pointer group-hover:block"
              @click="edit(houseRule.id)"
            >
              <Edit color="#e74b4b" />
            </div>
            <div
              class="hidden cursor-pointer group-hover:block"
              @click="removeRule(houseRule.id)"
            >
              <CircleX color="#e74b4b" />
            </div>
          </div>
        </div>
      </li>
    </ol>
  </section>
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
const rules = ref([]);
const isEmptyRule = ref(false);
const emit = defineEmits(["updateSettings"]);

const props = defineProps({
  householdData: {
    type: Object,
    required: false,
  },
});

function addNewRule() {
  isEmptyRule.value = false;
  if (newRule.value.trim()) {
    rules.value.push(newRule.value.trim());
    //Can Batchs
    emit("updateSettings", {
      newRule: {
        rule: newRule.value,
        createdBy: authUser.value._id,
      },
    });
    newRule.value = ""; // clear input
  } else {
    isEmptyRule.value = true;
  }
}

function removeRule(index) {
  emit("updateSettings", { deleteRuleId: index });
  rules.value.splice(index, 1);
}
</script>
