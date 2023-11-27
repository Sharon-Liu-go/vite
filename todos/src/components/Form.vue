<template>
<h1>Hello</h1>
<h1>註冊事件：表單處理@input=""</h1>
<h2>使用監聽事件</h2>
<div class="input-field">
  <span for='username'>請輸入您的用戶名：</span>
  <input type="text" id="username" @input="handleInput">
</div>

<div class="">{{username}}</div>


<h2>使用v-bind,讓輸入值和顯示值同時響應，改變時一同改變</h2>
<div class="input-field">
  <span for='username'>請輸入您的用戶名：</span>
  <input type="text" id="username" @input="handleInput" v-bind:value="username">
</div>
<button @click='resetUsername'>重置</button>
<div class="">{{username}}</div>

<h1>雙向綁定：v-model，同步更新</h1>
<div class="input-field">
  <span for='phone'>請輸入您的的電話：</span>
  <input type="text" id="phone" v-model="phone">
</div>
<button @click='resetPhone'>重置</button>
<div class="">{{phone}}</div>


<h1>不同input select textarea 的v-model綁定情況</h1>
<h1>加上表單submit，並且不跳轉:@submit.prevent</h1>

<div class="input-field">
<form @submit.prevent="handleSubmit">
  <div class="name">
    <label for='name'>姓名：</label>
    <input type="text" id="name" v-model="name">
  </div>

  <div class="checkbox-group">
    <label for="skills">技能：</label>
    <input type="checkbox" name="skills" value="frontend" v-model="skills"><span>前端</span>
    <input type="checkbox" name="skills" value="backend" v-model="skills"><span>後端</span>
    <input type="checkbox" name="skills" value="fullback" v-model="skills"><span>全端</span>
  </div>

  <div class="education">
  <label for="education">學歷</label>
  <select name="education" id="education" v-model="education">
    <option value="master">碩士</option>
    <option value="bachelor">學士</option>
    <option value="highSchool">高中</option>
  </select>
  </div>

  <div class="selfIntroduction">
    <label for="selfIntroduction">自我介紹:</label>
    <textarea name="selfIntroduction" id="" cols="30" rows="10" v-model="intro">
    </textarea>
  </div>

<button type="submit">送出</button>
</form>
</div>
 

<div class="">顯示內容</div>
<div class="">name:{{name}}</div>
<div class="">skills:{{skills}}</div>
<div class="">education:{{education}}</div>
<div class="">intro:{{intro}}</div>

<h1>綁定數據到style、class</h1>
</template>

<script>
export default {
  data(){
    return {
      username : '顯示輸入的名字',
      phone :'12345678',

      name : '',
      skills:[],
      education:'',
      intro : ""
      
    }
  },
  methods:{
    handleInput(e){
      this.username = e.target.value;
    },
    resetUsername(e){
      this.username = ''
    },
    resetPhone(){
      this.phone = ''
    },
    handleSubmit(){
      console.log(
        this.name,
        this.skills,
        this.education,
        this.intro
      )
    }
  },
}
</script>

<style>
</style>