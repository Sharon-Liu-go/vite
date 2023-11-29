<template>
  <nav>
 <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false"><el-icon><ArrowRight /></el-icon></el-radio-button>
    <el-radio-button :label="true"><el-icon><ArrowLeft /></el-icon></el-radio-button>
  </el-radio-group>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
  <router-link to="/home">
    <el-menu-item index="1">
      <el-icon><setting /></el-icon>
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
      <el-icon><document /></el-icon>
      <template #title>Logout</template>
    </el-menu-item>
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

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
</style>