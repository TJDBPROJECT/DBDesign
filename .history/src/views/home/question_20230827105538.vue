<template>
    <div class="change">
      <div class="contact-page">
        <div class="chat-container">
          <div class="chat-history">
            <div v-for="message in messages" :key="message.ID" class="message" :class="{ 'user-message': message.type === 'user', 'service-message': message.type === 'service' }">
              {{ message.content }}
            </div>
          </div>
          <div class="chat-input">
            <el-select v-model="selectedQuestion" placeholder="请选择问题" @change="sendMessage">
              <el-option v-for="question in questions" :key="question.ID" :label="question.Question" :value="question.ID"></el-option>
            </el-select>
            <button class="send-button" @click="sendMessage">发送</button>
          </div>
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
        questions: [],
        messages: [],
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios.get('http://110.42.220.245:8081/CustomerService')
          .then(response => {
            const customerService = response.data.customer_service;
            this.questions = customerService.map(item => ({
              ID: item.ID,
              Question: item.Question,
              Answer: item.Answer,
            }));
          })
          .catch(error => {
            console.error(error);
          });
      },
      sendMessage() {
        const question = this.questions.find(q => q.ID === this.selectedQuestion);
        if (question) {
          this.messages.push({ type: 'user', content: question.Question });
          this.messages.push({ type: 'service', content: question.Answer });
        }
        this.selectedQuestion = '';
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
  
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 400px;
    border: 1px solid #ccc;
    overflow-y: auto;
    padding: 10px;
  }
  
  .chat-history {
    flex: 1;
  }
  
  .message {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 10px;
  }
  
  .user-message {
    background-color: #e2f0cb;
  }
  
  .service-message {
    background-color: #d1d1d1;
  }
  
  .chat-input {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .send-button {
    margin-left: 10px;
  }
  </style>