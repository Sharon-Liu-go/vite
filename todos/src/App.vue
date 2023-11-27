<script>
//import Todos from './components/Todos.vue'
import Vmodel from './components/Vmodel.vue'
import Event from './components/Event.vue'
import Form from './components/Form.vue'


import HomePage from "./pages/HomePage.vue"
import Todos from "./pages/Notes.vue"
export default {
  // components : {Todos,Vmodel,Event,Form}
  components : {HomePage,Todos}
}
</script>

  <!-- <nav >
    <router-link to="/home">首頁</router-link>  
    <router-view></router-view>
  </nav> -->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><HomePage /></el-aside>
      <el-container>       
        <el-header>
          <router-view name="nav"></router-view>                  
        </el-header>
       
        <el-main>
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

<style scoped>
</style>
