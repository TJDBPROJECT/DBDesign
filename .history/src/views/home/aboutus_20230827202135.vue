<template>
    <div class="chat-container">
      <div class="chat-header">
        <h2>关于我们</h2>
      </div>
      <div class="chat-messages">
        <div v-for="(info, index) in aboutUs" :key="info.ID" class="chat-message">
          <div class="message-content" :class="{ question: isQuestion(index) }">
            {{ info.Content }}
            <template v-if="isQuestion(index)">
              <div class="options">
                <button v-for="(option, optionIndex) in info.Options" :key="optionIndex" @click="selectOption(index, option)">
                  {{ option }}
                </button>
              </div>
            </template>
          </div>
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
        selectedOptions: [],
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
      isQuestion(index) {
        return this.selectedOptions[index] === undefined;
      },
      selectOption(questionIndex, option) {
        this.selectedOptions[questionIndex] = option;
        this.sendMessage(option);
      },
      sendMessage(message) {
        console.log(message)
        // 在这里可以处理用户选择的问题并发送给后端进行处理
        // 例如，可以使用axios.post发送消息给后端API，然后根据后端返回的答案更新对话框
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
  
  .options {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  button {
    padding: 5px 10px;
    background-color: #e2f0cb;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>