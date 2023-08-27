<template>
    <div class="change">
      <div class="contact-page">
        <h1>联系客服</h1>
        <el-select v-model="selectedQuestion" placeholder="请选择问题" @change="getAnswer">
          <el-option v-for="question in questions" :key="question.ID" :label="question.Question" :value="question.ID"></el-option>
        </el-select>
  
        <div class="answer" v-if="selectedAnswer">
          <h2>答案：</h2>
          <p>{{ selectedAnswer }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ContactPage',
    data() {
      return {
        selectedQuestion: '',
        selectedAnswer: '',
        questions: [],
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios.get('http://110.42.220.245:8081/CustomerService')
          .then(response => {
            this.questions = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      getAnswer() {
        const question = this.questions.find(q => q.ID === this.selectedQuestion);
        if (question) {
          this.selectedAnswer = question.Answer;
        } else {
          this.selectedAnswer = '';
        }
      },
    },
  };
  </script>
  
  <style>
  .contact-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .answer {
    margin-top: 20px;
  }
  
  h1,
  h2 {
    margin-bottom: 10px;
  }
  
  .change {
    border: 1px solid #ccc;
    width: 1200px;
    margin-top: 0%;
    font-size: 30px;
    color: black;
    position: absolute;
    top: 150px;
    left: 205px;
    padding: 40px;
  }
  </style>