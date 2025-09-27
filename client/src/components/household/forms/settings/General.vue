<template>
  <form @submit="" class="flex gap-3 flex-col">
   <Input 
    name="name"
    :is-required="true"
    label="Household Name"
    placeholder="Eg. Chase House"
    class="w-full"
    type="text"
  />
  <div>
    <label for="description" class="label text-primary-text text-left ml-2 mb-3 font-semi+bold w-full">House Description</label>
    <textarea 
    name="Description"
    placeholder="Brief description of your household..."
    class=" input w-full outline-0 border-1 focus:outline-0 border-light-border rounded-md "
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
  />
  <Input 
    name="Address"
    :is-required="true"
    label="House Address"
    placeholder="Eg. 123 Main St"
    class="w-full"
    type="text"
  />
  <Button type="submit" variant="primary" class="w-full mt-2">
    <template #text>
      Save
    </template>
  </Button>
</form>

</template>
<script setup>
import Input from '../../../ui/Input.vue';
import Button from '../../../ui/Button.vue';
</script>