<template>
  <Header >
    <template #header>
      <HouseholdHeader @buttonClick="changeModalComponent"/>
    </template>  
  </Header>
  <main class="px-5">
      <div v-if="loading">
        <Spinner :show-spinner="loading"/>
      </div>
      <div v-if="!household">
        No household
      </div>
      <div v-else>
        <Banner :household="household" @show-modal="changeModalComponent"/>
      </div>
  </main>
  <Modal :currentComponent="modalComponent" :component-properties="componentPropertiesRef" />
</template>

<script setup>
import Header from '../../ui/Header.vue';
import HouseholdHeader from '../../household/Header.vue';
import NewHousehold from '../../household/NewHousehold.vue';
import InviteMembers from '../../household/forms/InviteMembers.vue';
import Settings from '../../household/forms/settings/Settings.vue';
import { useApi } from '../../../composables/useApi';
import useNotifications from '../../../composables/useNotifications';
import api from '../../../utils/axios';
import { onMounted, ref, shallowRef } from 'vue'
import { useAuth } from '../../../composables/useAuth';
import Spinner from '../../ui/Spinner.vue';
import Banner from '../../household/Banner.vue';

const {apiCall} = useApi();
const {authUser} = useAuth();
const household = ref();
const loading = ref(false);
const modalComponent  = shallowRef(null);
const componentPropertiesRef = ref({});

onMounted(() => {
  fetchData();
})
async function fetchData() {
  try {
     const response = await  apiCall(
        () => api.get(`/household`),
        {successMessage: "Welcome Back!",loadingRef:loading}
      );
    household.value = response?.data.data.household;
    console.log(household.value)
  } catch (error) {
    useNotifications().showErrorToast(error.message);
  }
}

function changeModalComponent(name){
  let componentProperties = {};
  switch (name) {
    case 'InviteMembers':
      componentProperties.title ="Invite Members";
      componentProperties.endpoint ="/household";
      componentProperties.method ="patch";
      modalComponent.value = InviteMembers;
      break;
    case 'Settings':
      componentProperties.title = "Settings"
      modalComponent.value = Settings;
      break;
    case 'NewHousehold':
      componentProperties.title = "New Household";
      modalComponent.value = NewHousehold;
      break;
    default:
      break;
  }
  componentPropertiesRef.value = componentProperties;
  openModal();
}

function openModal(){
  document.getElementById('my_modal_1').showModal();
}

function processHouseholdData(household){
  console.log(household)
}
</script>