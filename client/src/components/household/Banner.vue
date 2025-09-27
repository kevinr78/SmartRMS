<template>
  <div class="flex flex-col  bg-white rounded-lg items-center p-5 gap-2">
    <div class="flex items-center w-full justify-between ">
      <div class=" flex items-center ">
        <Icon>
          <House :size="30" />
        </Icon>
        <p class="font-bold text-2xl">{{ household.name }}</p>
      </div>
      <div class="badge badge-soft badge-primary">{{ household.members.length }} member {{ household.members.length
        > 1 ? 's' : null}}
      </div>
    </div>
    <MemberDetail :household="household" />
    <div className="divider"></div>
    <div v-if="userRole === 'admin'" class="flex flex-col gap-2 text-left w-full">
      <AdminActions @handleButtonClick="handleButtonClick"/>
    </div>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Icon from "../ui/Icon.vue";
import { Users, House, UserStar, Settings, UserPlus } from "lucide-vue-next";
import { useAuth } from "../../composables/useAuth";
import MemberDetail from "./details/MemberDetail.vue";
import AdminActions from "./details/AdminActions.vue";
const emit =defineEmits(['showModal'])
const { userRole} = useAuth();
const props = defineProps({
  household: {
    type: Object,
    required: true,
  },
});

function handleButtonClick(e){
  emit('showModal',e.target.name);
}


</script>
