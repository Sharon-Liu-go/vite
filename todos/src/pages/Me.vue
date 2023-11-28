<template>
  <el-container  style="height: 400px;  display: flex; justify-content: center; align-items: center;">
      <el-form style="border: 1px solid #eee; border-radius: 4px; padding: 50px; "
    ref="form"
    :model="userStore"
    label-width="auto"
    :label-position="labelPosition"
    :size="size"
  >
    <el-form-item label="Name">
      <el-input v-model="userStore.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="userStore.email" />
    </el-form-item>
    <el-form-item label="Birthday">
      <el-date-picker
          v-model="userStore.birthday"
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
  </el-form> 
  </el-container>


</template>
<script setup>
import {useUserStore} from '../stores/users'
const userStore = useUserStore().user;
console.log('userStore:',userStore)
</script>
<style scoped>

</style>