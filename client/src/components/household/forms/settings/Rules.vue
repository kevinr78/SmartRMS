<template>
  <h2 class="font-medium">House Rules</h2>
  <div class="flex items-end ">
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
  <section class="mt-4">
    <ol>
      <li v-for="(houseRule,index) in rules" :key="index" class=" flex flex-col bg-base-300 gap-2 mb-2  p-2 rounded-md justify-between w-full">
          <div class="group flex justify-between">
            <p class="font-light">
              {{  houseRule }}
            </p>
              <div class=" hidden cursor-pointer group-hover:block" @click="removeRule(index)">
                <CircleX color="#e74b4b" />
              </div>
          </div>

      </li>
    </ol>
  </section>
</template>
<script setup>
import Input from "../../../ui/Input.vue";
import Button from "../../../ui/Button.vue";
import { Plus, CircleX } from "lucide-vue-next";
import { ref } from "vue";
import useNotifications from "../../../../composables/useNotifications";

const { showWarningToast } = useNotifications()
const newRule = ref("");
const rules = ref([]);

function addNewRule() { 
  if (newRule.value.trim()) {
    rules.value.push(newRule.value.trim());
    newRule.value = ""; // clear input
  }else{
    showWarningToast("Rule Cannot be empty")
  }
}

function removeRule(index){
  rules.value.splice(index,1);
}
</script>
