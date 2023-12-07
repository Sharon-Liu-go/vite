<template>
  <el-container  style="height: 400px;  display: flex; justify-content: center; align-items: center;">
      <el-form style="border: 1px solid #eee; border-radius: 4px; padding: 50px; "
    ref="form"
    :model="sizeForm"
    label-width="auto"
    label-position="left"
    size="Large"
  >
    <h1>編輯個人設定</h1>
    <el-form-item label="Name">
      <el-input v-model="sizeForm.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input disabled v-model="sizeForm.email" />
    </el-form-item>
    <el-form-item label="Birthday">
      <el-date-picker
          v-model="sizeForm.birthday"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
    </el-form-item>
    <el-form-item label="Gender">
      <el-radio-group v-model="sizeForm.gender">
        <el-radio border label="male">Male</el-radio>
        <el-radio border label="female">Female</el-radio>
         <el-radio border label="other">Other</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Confirm</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form> 
  </el-container>


</template>

<script setup>
import { reactive, onMounted} from 'vue'
import axios from 'axios'

//const size = ref('Large')
//const labelPosition = ref('left')



import {useTokenStore} from "../stores/token"
import {useUserStore} from "../stores/users"

const sizeForm = reactive({
  name: '',
  email: '',
  birthday: '',
  gender: '',
})
const tokenStore = useTokenStore();
const headers = {
  headers: {
        'Content-Type': 'application/json', // 指定请求的数据格式为 JSON
        'Authorization': 'Bearer ' + tokenStore.token, // 添加授权信息的头部
      }
}

onMounted(async()=>{
  try{
      const res = await axios.get('http://localhost:3000/user',headers);
      console.log(res.data)
      sizeForm.name = res.data.user.name;
      sizeForm.email = res.data.user.email;
      sizeForm.birthday = res.data.user.birthday;
      sizeForm.gender = res.data.user.gender;
      console.log(sizeForm)
  }catch(err){
      console.log('setting: ',err)
  }
}) 

async function onSubmit() {
  try{
  const res = await axios.post(`http://localhost:3000/user`,sizeForm,headers)
     sizeForm.name = res.data.user.name;
     sizeForm.email = res.data.user.email;
     sizeForm.birthday = res.data.user.birthday;
    sizeForm.gender = res.data.user.gender;
    const userStore = useUserStore()
    userStore.user.name = sizeForm.name;

  }catch(err){
    console.log(err)
  }
}
</script>

<style>
.el-radio-group {
  margin-right: 12px;
}
</style>
