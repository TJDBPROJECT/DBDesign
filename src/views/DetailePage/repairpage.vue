<template>
  <div class="common-layout">
    <el-container>
      <!--最顶部的标题-->
      <el-header>
        <div class="center-title" style="color:rgb(74, 112, 228) ;">
          <h1>电子产品维修信息填写界面</h1>
        </div>
      </el-header>

     
      <el-container>
    <!-- 左侧图片区域 -->
    <el-aside class="aside-center">

    
    <div class="upload-container upload-container-large">
      <el-upload
        class="upload-demo"
        drag
        action="/api/CateImage" 
        multiple
        :on-success="handleUploadSuccess"
      >
      <h1>请上传维修机器的相关照片，且内存小于500KB</h1>
        <!-- ... Your upload icon and text ... -->
      </el-upload>
    </div>
    
    <div class="carousel-container">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(image, index) in uploadedImages" :key="index">
          <img :src="image" alt="Uploaded Image" style="width: 100%;" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-aside>

        <el-main>

          <el-header style="margin-top: 20px;">
        <el-steps :active="2" align-center>
    <el-step title="Step 1" description="Some description" />
    <el-step title="Step 2" description="Some description" />
    <el-step title="Step 3" description="Some description" />
    <el-step title="Step 4" description="Some description" />
  </el-steps>
    </el-header>


          <div class="descriptions-container">
            <h2 class="descriptions-title">在下面表格中请填写你的用户信息</h2>
            <el-descriptions class="custom-descriptions" :column="1" border>
              <el-descriptions-item label="姓名" label-align="center" align="center">
                <el-input v-model="form.name"></el-input>
              </el-descriptions-item>
              <el-descriptions-item label="联系电话" label-align="center" align="center" background-color=" blue">
                <el-input v-model="form.phone"></el-input>
              </el-descriptions-item>
              <el-descriptions-item label="维修服务地点" label-align="center" align="center">
                <el-input v-model="form.location"></el-input>
              </el-descriptions-item>
              <el-descriptions-item label="设备名称" label-align="center" align="center">
                <el-input v-model="form.deviceName"></el-input>
              </el-descriptions-item>
              <el-descriptions-item
                label="设备是否还在保修时间内"
                label-align="center"
                align="center"
              >
                <el-radio-group v-model="form.isWarranty">
                  <el-radio label="是">是</el-radio>
                  <el-radio label="否">否</el-radio>
                </el-radio-group>
              </el-descriptions-item>
              <el-descriptions-item label="期待的上门服务时间" label-align="center" align="center">
                <el-date-picker v-model="form.serviceTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </el-descriptions-item>
              <el-descriptions-item
                label="设备故障信息描述（请详细说明）"
                label-align="center"
                align="center"
              >
                <el-input type="textarea" v-model="form.problemDescription"></el-input>
              </el-descriptions-item>


              <el-descriptions-item label="工程师名称" label-align="center" align="center">
                <el-popover v-if="form.engineer" trigger="hover" placement="right-start" width="200">
                  <template #reference>
                    <el-select v-model="form.engineer" placeholder="请选择工程师" @mouseover="showPopoverContent = true" @mouseleave="showPopoverContent = false">
                      <el-option v-for="engineer in engineersData" :key="engineer.ID" :label="engineer.Name" :value="engineer.ID"></el-option>
                    </el-select>
                  </template>
                  <div v-if="showPopoverContent && selectedEngineer" trigger="hover" placement="right-start" width="200">
                    
                      <h4>{{ selectedEngineer.Name }}</h4>
                      <p>性别: {{ selectedEngineer.Sex }}</p>
                      <p>评分: {{ selectedEngineer.Rate }}</p>
                      <p>工龄: {{ selectedEngineer.WorkingYears }}年</p>
                    </div>
                  <!-- </el-popover>                       -->
                </el-popover>
                <el-select v-else v-model="form.engineer" placeholder="请选择工程师">
                  <el-option v-for="engineer in engineersData" :key="engineer.ID" :label="engineer.Name" :value="engineer.ID"></el-option>
                </el-select>
              </el-descriptions-item>



            </el-descriptions>
          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>

 
    


    <!-- 添加下单按钮 -->
    <div class="order-button">

      <el-button type="text" @click="go_center" class="site-details-button">维修站点详情</el-button>
      <el-button type="primary" @click="goback" class="order-button">返回</el-button>
      <el-button type="primary" @click="submitForm" class="order-button">支付</el-button>

    </div>
</template>

<script>
import { createRepairOrder,repair_info } from '@/api/repair_info.js'
//import { getEngineer } from '@/api/repair_info.js';
import axios from 'axios';

export default {
  name: 'RepairPage',
  data() {
    return {
      form: {
        brand: '',
        model: '',
        storage: '',
        purchaseChannel: '',
        appearance: '',
        display: '',
        repair: '',
        uploadedImages: [], // Store uploaded image URLs
      },
      productId:null,
      showPopoverContent: false,
      selectedEngineer: null, // Initialize selectedEngineer
      engineersData: [], // Store the retrieved engineer data
      // engineersData: [
      //   { value: "engineerA", name: "小盛", sex: "男", rating: 4.1, experience: "5年" },
      //   { value: "engineerB", name: "老默", sex: "男", rating: 4.9, experience: "3年" },
      //   { value: "engineerC", name: "小兰", sex: "女", rating: 4.7, experience: "7年" },
      // ],
    };
  },
  mounted() {
    // 接收上一个组件的值，并将其赋给data.product.productId
      this.productId = this.$route.params.productId;
      console.log("接收的 productId:", this.$route.params.productId);
      this.fetchEngineersData(); // 在组件挂载时获取工程师数据
  },

  // created() {
  //   // 在组件创建时调用getEngineer函数，获取工程师数据
  //   this.fetchEngineersData();
  // },

  // watch: {
  //   'form.engineer': function (newVal) {
  //     // 通过工程师的值，查找对应的个人信息并赋值给selectedEngineer
  //     this.selectedEngineer = this.engineersData.find((engineer) => engineer.value === newVal);
  //     // 控制个人名片是否显示的标志
  //     this.showPopoverContent = !!this.selectedEngineer;
  //   }
  // },
  watch: {
  'form.engineer': function (newVal) {
    this.selectedEngineer = this.engineersData.find(engineer => engineer.ID === newVal);
  }
},


  methods: {
    onEngineerChange() {
      this.selectedEngineer = this.engineersData.find(engineer => engineer.ID === this.form.engineer);
      this.showPopoverContent = !!this.selectedEngineer;
    },
    async fetchEngineersData() {
    try {
      const response = await axios.get('http://110.42.220.245:8081/Engineer');
      this.engineersData = response.data.engineers; // 使用 response.data.engineers 提取工程师数组
      console.log('成功获取工程师数据:', this.engineersData);
    } catch (error) {
      console.error('获取工程师数据失败:', error);
    }
  },

    sendTimeToBackend() {
      const currentTime = new Date();
      const formattedTime = currentTime.toISOString(); // You can format the time as needed

      axios.post('/api/time', { currentTime: formattedTime }) // Replace with your API endpoint
        .then(response => {
          console.log('后端响应:', response.data);
          // 根据需要处理后端的响应数据
        })
        .catch(error => {
          console.error('请求错误:', error);
          // 根据需要处理错误
          // 输出错误信息
          console.log('后端返回的错误信息:', error.response.data);
        });
    },



    showSiteDetails() {
      // Implement the functionality for the "维修站点详情" button
      // For example, you can redirect to a new page or show a modal with site details
      // Replace the code below with your actual implementation
      console.log('Showing site details');
    },

    
    // fetchEngineersData() {
    //   // 调用getEngineer函数获取工程师数据
    //   getEngineer({}).then((response) => {
    //     this.engineersData = response.data; // 将获取到的工程师数据赋值给engineersData
    //   }).catch((error) => {
    //     console.error('Error fetching engineers data:', error);
    //   });
    // },


    handleFileUpload(event) {
      const file = event.target.files[0];
      // 将选择的照片文件存储到 data 中的 form.photo
      this.form.photo = file;
    },
   
    async submitForm() {
      try {
        // Construct the data to send to the backend
        const createdata = {
          CouponID: "cou123",
          EngineerID:"eng001",
          OptionID: "opt123",
          RepairLocation: "TBD",
          RepairTime: "2023-08-03T15:31:57",
        };

        /*const orderData = {
          username: this.form.name,
          telephone: this.form.phone,
          repairlocation: this.form.location,
          type_name: this.form.deviceName,
          repairtime: this.form.serviceTime,
          repairrequirement: this.form.problemDescription,
          photo: '', // Add the photo data here
        };*/

        // Call your API function to create the repair order
        const createResponse = await createRepairOrder(createdata);
        
        if (createResponse.data.success) {
          console.log('维修订单创建成功:', createResponse.data);

          // 获取创建的维修订单信息
          const getOrderResponse = await repair_info({ uid: this.userId }); // 根据需要传入用户ID

          console.log('获取维修订单信息:', getOrderResponse.data);
          
          // 在此处您可以进行订单创建成功后的后续操作，例如跳转到订单详情页等
          // this.$router.push({ name: 'orderDetails', params: { orderId: getOrderResponse.data.orders.OrderID } });
        } else {
          console.error('维修订单创建失败:', createResponse.data);
          // 处理订单创建失败的情况，显示错误提示等
        }
      } catch (error) {
        console.error('Error creating order:', error);
        // Handle the error as needed
      }
    },
    go_center() {
      this.$router.push({ name: 'CenterPage' });

    },
    goback() {
      this.$router.push({ name: 'DetailsPage' });

    }
  }
  
};
</script>


<style scoped>


.descriptions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.custom-descriptions {
  margin-left: -200px; /* 调整左边距的值 */
}

.descriptions-title {
  text-align: center;
  margin-bottom: 20px;
  margin-left: -200px; /* 调整左边距的值 */
}


/* .el-descriptions {
  background-color: #57387b;
  width:80%;
} 
脑残紫色原因
*/


.carousel-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.carousel-container .el-carousel {
  width: 60%;
  height: 90%;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
.aside-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px; /* 调整侧边栏的宽度 */
  height: 700px; /* 保持侧边栏高度与 el-container 一致 */
  
}

.upload-container-large {
  width: 80%; /* 调整上传组件容器的宽度 */
  margin-bottom: 20px; /* 调整文件上传栏之间的间距 */
  /* 可根据需要自定义其他样式属性 */
}
.center-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px; /* 调整上传组件容器的宽度 */
  height: 200px; /* 调整上传组件容器的高度 */
  border: 5px dashed #ccc;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 50px; /* 调整上传组件之间的间距 */
}

.upload-container-large {
  width: 200px;/* 调整上传组件的宽度 */
  height: 200px; /* 调整上传组件的高度 */
  /* 可根据需要自定义其他样式属性 */
}
.repair-page {
  padding: 200px;
}

.upload-container {
  position: relative;
  width: 300px;
  height: 500px;
  border: 3px dashed #bfeaf4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* 添加鼠标样式为手型 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
}

.upload-text {
  margin-top: 10px;
}

.order-button {
  display: flex;
  justify-content: flex-end;
  
  margin-bottom: 600px; /* 调整底部间距 */
  margin-right: 20px; /* 调整右侧间距 */
  font-size: 15px; /* 调整按钮字体大小 */
  padding: 20px 40px; /* 增加按钮内边距 */
}


.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-right: 20px;
}
.site-details-button {
  margin-left: 10px;
  font-size: 15px;
}

  </style>



