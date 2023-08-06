<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="common-layout">
      <el-container>
        <!--搜索栏部分-->
        <el-header height="100px">
          <seach />
        </el-header>
        <el-container>
          <!--边栏部分-->
          <el-aside width="200px">
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="selectBrand('小米')">
                <el-icon>
                  <setting />
                </el-icon>
                <span>小米</span>
              </el-menu-item>
              <el-menu-item index="2" @click="selectBrand('华为')">
                <el-icon>
                  <setting />
                </el-icon>
                <span>华为</span>
              </el-menu-item>
              <el-menu-item index="3" @click="selectBrand('联想')">
                <el-icon>
                  <setting />
                </el-icon>
                <span>联想</span>
              </el-menu-item>
              <el-menu-item index="4" @click="selectBrand('OPPO')">
                <el-icon>
                  <setting />
                </el-icon>
                <span>OPPO</span>
              </el-menu-item>
              <el-menu-item index="5" @click="selectBrand('苹果')">
                <el-icon>
                  <setting />
                </el-icon>
                <span>苹果</span>
              </el-menu-item>
              <el-menu-item index="6" @click="selectBrand('索尼')">
                <el-icon>
                  <setting />
                </el-icon>
                <span>索尼</span>
              </el-menu-item>
              <el-menu-item index="7" @click="selectBrand('戴尔')">
                <el-icon>
                  <setting />
                </el-icon>
                <span>戴尔</span>
              </el-menu-item>
              <el-menu-item index="8" @click="selectBrand('任天堂')">
                <el-icon>
                  <setting />
                </el-icon>
                <span>任天堂</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <!--主体部分-->
          <!--具体部分-->
          <el-main>
            <el-row class="recommend-products">
              <el-col :span="8" v-for="(product, index) in paginatedProducts" :key="index">
                <el-col :span="23">
                  <el-card shadow="hover" @click="goToDetailsPage(product.Type_Name)">
                    <div class="product-card">
                      <img :src="product.Structure_Url" alt="product image">
                      <div class="product-info">
                        <div class="product-name">{{ product.Type_Name }}</div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-col>
            </el-row>
            <el-col :span="5" :offset="9">
              <!-- 使用分页组件 -->
              <el-pagination background layout="prev, pager, next" :total="totalPages * 10" v-model="currentPage"
                @current-change="handlePageChange" />
            </el-col>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import header from '../components/header.vue';
  import { pictureget } from '@/api/picture';
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "evaluatepage",
  
    data() {
      return {
        images: [],
        activeIndex: ref('1'),
        products: [],
        currentPage: 1,
        totalPages: 0,
        selectedBrand: '',
      };
    },
    components: {
      "seach": header,
    },
    methods: {
      handlePageChange(currentPage) {
        this.currentPage = currentPage;
      },
      goToDetailsPage(productId) {
        this.$router.push({ name: 'DetailsPage', params: { productId: productId } });
      },
      selectBrand(brand) {
        this.selectedBrand = brand;
        this.currentPage = 1; // Reset current page when selecting a new brand
      },
      calculateTotalPages() {
        const itemsPerPage = 6;
        this.totalPages = Math.ceil(this.paginatedProducts.length / itemsPerPage);
      },
    },
    computed: {
      paginatedProducts() {
        return this.products.filter(product => {
          return product.Brand === this.selectedBrand;
        });
      },
    },
    mounted() {
    pictureget().then((res) => {
      if (res.data === false) {
        this.$message.error("获得失败");
      } else {
        this.$message.success("获得成功");
        console.log("获得成功");
        console.log(res.data);
        this.products = res.data.DeviceType;
        this.images = res.data.DeviceType;
        console.log("products");
        console.log(this.products);
        this.calculateTotalPages(); // 在数据加载完成后计算总页数
      }
    });
  },
  };
  </script>
  
  <style scoped>
  .wrapper {
    /*渐变的背景色*/
    /*height: 100vh;
    background-image: linear-gradient(to bottom right, #FC466B, #3F5EF8);
    overflow: hidden;*/
    /*背景图*/
    background: url("../assets/background.jpg");
    width: 100%;
    height: 100%;
  }
  
  .search {
    margin-bottom: 0px;
  }
  
  .flex-grow {
    flex-grow: 1;
  }
  
  :global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
  }
  
  .el-statistic {
    --el-statistic-content-font-size: 28px;
  }
  
  .statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
  }
  
  .statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
  }
  
  .statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
  }
  
  .green {
    color: var(--el-color-success);
  }
  
  .red {
    color: var(--el-color-error);
  }
  
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .search-bar {
    margin-bottom: 20px;
    margin-left: 100px;
  }
  
  .logo {
    width: 100%;
    max-width: 100px;
  }
  
  .search-input {
    margin-right: 20px;
    width: 100%;
    max-width: 500px;
  }
  
  .search-btn {
    margin-left: 20px;
    width: 100%;
    max-width: 100px;
  }
  
  .recommend-products {
    margin-bottom: 20px;
  }
  
  .product-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .product-card img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
  }
  
  .product-info {
    display: flex;
    flex-direction: column;
  }
  
  .product-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .product-price {
    font-size: 14px;
    color: #f00;
  }
  
  .nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #ddd;
  }
  
  .nav-bar el-col {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 16px;
    font-weight: bold;
  }
  
  .nav-bar a {
    color: #333;
    text-decoration: none;
  }
  </style>