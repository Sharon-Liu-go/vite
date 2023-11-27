<template>
  <div> 
    <h1>Name : {{userStore.name}}</h1>
  </div>
</template>
<script setup>
import {useUserStore} from '../stores/users'
const userStore = useUserStore().user;
console.log(userStore.user)
</script>
<style scoped>

</style>