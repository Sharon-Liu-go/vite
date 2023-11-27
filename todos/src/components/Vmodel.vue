<template>
<h1>{{name}}</h1>
<h1>vue提供一組指令，可以在html模板中使用的特殊屬性：</h1>
<h1>v-bind : 數據綁定</h1>
<h2>eg:綁定連結:</h2>
<a v-bind:href="link">點擊連結</a>
<br/>
<a :href="link">點擊連結2</a>

<h1>v-for : 迴圈</h1>
<h2>遍歷數組</h2>
<ul>
  <li v-for="todo in todos">{{todo}}</li>
</ul>

<ul>
  <h2>有索引</h2>
  <li v-for="(todo,index) in todos">{{index + 1}}.{{todo}}</li>
</ul>

<ul>
  <h2>加上input的checkbox，並且使用v-bind綁定數據</h2>  
  <li v-for="todo in checkToDos">
    <input type="checkbox" :checked='todo.complete'> {{todo.item}}</li>
</ul>

<h1>v-if : 條件判斷，v-else-if、v-else 需相鄰使用</h1>
<p v-if="books.length === 0">沒有相關書籍</p>
<p v-else-if="books.length === 1">{{books[0]}}</p>
<p v-else>
  <ul>
    <li v-for='book in books'>{{book}}</li>
  </ul>
</p>

<h1>v-show : 條件判斷，條件不滿足時一樣會渲染標籤，只是display會顯示none</h1>
<p v-show ="books.length === 0">沒有相關書籍</p>
<p v-show ="books.length > 0">
  <ul>
    <li v-for='book in books'>{{book}}</li>
  </ul>
</p>

</template>

<script>
export default {
  data(){
    return {
      name : 'Hello,Sharon',
      link :'https://www.google.com/?client=safari&channel=mac_bm',
      todos : ['看書','吃飯','畫畫'],
      checkToDos : [{item:'看書',complete:true},{item:'吃飯',complete:false},{item:'畫畫',complete:true}],
      // books:[],
      // books:['被討厭的勇氣'],
      books:['被討厭的勇氣','發現你的天職']
    }
  }
}
</script>

<style>
</style>