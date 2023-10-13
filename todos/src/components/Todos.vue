<template>
<div>
<button @click="openModal()">新增</button>
    <table>
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

<div>
  <h1>modal</h1>
    <Modals/>
</div>
    <div class="modal" v-if="isModalOpen">
      <div class="modal-content">
        <span class="close" @click="closeModal" style="cursor: pointer;">&times;</span>
        <span>{{openModalAct}}</span>
        <div>
          <label for="todo_item">代辦項目</label>
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
</template>
<script>
import Modals from './Modals.vue'
export default {
  data() {
    return {
      todos: [
        { id: 1, createDate: '2023-10-01', item: '寫vue期中作業', dueDate: '2023-11-01', status: '待辦' },
        { id: 2, createDate: '2023-10-02', item: 'vue開會', dueDate: '2023-11-01', status: '待辦' }
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
      this.todos.splice(todo.index, 1)
    },
    submitModal(openModalAct) {
      openModalAct === '新增' ? this.add(this.modalTodo) : this.edit(this.modalTodo);
      console.log(this.todos)
      this.closeModal()
      this.modalTodo = {}
    }
  },
}
</script>
<style></style>