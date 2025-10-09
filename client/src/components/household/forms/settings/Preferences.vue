<template>
  <h2 class=" font-medium">Preferences</h2>
  <fieldset class="fieldset mb-3">
    <legend class="fieldset-legend">Chore Rotation Day</legend>
    <select class="select w-full">
      <option disabled selected>Pick a day</option>
      <option>Sunday</option>
      <option>Monday</option>
      <option>Tuesday</option>
      <option>Wednesday</option>
      <option>Thursday</option>
      <option>Friday</option>
      <option>Saturday</option>
    </select>
  </fieldset>

  <section>
    <h2 class="font-medium mb-3">Expense Settings</h2>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Currency</legend>
      <select class="select w-full">
        <option disabled selected class="text-light">Pick a currency</option>
        <option>USD ($)</option>
        <option>Euro (€)</option>
        <option>GBP (£)</option>
        <option>Yen (¥)</option>
      </select>
    </fieldset>
    <div class="flex justify-between items-center my-4">
      <div>
        <p class="font-medium">Require Expense approval</p>
        <p class="text-xs">Expenses need admin approval</p>
      </div>
      <input type="checkbox" checked="checked" class="toggle  checked:bg-base-300" />
    </div>

      <Button type="submit" variant="primary" class="w-full mt-2">
        <template #text>
          Save Changes
        </template>
      </Button>
    
  </section>

</template>
<script setup>
import Input from '../../../ui/Input.vue';
import Button from '../../../ui/Button.vue';

</script>