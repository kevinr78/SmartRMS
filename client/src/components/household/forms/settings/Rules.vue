<template>
  <h1>House Rules</h1>
  <div class="flex items-center">
    <Input name="rule" placeholder="Add a new houserule" :is-required="false" class="flex-1" type="text" v-model="rule"/>
    <Button variant="primary" @button-click="addNewRule">
      <template #icon>
        <Plus />
      </template>
    </Button>
  </div>
  <section>
    <ol>
      <li v-for="houseRule in rules">
        {{ houseRule }}
      </li>
    </ol>
  </section>
</template>
<script setup>
import Input from '../../../ui/Input.vue';
import Button from '../../../ui/Button.vue';
import { Plus } from 'lucide-vue-next';
import { ref } from 'vue';

const rule = defineModel('rule');
const rules = ref([]);


function addNewRule(){
  console.log(rule.value)
  if(rule.length >0){
    rules.push(rule)
  }
}
</script>