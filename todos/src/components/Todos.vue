<template>
<div>
   <button @click="openModal()">新增</button>    
   <table class="todo-list-table" >
      <thead>
        <tr>
          <th>建立日期</th>
          <th>項目</th>
          <th>Due Date</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo,index) in todos" :key="todo.id">
          <td>{{ todo.createDate }}</td>
          <td>{{ todo.item }}</td>
          <td>{{ todo.dueDate }}</td>
          <td>{{ todo.status }}</td>
          <td><button @click="openModal({...todo,index})">編輯</button><button @click="delTodo">刪除</button></td>
        </tr>
      </tbody>
    </table>
  
    <div class="modal-container" v-if="isModalOpen">
      <div class="modal">
         <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
         <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <span class="close" @click="closeModal" style="cursor: pointer;">&times;</span>
              <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title"> <span>{{openModalAct}}</span></h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500"></p>

          <div class="modal">  
          <div class="modal-content  bg-white">
        <div>
          <label for="todo_item" style="">代辦項目</label>
          <input type="text" id="todo_item" v-model="modalTodo.item">
        </div>
        <div>
          <label for="todo_dueDate">Due Date</label>
          <input type="date" id="todo_dueDate" v-model="modalTodo.dueDate">
        </div>
        <div v-if="openModalAct==='編輯'">
          <label for="status">狀態</label>
          <select v-model="modalTodo.status">
            <option value="待辦">待辦</option>
            <option value="完成">完成</option>
          </select>
        </div>
            <button @click="submitModal(openModalAct)">Submit</button>
        <slot></slot>
      </div>
                  </div>
                        
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          
        </div>
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import Modals from './Modals.vue'
export default {
  data() {
    return {
      todos: [
        { id: 1, createDate: '2023-10-01', item: '寫vue期中作業', dueDate: '2023-11-01', status: '待辦' },
        { id: 2, createDate: '2023-10-02', item: 'vue開會1', dueDate: '2023-11-01', status: '待辦' },
        { id: 3, createDate: '2023-10-02', item: 'vue開會2', dueDate: '2023-11-01', status: '待辦' },
        { id: 4, createDate: '2023-10-02', item: 'vue開會3', dueDate: '2023-11-01', status: '待辦' },
        { id: 5, createDate: '2023-10-02', item: 'vue開會4', dueDate: '2023-11-01', status: '待辦' },
        { id: 6, createDate: '2023-10-02', item: 'vue開會5', dueDate: '2023-11-01', status: '待辦' }
      ],
      isModalOpen: false,
      openModalAct: '',
      modalTodo: {},
    }
  },
  components : {Modals},
  methods: {
    openModal(todo) {
      console.log(todo)
      this.isModalOpen = true;
      this.openModalAct = todo ? '編輯' : '新增';
      this.modalTodo = Object.assign({}, todo) || {};
      console.log(this.openModalAct)
    },
    closeModal() {
      this.isModalOpen = false;
    },
    add(todo) {
      console.log(todo)
      const id = this.todos.length + 1;
      const newTodo = { id, createDate: '2023-10-02', item: todo.item, dueDate: todo.dueDate, status: '待辦' }
      this.todos.push(newTodo)
    },
    edit(todo) {
      const index = todo.index;
      delete todo.index;
      this.todos[index] = todo;
    },
    delTodo(todo) {
      console.log('1213213',todo)
      this.todos.splice(todo.index, 1)
    },
    submitModal(openModalAct) {
      openModalAct === '新增' ? this.add(this.modalTodo) : this.edit(this.modalTodo);
      console.log('this',this)
      this.closeModal()
      this.modalTodo = {}
    }
  },
}
</script>
<style>
/* 模态框容器 */
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 半透明遮罩层 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 足够高的 z-index */
  font :bold;
  font-size: 30px;
  color: navy
}

.todo-list-table{
   width: 100%; /* 设置表格宽度为100% */
}


</style>