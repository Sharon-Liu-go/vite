<template>
  <main>
  <h1>Welcome! {{name}}</h1>
  <div class="box"></div>
  </main>

</template>
<script setup>
import {ref} from 'vue'
import {useUserStore} from '../stores/users';
const userStore = useUserStore();
const name = ref('');
name.value = userStore.user.name
</script>
<style scoped>

main{
  display: grid;
  place-items: center;
}

.box{
  width: 200px;
  height: 200px;
  background: linear-gradient(
    45deg,
    hsl(183, 80%, 62%),
    hsl(72, 85%, 44%)
  ) ;
  margin: 50px;
  padding:0.5em,1.4em;
  border-radius: 4px;
  color: beige;

  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>