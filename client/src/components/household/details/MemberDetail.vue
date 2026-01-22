<template>
  <section class="w-full">
    <div class="flex items-center text-right mb-3">
      <Users class="mr-2" :size="16" />
      <span class="font-black"> Members </span>
    </div>
    <div>
      <div
        v-for="member in household.members"
        class="bg-blue-light-bg rounded-lg p-2 flex justify-between mb-2"
      >
        <div class="flex">
          <div class="bg-light-grey-bg rounded-3xl w-10 p-2 mr-2">
            <p class="font-bold">
              {{ member.userId.email.charAt(0).toUpperCase() }}
            </p>
          </div>
          <div class="text-left">
            <p>{{ member.userId.fullName ?? "Kevin Rodrigues" }}</p>
            <p>{{ member.userId.email }}</p>
          </div>
        </div>

        <div
          v-if="household.createdBy === member.userId._id"
          class="w-10 tooltip"
        >
          <div class="tooltip-content bg-primary-content">
            <div class="animate-pulse text-primary-text">Admin</div>
          </div>

          <Icon>
            <UserStar />
          </Icon>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import Icon from "../../ui/Icon.vue";
import { Users, House, UserStar, Settings, UserPlus } from "lucide-vue-next";
const props = defineProps({
  household: {
    type: Object,
    required: true,
  },
});

console.log(props.household);
</script>
