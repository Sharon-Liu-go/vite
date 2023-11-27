<template>
<h1>Hello,{{name}}</h1>
<h1>註冊事件：v-on:click="" = @click=""</h1>
<div class="">
  <h3>點擊按鈕，可以把答案顯示或隱藏</h3>
  <p class="question">what's your name?</p>
  <p class="answer" v-show="showAnswer" >My Name is {{name}}</p>  
  <button @click="showAnswer = !showAnswer">{{showAnswer? "隱藏":"顯示"}}答案</button>
</div>
<div>
  <h2>其他常用的註冊事件:</h2>
<img src="/onEvent.png" alt="">
</div>


<h1>計算屬性：computed，{{showAnswer? "隱藏":"顯示"}}答案改成computed屬性的Label函數</h1>
<h1>method: 把showAnswer = !showAnswer 寫成toggleAnswer的函數</h1>
<div class="">
  <h3>點擊按鈕，可以把答案顯示或隱藏</h3>
  <p class="question">what's your name?</p>
  <p class="answer" v-show="showAnswer" >My Name is {{name}}</p>  
  <button @click="toggleAnswer">{{label}}</button>
</div>


<h1>watch:無法自定義函數名，設定定時器，點擊按鈕，開始從5倒數計時</h1>
<button @click="toggleAnswer">{{label}}</button>

</template>

<script>
export default {
  data(){
    return {
      name : 'Sharon',
      showAnswer : false,
      countDown : 5,
      timer : null,
    }
  },
  computed:{
    label(){
      return this.showAnswer ? "隱藏答案 "+ this.countDown: "顯示答案";
    }
  },
  methods:{
    toggleAnswer(){
      this.showAnswer = !this.showAnswer;
    }
  },
  watch:{
     showAnswer(newVal,oldVal){
      console.log(newVal)
      if(newVal){
        this.countDown = 5;
        if (this.timer){
          clearInterval(this.timer)
          this.timer = null
        }
        this.timer= setInterval(()=>{
          this.countDown -= 1;
          if(this.countDown === 0){
            this.showAnswer =false;
            clearInterval(this.timer)
            this.timer = null
          }
        },1000)
      }
    }
  }
}
</script>

<style>
</style>