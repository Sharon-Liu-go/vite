<template>
  <el-container  style="height: 400px;  display: flex; justify-content: center; align-items: center;">
      <el-form style="border: 1px solid #eee; border-radius: 4px; padding: 50px; "
    ref="form"
    :model="sizeForm"
    label-width="auto"
    :label-position="labelPosition"
    :size="size"
  >
    <el-form-item label="Name">
      <el-input v-model="sizeForm.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="sizeForm.email" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="sizeForm.password" />
    </el-form-item>
    <el-form-item label="ConfirmPassword">
      <el-input type="password" v-model="sizeForm.confirmPassword" />
    </el-form-item>
    <el-form-item label="Birthday">
      <el-date-picker
          v-model="sizeForm.birthday"
          type="date"
          label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
        />
    </el-form-item>
    <el-form-item label="Gender">
      <el-radio-group v-model="sizeForm.gender">
        <el-radio border label="Male" />
        <el-radio border label="Female" />
         <el-radio border label="Other" />
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Sign up</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
    <el-form-item>
      <router-link style="color: white" to='/signIn'>Sign in</router-link>
    </el-form-item>
  </el-form> 
  </el-container>


</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const size = ref('Large')
const labelPosition = ref('left')

const sizeForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthday: '',
  gender: '',
})

async function onSubmit() {
  try{
  const res = await axios.post(`http://localhost:3000/signUp`,sizeForm);
  }catch(err){
    console.log(err)
  }
}

</script>

<style scoped>
.el-radio-group {
  margin-right: 12px;
}

html {
 background: hsl(221, 100%, 13%);
}
</style>
