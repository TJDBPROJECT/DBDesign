<template>
    <div class="chat-container">
      <div class="chat-header">
        <h2>关于我们</h2>
      </div>
      <div class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" class="chat-message">
          <div class="message-content" :class="{ question: isQuestion(message), answer: !isQuestion(message) }">
            {{ message.Content }}
            <template v-if="isQuestion(message)">
              <div class="options">
                <button v-for="(option, optionIndex) in message.AnswerOptions" :key="optionIndex" @click="selectOption(option)">
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
        messages: [],
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios
          .get('http://110.42.220.245:8081/about-us')
          .then((response) => {
            this.messages = response.data.map((message) => {
              return {
                ...message,
                selectedOption: null,
              };
            });
          })
          .catch((error) => {
            console.error(error);
          });
      },
      isQuestion(message) {
        return message.selectedOption === null;
      },
      selectOption(option) {
        const currentMessage = this.messages.find((message) => this.isQuestion(message));
        if (currentMessage) {
          currentMessage.selectedOption = option;
          this.sendMessage(currentMessage);
        }
      },
      sendMessage(message) {
        // 发送消息给后端API进行处理
        axios
          .post('http://110.42.220.245:8081/process-answer', {
            question: message.Content,
            answer: message.selectedOption,
          })
          .then((response) => {
            const answerMessage = {
              Content: response.data.answer,
              AnswerOptions: [],
            };
            this.messages.push(answerMessage);
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