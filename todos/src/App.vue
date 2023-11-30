<script>
import Vmodel from './components/Vmodel.vue'
import Event from './components/Event.vue'
import Form from './components/Form.vue'

import LeftNav from './components/LeftNav.vue'

import { ref ,watchEffect } from 'vue'
import {useUserStore} from './stores/users'


export default {
  // components : {Todos,Vmodel,Event,Form}
  components : {
    LeftNav,
  },
  setup(){
    let isLoggedIn = ref(false);
    const userStore = useUserStore()
    // 监听 store 中某个状态的变化
    watchEffect(async () => {
    const newValue = await userStore.isLoggedIn();
    console.log(`isLoggedIn changed to ${newValue}`);
    isLoggedIn.value = newValue;
  })
  return {isLoggedIn}
  }
}
</script>

<template>
   <div class="common-layout">
    <el-container class='container'>
      <el-aside v-if="isLoggedIn" width="200px"><LeftNav /></el-aside>
      <el-container class='content'>       
        <el-header>
          <router-view name="nav"></router-view>                  
        </el-header>
       
        <el-main >
          <router-view ></router-view>
        </el-main>

        <el-footer>
          <router-view name="footer"></router-view>
        </el-footer>      
      </el-container>
    </el-container>
  </div>
  <!-- <Todos /> -->
  <!-- <Vmodel /> -->
  <!-- <Event /> -->
  <!-- <Form /> -->
</template>

<style>

 .container {
  height: 100vh; /* 使 main 高度充满整个视口 */
 }

 a {
  text-decoration: none; /* 去掉連結的底線 */ 
 }
</style>
