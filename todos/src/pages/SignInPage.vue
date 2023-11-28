<template>
  <el-container  style="height: 400px;  display: flex; justify-content: center; align-items: center;">
      <el-form style="border: 1px solid #eee; border-radius: 4px; padding: 50px; "
    ref="form"
    :model="sizeForm"
    label-width="auto"
    :label-position="labelPosition"
    :size="size"
  >
    <el-form-item label="Email">
      <el-input v-model="sizeForm.email" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="sizeForm.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width : 100%" @click="onSubmit">Sign in</el-button>
    </el-form-item>
    <el-form-item>
      <router-link to='/signUp'>Sign up</router-link>
    </el-form-item>
  </el-form> 
  </el-container>


</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import {setJwtToken} from '../apis/auth'
import { useRouter } from 'vue-router';
import {useUserStore} from '../stores/users'
import {useTokenStore} from '../stores/token'

const size = ref('Large')
const labelPosition = ref('left')

const sizeForm = reactive({
  email: '',
  password: '',
})

const router = useRouter();

async function onSubmit() {
  console.log('submit!')
  try{
  const res = await axios.post(`http://localhost:3000/signIn`,sizeForm);
   if(res.code !== 0){
     //to to 失敗訊息
   }

   //將token存至localstorage
   setJwtToken(res.data.jwt) 

   //將token存到store
   const tokenStore = useTokenStore();
   console.log(tokenStore.token)
   tokenStore.token = res.data.jwt;

   console.log('res.data',res.data)
   //將user放到store
   const userStore = useUserStore();
   userStore.user.name = res.data.user.name;
   userStore.user.email = res.data.user.email;
   userStore.user.birthday = res.data.user.birthday;
   userStore.user.gender = res.data.user.gender;

   router.replace('/home') 
  }catch(err){
    // TO DO : 跳出登入失敗
    console.log(err)
  }
}
</script>

<style>
.el-radio-group {
  margin-right: 12px;
}
</style>
