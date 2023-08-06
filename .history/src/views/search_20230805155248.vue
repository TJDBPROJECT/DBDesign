<template>
  <el-container>
    <!-- 搜索栏 -->
    <el-header>
      <seach></seach>
    </el-header>

    <!-- 展示搜索结果 -->
    <el-main>
      <div v-if="isLoading">正在加载...</div>
      <div v-else>
        <el-row v-if="devices.length === 0">
          <el-col :span="24">
            <div class="no-results">没有找到匹配的设备。</div>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="24" v-for="device in devices" :key="device.DeviceID">
            <el-card>
              <div class="card-content">
                <h3>{{ device.DeviceID }}</h3>
                <p>设备类别：{{ device.Device_Cate_ID.CategoryName }}</p>
                <p>设备类型：{{ device.Device_Type_ID.Type_Name }}</p>
                <p>设备评估：{{ device.eval.Evaluation }}</p>
                <p>设备价格：{{ device.eval.Price }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
  
<script>
import { searchDevices } from '../api/search';
import header from '../components/header.vue'

export default {
  name: 'SearchPage',
  data() {
    return {
      products: '',
      devices: [],
      isLoading: true
    };
  },
  components: {
    "seach": header,
  },
  created() {
    this.products = this.$route.query.input;
    // 进行接收到的值的处理
    console.log(this.products);
    console.log("get message from header")
    this.isLoading = true;
    searchDevices(this.products)
      .then(response => {
        // 处理成功的响应
        this.devices = response.data.devices.device;
        console.log(response)
        console.log(this.devices)
        console.log("successs")
        this.isLoading = true;
      })
      .catch(error => {
        // 处理错误
        console.error(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
};
</script>
  
<style scoped>
.card-content {
  padding: 20px;
}

.no-results {
  text-align: center;
  margin-top: 20px;
  color: #999;
}
</style>