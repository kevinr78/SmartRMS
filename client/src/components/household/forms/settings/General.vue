<template>
  <form @submit="" class="flex gap-3 flex-col">
    <Input
      name="name"
      :is-required="true"
      label="Household Name"
      placeholder="Eg. Chase House"
      class="w-full"
      type="text"
      v-model = "formData.name"
    />
    <div>
      <label
        for="description"
        class="label text-primary-text text-left ml-2 mb-3 font-medium w-full"
        >House Description
      </label>
      <textarea
        name="Description"
        :v-model = "formData.description"
        placeholder="Brief description of your household..."
        class="input w-full outline-0 border-1 focus:outline-0 border-light-border rounded-md"
        type="textarea"
      />
    </div>
    <Input
      name="residents"
      :is-required="true"
      label="Total Residents"
      placeholder="Eg. 1"
      class="w-full"
      type="number"
      min="1"
      v-model="formData.totalResidents"
    />
    <Input
      name="Address"
      :is-required="true"
      label="House Address"
      placeholder="Eg. 123 Main St"
      class="w-full"
      type="text"
      v-model="formData.address.country"
    />
    <Button type="submit" variant="primary" class="w-full mt-2">
      <template #text> Save Changes </template>
    </Button>
  </form>
</template>
<script setup>
import Input from "../../../ui/Input.vue";
import Button from "../../../ui/Button.vue";
import { computed, watch, ref } from "vue";

const props = defineProps({
  householdData: {
    type: Object,
    required: false
  }
});
const formData = ref({
  name: '',
  description: '',
  totalResidents: 1,
  address: {
    street: '',
    city: '',
    country: '',
  }
});

watch(() => props.householdData, (newData) => {
  if(newData){
    console.log(newData)
    formData.value.name = newData.name || ''
    formData.value.description = newData.description || ''
    formData.value.totalResidents = newData.members?.length || 1;
    formData.value.address.country = newData.address.country;
  }
}, {immediate:true,deep:true})


</script>
