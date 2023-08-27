<template>
    <div class="chat-container">
      <div class="chat-header">
        <h2>关于我们</h2>
      </div>
      <div class="chat-messages">
        <div v-for="info in aboutUs" :key="info.ID" class="chat-message">
          <div class="message-content question">{{ info.Question }}</div>
          <div class="message-content answer">{{ info.Answer }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AboutUs',
    data() {
      return {
        aboutUs: [],
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios
          .get('http://110.42.220.245:8081/AboutUs')
          .then((response) => {
            this.aboutUs = response.data.about_us;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .chat-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .chat-messages {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .chat-message {
    display: flex;
    justify-content: flex-start;
  }
  
  .message-content {
    padding: 10px;
    border-radius: 10px;
    max-width: 70%;
  }
  
  .question {
    background-color: #e2f0cb;
    align-self: flex-start;
  }
  
  .answer {
    background-color: #d1d1d1;
    align-self: flex-end;
  }
  
  h2 {
    font-size: 24px;
    font-weight: bold;
  }
  
  </style>