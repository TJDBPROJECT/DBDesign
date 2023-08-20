


<template>
    <div>
      <search />     
      <div class="empty-space"></div>
      <h1 v-if="cardData.Name">{{ cardData.Name }} Details</h1>
      <p style="font-size: 24px;" v-if="cardData.Name">营业至22:00</p>
      <div class="image-container">
        <img :src="cardData.TIMG_URL" class="responsive-img" :class="{ 'fade-in': showImage }" />
      </div>
  
      <div class="example-card">
        <div class="content-container">
          <div class="left-column">
            <h3 v-if="cardData.Loc_Detail">地址</h3>
            <p>Location Detail: {{ cardData.Loc_Detail }}</p>

            <!-- 空行 -->
            <div class="empty-space"></div>
            
            
            <h3>联系电话</h3>
            <p v-if="cardData.Tel">
                <span style="color: black;">Telephone:</span>
                <a href="tel:{{ cardData.Tel }}" style="color: blue; text-decoration: underline;">{{ cardData.Tel }}</a>

            </p>
          </div>
          <div class="right-column">
            <h3>营 业 时 间</h3>
            <table>
              <!-- <thead>
                <tr>
                  <th>星期</th>
                  <th>日期</th>
                  <th>时间</th>
                </tr>
              </thead> -->
              <tbody>
                <tr v-for="(day, index) in next7Days" :key="index">
                  <td>{{ day.week }}</td>
                  <td class="date-cell">{{ day.date }}</td>
                  <td class="date-celll">10:00 - 22:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="empty-space"></div>
      <router-link to="../CenterPage">返回服务中心列表</router-link>
      <div class="empty-space"></div>
      <div class="empty-space"></div>
    </div>
  </template>
  
  <script>
  import { getAllServiceCenters } from '@/api/centerpicture';
  import Header from '/src/components/header.vue';
  
  export default {
    name: 'ExamplePage',
    components: {
      search: Header,
    },
    data() {
      return {
        cardData: {},
        showImage: false,
      };
    },
    computed: {
      next7Days() {
        const daysOfWeek = ['今天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const currentDate = new Date();
        const next7Days = [];
  
        for (let i = 0; i < 7; i++) {
          const date = new Date(currentDate);
          date.setDate(currentDate.getDate() + i);
  
          next7Days.push({
            week: daysOfWeek[date.getDay()],
            date: `${date.getMonth() + 1} 月 ${date.getDate()} 日`,
          });
        }
  
        return next7Days;
      },
    },
    async mounted() {
      await this.fetchCardData();
      this.showImage = true;
    },
    methods: {
      async fetchCardData() {
        try {
          const response = await getAllServiceCenters();
          const centerId = this.$route.params.centerId;
  
          this.cardData =
            response.data.ServiceCenter.find((center) => center.ID === centerId) || {};
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .example-card {
    border: 2px solid #ccc;
    padding: 10px;
    margin-top: 20px;
  }
  
  .content-container {
    display: flex;
  }
  
  .left-column {
    width: 30%;
    padding-left: 400px;
  }
  
  .right-column {
    width: 20%;
  }
  
  .image-container {
    max-width: 100%;
    height: 1050px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .responsive-img {
    width: 100%;
    height: auto;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }
  
  .fade-in {
    opacity: 1;
  }
  .date-cell {
    padding-left: 30px; /* 调整左侧内边距 */
  }
  .date-celll {
    padding-left: 50px; /* 调整左侧内边距 */
  }
  .empty-space {
  height: 20px; /* 设置空行的高度，可以根据需要调整 */
}
  </style>
  