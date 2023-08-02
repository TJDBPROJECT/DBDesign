<template>
  <div>
    <search />
    <div>
      <div class="container">
        <el-scrollbar class="scrollbar" :height="containerHeight">
          <div class="scrollbar-container">
            <el-card v-for="item in data" :key="item.id" class="card-item">
              <div class="card-content">
                <div class="card-left">
                  <img
                    :src="item.image"
                    class="card-image"
                    @mouseover="hoverImage(item.id, true)"
                    @mouseleave="hoverImage(item.id, false)"
                  />
                  <el-button class="card-button" type="primary">详情</el-button>
                </div>
                <div class="card-right">
                  <el-descriptions title="Customized style list" :column="1" border>
                    <el-descriptions-item label="ID" label-align="right" align="center">{{ item.id }}</el-descriptions-item>
                    <el-descriptions-item label="Name" label-align="right" align="center">{{ item.name }}</el-descriptions-item>
                    <el-descriptions-item label="Location Detail" label-align="right" align="center">{{ item.loc_detail }}</el-descriptions-item>
                    <el-descriptions-item label="Telephone" label-align="right" align="center">{{ item.tel }}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </div>
            </el-card>
          </div>
        </el-scrollbar>
        <div class="map-container">
          <BaiduMap :locations="mapLocations" />
        </div>
      </div>
    </div>
    <div class="back-button-container">
      <el-button class="back-button" type="primary" @click="CenterPageGoBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import Header from '/src/components/header.vue';
import BaiduMap from '/src/components/BaiduMap.vue';
import { getData } from '@/api/centerpicture.js'; // 导入API请求函数


export default {
  computed: {
    containerHeight() {
      return `${window.innerHeight - 100}px`;
    },
    mapLocations() {
      return this.data.map((item) => ({
        name: item.location,
        lng: this.getGeolocation(item.location).lng,
        lat: this.getGeolocation(item.location).lat,
      }));
    },
  },
  components: {
    search: Header,
    BaiduMap,
  },
  data() {
    return {
      //data: [],
      data: [], // 存储Customized style list信息的数组
    };
  },
  mounted() {
    this.getDataFromServer();
  },
  methods: {
    getDataFromServer() {
      getData().then((res) => {
        this.data = res.data; // 假设返回的数据为一个数组，直接将数据赋值给data
      }).catch((error) => {
        console.error('获取数据失败:', error);
      });
    },


    CenterPageGoBack() {
      this.$router.push({ name: 'repairpage' });
    },
    //服务中心页面的返回键 

    generateData() {
      // Generate 20 different data items and assign them to the `data` array
      const cities = [
        '北京',
        '上海',
        '广州',
        '深圳',
        '杭州',
        '成都',
        '重庆',
        '武汉',
        '南京',
        '西安',
        '天津',
        '苏州',
        '长沙',
        '郑州',
        '青岛',
        '大连',
        '宁波',
        '厦门',
        '哈尔滨',
        '济南',
      ];

      for (let i = 1; i <= 20; i++) {
        this.data.push({
          id: i,
          image: `image-${i}.jpg`,
          name: `User ${i}`,
          // rating: (Math.random() * 5).toFixed(1),
          location: cities[i - 1],
          loc_detail: cities[i - 1], //`Location Detail ${i}`,
          tel: `Telephone ${i}`,
        });
      }
    },
    getGeolocation(address) {
      // Perform geocoding here and return the latitude and longitude
      // Replace this function with the actual geocoding logic using Baidu Map API or any other geocoding service
      // The example below shows a hardcoded geolocation for demonstration purposes
      const geolocation = {
        北京: { lat: 39.9042, lng: 116.4074 },
        上海: { lat: 31.2304, lng: 121.4737 },
        广州: { lat: 23.1291, lng: 113.2644 },
        // Add geolocation coordinates for other cities
      };
      return geolocation[address] || { lat: 0, lng: 0 }; // Return (0,0) for unknown addresses
    },
    hoverImage(id, isHover) {
      const cardImage = document.getElementById(`card-image-${id}`);
      if (cardImage) {
        cardImage.style.filter = isHover ? 'brightness(70%)' : 'none';
      }
    },

  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.scrollbar {
  flex: 1;
  height: calc(100vh - 100px); /* 调整滚动框高度，保留页眉高度 */
  margin-right: 20px; /* 调整滚动框与地图的间距 */
}

.scrollbar-container {
  width: 1000px; /* 设置容器宽度为 1000px */
  height: 100%;
  overflow-y: auto;
}

.card-item {
  margin-bottom: 10px; /* 调整卡片之间的间距 */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.card-content {
  display: flex;
  align-items: center;
}

.card-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-right {
  flex: 2;
  padding-left: 20px;
}

.card-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  transition: filter 0.3s ease-in-out;
}

.card-button {
  margin-top: 12px;
}

.my-label {
  background: var(--el-color-success-light-9);
}

.my-content {
  background: var(--el-color-danger-light-9);
}

.map-container {
  width: 600px;
  height: 850px;
  border: 2px solid #ccc; /* Add a border style */
  border-radius: 5px; /* Optional: Add border radius */
  padding: 10px; /* Optional: Add padding */
}

.back-button-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.back-button {
  width: 100px;
  height: 40px;
}
</style>


<!-- <template>

    <div>
      <search/>
      <div>
        <div class="container">
          <el-scrollbar class="scrollbar" :height="containerHeight">
            <div class="scrollbar-container">
              <el-card v-for="item in data" :key="item.id" class="card-item">
                <div class="card-content">
                  <div class="card-left">
                    <img
                      :src="item.image"
                      class="card-image"
                      @mouseover="hoverImage(item.id, true)"
                      @mouseleave="hoverImage(item.id, false)"
                    />
                    <el-button class="card-button" type="primary">详情</el-button>
                  </div>
                  <div class="card-right">
                    <el-descriptions title="Customized style list" :column="1" border>
                      <el-descriptions-item label="ID" label-align="right" align="center">{{ item.id }}</el-descriptions-item>
                      <el-descriptions-item label="Name" label-align="right" align="center">{{ item.name }}</el-descriptions-item>
                      <el-descriptions-item label="Location Detail" label-align="right" align="center">{{ item.loc_detail }}</el-descriptions-item>
                      <el-descriptions-item label="Telephone" label-align="right" align="center">{{ item.tel }}</el-descriptions-item>
                    </el-descriptions>
                  </div>
                </div>
              </el-card>
            </div>
          </el-scrollbar>
          <div class="map-container">
            <BaiduMap :locations="mapLocations" />
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  import Header from '/src/components/header.vue'
  import BaiduMap from '/src/components/BaiduMap.vue';
  
  export default {
    computed: {
      containerHeight() {
        return `${window.innerHeight - 100}px`;
      },
      mapLocations() {
        return this.data.map(item => ({
          name: item.location,
          lng: this.getGeolocation(item.location).lng,
          lat: this.getGeolocation(item.location).lat
        }));
      }
    },
    components: {
      search: Header,
      BaiduMap,
    },
    data() {
      return {
        data: [],
      };
    },
    mounted() {
      this.generateData();
    },
    methods: {
      generateData() {
        // Generate 20 different data items and assign them to the `data` array
        const cities = [
          "北京",
          "上海",
          "广州",
          "深圳",
          "杭州",
          "成都",
          "重庆",
          "武汉",
          "南京",
          "西安",
          "天津",
          "苏州",
          "长沙",
          "郑州",
          "青岛",
          "大连",
          "宁波",
          "厦门",
          "哈尔滨",
          "济南",
        ];
  
        for (let i = 1; i <= 20; i++) {
          this.data.push({
            id: i,
            image: `image-${i}.jpg`,
            name: `User ${i}`,
            // rating: (Math.random() * 5).toFixed(1),
            location: cities[i - 1],
            loc_detail: cities[i - 1],//`Location Detail ${i}`,
            tel: `Telephone ${i}`
          });
        }
      },
      getGeolocation(address) {
        // Perform geocoding here and return the latitude and longitude
        // Replace this function with the actual geocoding logic using Baidu Map API or any other geocoding service
        // The example below shows a hardcoded geolocation for demonstration purposes
        const geolocation = {
          北京: { lat: 39.9042, lng: 116.4074 },
          上海: { lat: 31.2304, lng: 121.4737 },
          广州: { lat: 23.1291, lng: 113.2644 },
          // Add geolocation coordinates for other cities
        };
        return geolocation[address] || { lat: 0, lng: 0 }; // Return (0,0) for unknown addresses
      },
      hoverImage(id, isHover) {
        const cardImage = document.getElementById(`card-image-${id}`);
        if (cardImage) {
          cardImage.style.filter = isHover ? 'brightness(70%)' : 'none';
        }
      },
    },
  };
</script>
  
  <style scoped>
  .container {
    display: flex;
  }
  
  .scrollbar {
    flex: 1;
    height: calc(100vh - 100px); /* 调整滚动框高度，保留页眉高度 */
    margin-right: 20px; /* 调整滚动框与地图的间距 */
  }
  
  .scrollbar-container {
    width: 1000px; /* 设置容器宽度为 1000px */
    height: 100%;
    overflow-y: auto;
  }
  
  .card-item {
    margin-bottom: 10px; /* 调整卡片之间的间距 */
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  }
  
  .card-content {
    display: flex;
    align-items: center;
  }
  
  .card-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .card-right {
    flex: 2;
    padding-left: 20px;
  }
  
  .card-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    transition: filter 0.3s ease-in-out;
  }
  
  .card-button {
    margin-top: 12px;
  }
  
  .my-label {
    background: var(--el-color-success-light-9);
  }
  
  .my-content {
    background: var(--el-color-danger-light-9);
  }
  
  .map-container {
    width: 600px;
    height: 850px;
    border: 2px solid #ccc; /* Add a border style */
    border-radius: 5px; /* Optional: Add border radius */
    padding: 10px; /* Optional: Add padding */
  }
  </style>-->