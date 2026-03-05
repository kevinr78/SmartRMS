<template>
  <div class="flex items-center">
    <Settings :size="16" />
    <span class="font-black ml-2"> Admin Settings </span>
  </div>
  <div class="flex gap-2">
    <Button name="InviteMembers" @buttonClick="handleButtonClick">
      <template #icon>
        <UserPlus :size="16" />
      </template>
      Invite Members
    </Button>
    <Button name="Settings" @buttonClick="handleButtonClick">
      <template #icon>
        <Settings :size="16" />
      </template>

      Settings
    </Button>
  </div>
</template>

<script setup>
import Icon from "../../ui/Icon.vue";
import Button from "../../ui/Button.vue";
import { Users, House, UserStar, Settings, UserPlus } from "lucide-vue-next";
const emit = defineEmits(["handle-button-click"]);

function handleButtonClick(e) {
  emit("handle-button-click", e);
}
</script>
