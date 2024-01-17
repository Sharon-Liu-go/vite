<template>
  <nav>
 <el-radio-group v-model="isCollapse">
    <el-radio-button :label="false"><el-icon><ArrowRight /></el-icon></el-radio-button>
    <el-radio-button :label="true"><el-icon><ArrowLeft /></el-icon></el-radio-button>
  </el-radio-group>
  <el-menu
    text-color='#dfe2e8'
    default-active="1"
    background-color="#85a5c7"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
  <router-link to="/home">
    <el-menu-item index="1">
      <el-icon><HomeFilled /></el-icon>
      <template #title>Home</template>
    </el-menu-item>
    </router-link>
   <router-link to="/setting">
    <el-menu-item index="2">
      <el-icon><setting /></el-icon>
      <template #title>Setting</template>
    </el-menu-item>
    </router-link>
    <router-link to="/todos">  
    <el-menu-item index="3">
      <el-icon><document /></el-icon>
      <template #title>To Do List</template>
    </el-menu-item>
    </router-link>

    <el-menu-item index="4" @click="logout">
      <el-icon><SwitchButton /></el-icon>
      <template #title>Logout</template>
    </el-menu-item>

    <router-link to="/inspect">  
    <el-menu-item index="5">
      <el-icon><document /></el-icon>
      <template #title>inspect</template>
    </el-menu-item>
    </router-link>
  </el-menu>
  </nav>
 

</template>

<script setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, 
  ArrowRight,
  ArrowLeft,
  HomeFilled,
  SwitchButton
} from '@element-plus/icons-vue'
import { useTokenStore } from '../stores/token'
import { useRouter } from 'vue-router';

const isCollapse = ref(false)
const handleOpen = (key ,keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const router = useRouter();
const logout = () => {
  console.log('logout')
  useTokenStore().removeToken()
  router.replace('/signIn')
}

</script>

<style scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
 
  background: hsl(221, 100%, 13%);;
  width: 200px;
}
</style>