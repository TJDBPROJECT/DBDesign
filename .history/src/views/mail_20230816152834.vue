<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <search></search>
    <div>
      <el-button type="primary" @click="getAllMessages">获取所有消息</el-button>
      <el-table :data="messages">
        <el-table-column prop="News_Title" label="标题"></el-table-column>
        <el-table-column prop="News_Date" label="日期"></el-table-column>
        <el-table-column prop="IsRead" label="是否已读"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" @click="readMessage(scope.row.ID)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model:visible="dialogVisible">
        <h3>{{ currentMessage.News_Title }}</h3>
        <p>{{ currentMessage.News_Content }}</p>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import header from '../components/header.vue';
  export default {
    data() {
      return {
        messages: [],
        dialogVisible: false,
        currentMessage: {},
      };
    },
    components: {
    "search": header,
  },
    methods: {
      getAllMessages() {
        const uid = 'your_user_id'; // 替换为实际的用户ID
        const url = `http://110.42.220.245:8081/NewsSystem/${uid}`;
  
        axios.get(url)
          .then(response => {
            this.messages = response.data.News;
          })
          .catch(error => {
            console.error(error);
          });
      },
      readMessage(id) {
        const uid = 'your_user_id'; // 替换为实际的用户ID
        const url = `http://110.42.220.245:8081/NewsSystem/${uid}/${id}`;
  
        axios.get(url)
          .then(response => {
            this.currentMessage = response.data;
            this.dialogVisible = true;
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>