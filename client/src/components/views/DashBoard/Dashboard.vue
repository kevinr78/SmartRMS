<template>
  <Header >
    <template #header>
      <DashboardHeader/>
    </template>
  </Header>
  <Card title="Pending Chores" value="1" variant="warning" :icon="CheckCheckIcon"/>
  <Card title="Pending Chores" value="1" variant="primary">
    <template #details>
      <CheckCheckIcon />
    </template>
  </Card>
  <Card title="Pending Chores" value="1" variant="success" :icon="CheckCheckIcon"/>
  <Card title="Pending Chores" value="1" variant="error" :icon="CheckCheckIcon"/>

</template>

<script setup>
import Header from '../../ui/Header.vue';
import DashboardHeader from '../../dashboard/DashboardHeader.vue';
import { CheckCheckIcon } from 'lucide-vue-next';
import Card from '../../ui/Card.vue';
</script>
