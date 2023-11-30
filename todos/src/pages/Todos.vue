<template>

  <div class="table">

 <el-button type="success" :icon="Plus" circle  @click="showForm({})"/>
  <el-table :data="todoList" height="100%" style="width: 100% "  :row-class-name="tableRowClassName">
    <el-table-column prop="createDate" label="建立日期" width="auto" />
    <el-table-column prop="item" label="Item" width="auto" />
    <el-table-column prop="dueDate" label="Due Date" width="auto" />
    <el-table-column prop="status" label="狀態" width="auto">
      <template v-slot="{ row }">
        {{ formatStatus(row.status) }}
      </template>
    </el-table-column> 
    <el-table-column prop="Operation" label="操作" width="auto">
      <template #default="scope">
        <el-button type="primary" :icon="Edit" circle @click="showForm(scope.row)"/>
        <el-button type="danger" :icon="Delete" circle @click="deleteTodo(scope.$index)"/>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" :title='formTitle'>
    <el-form :model="form">
      <el-form-item label="Item" :label-width="formLabelWidth">
        <el-input v-model="form.item" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Due Date" :label-width="formLabelWidth">
        <el-date-picker
        v-model="form.dueDate"
        type="date"
        placeholder="Pick a day"
      />
      </el-form-item>
      <el-form-item v-show="form.id > 0" label="狀態" :label-width="formLabelWidth">
        <el-select v-model="form.status">
          <el-option
            v-for="(statusText, statusNum) in statusList" :label="statusText" :value="statusNum"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitTodo">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  </div>
 

</template>


<script >

import {onMounted,ref, reactive} from 'vue';
import axios from 'axios';
import { ElMessageBox } from 'element-plus'
import {
  Plus,
  Delete,
  Edit,
} from '@element-plus/icons-vue'

const todoList = ref([]);
export default{
  setup(){
    onMounted(async()=>{
      try{
      const res = await axios.get('http://localhost:3000/todos');
      console.log(res.data)
      todoList.value = res.data;
      }catch(err){
      console.log('todo:',err)
      }

    })

    let dialogFormVisible = ref(false)
    const formLabelWidth = '120px'
    let formTitle = ref('');
    const form = reactive({
        createDate: '',
        item: '',
        dueDate: '',
        status : 0
    })
    const statusList = reactive({
      '0': "待辦",
      '1': "完成",
      '2': "暫停"
    })

    const formatStatus = (status) => {
    console.log('status',status)
    return statusList[status];
    }

 

    const showForm = async function (row){
      formTitle.value = row.id ? 'Edit a todo' : 'Add a todo';
      form.id = row.id || '';
      form.item = row.item || '';
      form.dueDate = row.dueDate || '';
      form.status = row.status || 0;
      dialogFormVisible.value = true;
    }


    const submitTodo = async function (){
     console.log('form',form)
     const res = await axios.post(`http://localhost:3000/todo`,{
        ...form,
      });
      todoList.value = res.data;
      dialogFormVisible.value = false;
    }


    const deleteTodo = function (index) {
    ElMessageBox.confirm('Are you sure to delete this todo?')
     .then(async () => {
        const res = await axios.delete(`http://localhost:3000/todo/${index}`);
        todoList.value = res.data;
     })
     .catch((err) => {
      console.log('deleteTodo Fail: ',err)
     })
    }

   return {todoList,Plus,Edit,Delete,dialogFormVisible,form,formTitle,formatStatus,showForm,submitTodo,deleteTodo,formLabelWidth,statusList}
  } 
}

</script>

<style scoped>

.el-button--success  {
  margin-bottom: 15px;
}

.el-table__body-wrapper{
  background: hsl(221, 100%, 13%);
}

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-table {
  --el-table-tr-bg-color: hsl(221, 100%, 13%);
  color : goldenrod
}
</style>