<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="change">
        <div class="about-us">
    <h2>关于我们</h2>
    <div class="about-us-content">
      <div v-for="info in aboutUs" :key="info.ID" class="about-info">
        <h3>{{ info.Question }}</h3>
        <p>{{ info.Answer }}</p>
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

  
  <style>
  .change {
    border: 1px solid #ccc;
    width: 1200px;
    /* 设置边框的宽度为 300 像素 */
    margin-top: 0%;
    font-size: 30px;
    color: black;
    position: absolute;
    top: 150px;
    left: 205px;
    padding: 40px;
  }
  </style>