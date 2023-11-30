<template>
  <header> 
    <div class="current-user">
        User:  {{name}}
    </div>
  </header>
</template>
<script setup>
  import {ref} from 'vue'
  import {useUserStore} from '../stores/users';
const userStore = useUserStore();
const name = ref('');
name.value = userStore.user.name
</script>

<style scoped>
  .current-user {
    display: grid;
    place-items: end;
  }
</style>