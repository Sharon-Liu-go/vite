<template>

  <div class="table">

 <el-button type="success" :icon="Plus" circle  @click="showForm({})"/>
  <el-table :data="todoList" height="100%" style="width: 100% "  :row-class-name="tableRowClassName">
    <el-table-column prop=0 label="失敗原因" width="auto" />
    <el-table-column prop=1 label="玩家帳號" width="auto" />
    <el-table-column prop="Operation" label="pid 內容" width="auto">
      <template #default="scope">
        <el-button type="primary" @click="showForm(scope.row)">展開</el-button>
      </template>
    </el-table-column>
    <!-- <el-table-column prop=2 label="pid內容" width="auto" /> -->
  </el-table>
  <el-dialog v-model="dialogFormVisible" :title='formTitle'>
    <el-form :model="form">
      <el-form-item label="失敗原因: " :label-width="formLabelWidth">
        {{form.failReason}}
      </el-form-item>
      <el-form-item label="玩家帳號: " :label-width="formLabelWidth">
        {{form.account}}
      </el-form-item>
      <el-form-item label="Content: " :label-width="formLabelWidth" >
        {{form.redisResult}}
      </el-form-item>

    </el-form>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitTodo">
          Confirm
        </el-button>
      </span>
    </template> -->
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
      todoList.value = [['[accountId大小寫重複]','60000_Maxe' , '{"status":"fulfilled","value":{"rid":"214748482348","v":{"sceneTag":"","validBet":"608000","dayDiveGold":"0","dayLostGames":"0","winGold":"92000","uplineTime":"1661933739","gameType":"main","newbie":"0","isOnline":"0","roomSN":"0","monthWinGold":"92000","gpisUid":"","dayDeductGold":"0","dayWinGames":"0","dayLostGold":"0","monthLostGames":"2","monthValidBet":"608000","firstLogin":"1661854882","lostGames":"2","dayTotalGames":"0","haveGames":"{bgyx=true,}","accountId":"60000_Maxe","regIp":"::ffff:192.168.21.1","platformFlag":"0","sceneId":"1","dayWinGold":"0","lockGold":"0","acclevel":"LV5","lineCode":"60000_linecode1","dayOpenHb":"0","signinPData":"{flag={[1]=0,[2]=0,[3]=0,[4]=0,[5]=0,},weekFlag={[1]=0,[2]=0,[3]=0,[4]=0,[5]=0,[6]=0,[7]=0,},weekValue={[1]=100,[2]=100,[3]=0,[4]=0,[5]=0,[6]=0,[7]=0,},}","monthLostGold":"43000","channelId":"none","svrId":"20002","gold":"10049000","loginLock":"0","icon":"4","monthWinGames":"3","dayFTime":"0","gameMatchType":"6","monthTotalGames":"5","lang":"","offlineTime":"1661933751","sex":"1","dayValidBet":"0","totalGames":"5","lostGold":"43000","platformId":"60000","signinTotal":"0","name":"60000_Maxe","winGames":"3","dayKillGold":"0","extraInfo":"{ddz={dayTotalHands=0,},}"}}}']];
      console.log(todoList.value)
      }catch(err){
      console.log('todo:',err)
      }

    })

    let dialogFormVisible = ref(false)
    const formLabelWidth = '120px'
    let formTitle = ref('');
    const form = reactive({
        failReason: '',
        account: '',
        redisResult: ''
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
      console.log('hehhe',row)
      form.failReason = row[0]
      form.account = row[1];
      form.redisResult = row[2];
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

.el-form-item__content {
  border : red;
  width: 592px;
  white-space: normal;
}
</style>