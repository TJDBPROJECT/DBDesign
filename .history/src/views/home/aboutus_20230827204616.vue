<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="about-us">
      <div class="question-list">
        <div
          v-for="item in aboutUs"
          :key="item.ID"
          class="question"
          @click="selectQuestion(item)"
        >
          {{ item.Question }}
        </div>
      </div>
      <div class="answer">
        <el-card v-if="selectedQuestion" class="card">
          <div class="answer-content">{{ selectedQuestion.Answer }}</div>
        </el-card>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        aboutUs: [],
        selectedQuestion: null,
      };
    },
    mounted() {
      this.fetchAboutUsData();
    },
    methods: {
      fetchAboutUsData() {
        // 发起HTTP请求，从指定URL获取数据
        // 这里使用axios库作为示例，你也可以使用其他HTTP库
        axios.get("http://110.42.220.245:8081/AboutUs")
          .then((response) => {
            this.aboutUs = response.data.about_us;
          })
          .catch((error) => {
            console.error("Failed to fetch About Us data", error);
          });
      },
      selectQuestion(question) {
        this.selectedQuestion = question;
      },
    },
  };
  </script>
  
  <style>
  .about-us {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .question-list {
    width: 30%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .question {
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .answer {
    flex: 1;
    padding: 10px;
  }
  
  .card {
    width: 100%;
  }
  
  .answer-content {
    padding: 20px;
  }
  </style>