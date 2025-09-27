<template>
  <form class="flex flex-col gap-4"  name="invite-members-form" @submit.prevent="handleFormSubmit">
    <Input 
      label="Member Name" 
      type="text" 
      placeholder="Enter member name" 
      name="name" 
      class="w-full"
      :is-required="true"
    >
      <template #icon>
        <Pencil size="16" />
      </template>
    </Input>
    <Input 
      label="Email" 
      type="email" 
      placeholder="janedoe@gmail.com" 
      name="email" 
      class="w-full"
      :is-required="true"
    >
        <template #icon>
          <Mail size="16" />
        </template>
    </Input>
    <Button variant="primary" type="submit" :is-loading="false">
      <template #text>
        Save
      </template>
      <template #spinner></template>
    </Button>
  </form>
</template>

<script setup>
import Input from '../../ui/Input.vue';
import Button from '../../ui/Button.vue';
import { Pencil , Mail} from 'lucide-vue-next';
const emit = defineEmits(['submit-form']);


async function handleFormSubmit(e){
  try {
    const formData = getFormData(e);
    const response = await apiCall(
      ()=> api.patch('/household',formData),{
        successMessage: "Invite sent successfully",
        loadingRef:showLoadingSpinner
      }
    )

    showSuccessToast(response?.data.message);
  } catch (error) {
    showErrorToast(error.message)
  }

}

function getFormData(e){
    const form = new FormData(e.currentTarget);
    const formValue = Object.fromEntries(form);
    return formValue;
}

</script>