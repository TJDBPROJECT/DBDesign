<template>
  <seach/>
  
  <!-- 步骤条显示回收进度 -->
    <el-header style="margin-top: 20px;">
        <el-steps :active="2" align-center>
            <el-step title="Step 1" description="Some description" />
            <el-step title="Step 2" description="Some description" />
            <el-step title="Step 3" description="Some description" />
            <el-step title="Step 4" description="Some description" />
        </el-steps>
    </el-header>

  <div class="product-recycle">
    <div class="centered-container">
    <div class="left-panel">
      <img :src="productImage" alt="Device Image" style="height: 400px; width: 400px;"/>

      <div class="order-button">
        
        <el-button type="primary" @click="goback" class="order-button">  返回  </el-button>
        <el-button type="primary" @click="goToPricePage" class="order-button">  下单  </el-button>
      </div>

    </div>


    <div class="right-panel">
      <!-- 输入设备基本信息，品牌、型号 -->
      <div class="product-info">
        <div class="info-title">
          <h1>{{ deviceInfo && deviceInfo.DeviceType[0].Brand }}</h1>
          <h2>{{ deviceInfo && deviceInfo.DeviceType[0].Type_Name }}</h2>
        </div>
        <p class="__services">
          <el-icon class="gray-icon"><Avatar /></el-icon><span class="gray-text">免费上门</span>
          <el-icon class="gray-icon"><Shop /></el-icon><span class="gray-text">价格合理</span>
          <el-icon class="gray-icon"><Management /></el-icon><span class="gray-text">品质服务</span>
        </p>
        <hr style="width: 370px; margin-left: 0px;"/>
      </div>

      

      <div class="product-form">
        <div class="storage-group" style="margin-top: 0px;">
          <h3 class="group-title">{{ title }}</h3>
          <div class="btn-group">
            <el-button
              v-for="(option, index) in options"
              :key="index"
              :type="selectedOption === option.value ? 'primary' : 'default'"
              @click="selectOption(option.value)"
            >{{ option.label }}</el-button>
          </div>
        </div>
        <el-form ref="productForm" :model="form" label-width="120px">
          <el-form-item label="存储容量">
            <DropdownList :options="['64G', '128G', '256G']" v-model="form.storage_capacity"></DropdownList>
          </el-form-item>

          <el-form-item label="购买渠道">
            <DropdownList :options="['自营门店', '官方门店', '网络门店']" v-model="form.purchase_channel"></DropdownList>
          </el-form-item>

          <el-form-item label="设备品牌" label-align="left" align="center">
              <el-select v-model="form.deviceName">
                <el-option label="iphone" value="iphone" />
                <el-option label="华为" value="华为" />
                <el-option label="小米" value="小米" />
                <el-option label="三星" value="三星" />
                <el-option label="oppo" value="oppo" />
                <el-option label="vivo" value="vivo" />
                <el-option label="联想" value="联想" />
                <el-option label="索尼" value="索尼" />
                <el-option label="戴尔" value="戴尔" />
                <el-option label="任天堂" value="任天堂" />
                <!-- 添加其他地点选项 -->
              </el-select>
            </el-form-item>
          

            <el-form-item label="设备型号">
              <el-input  class="input" v-model="form.device_type"></el-input>
            </el-form-item>



          <el-form-item label="回收时间" label-align="center" align="center">
            <el-date-picker v-model="form.recycle_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>

          <el-form-item label="回收地点" label-align="center" align="center">
            <el-select v-model="form.recycle_location">
              <el-option label="北京" value="北京" />
              <el-option label="上海" value="上海" />
              <el-option label="广东" value="广东" />
              <!-- 添加其他地点选项 -->
            </el-select>
          </el-form-item>
          
            
          

        </el-form>
      </div>
    </div>
  </div>
  </div>
</template>
  
  <script>
  // import RepairHistory from '@/components/RepairHistory.vue'
  import DropdownList from '@/components/DropdownList.vue';
  import header from '/src/components/header.vue'
  import axios from 'axios';
  
  export default {

    name:'RecoveryPage',

    props: {
      title: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        productImage: require('/public/p.jpg'),
        productName: '设备名称',
        productId: '设备型号',
        form: {
          device_cate: '',
          device_type: '',
          deviceName: '',
          expectedprice: '',
          recycle_location: '',
          recycle_time: '',
          storage_capacity:'',
          purchase_channel:'',
        },
        deviceInfo: null,
        imageList:[]
      };
    },
    components: {
      "seach": header,
      // RepairHistory,
      DropdownList,
    },
    mounted() {
    // 接收上一个组件的值，并将其赋给data.product.productId
      this.productId = this.$route.params.productId;
      console.log("接收的 productId:", this.$route.params.productId);
    },
    created() {
      this.getTypename();
      this.fetchDeviceInfo();
    },
    methods: {
      calculatePrice() {
        let basePrice = 100; // 设置基础价格
        // 根据手机型号信息调整价格
        if (this.form.deviceName === 'iphone') {
          basePrice += 80;
        } else if (this.form.deviceName === '华为') {
          basePrice += 80;
        } else if (this.form.deviceName === '小米') {
          basePrice += 50;
        } else if (this.form.deviceName === '三星') {
          basePrice += 50;
        } else if (this.form.deviceName === 'oppo') {
          basePrice += 50;
        } else if (this.form.deviceName === 'vivo') {
          basePrice += 50;
        } else if (this.form.deviceName === '联想') {
          basePrice += 100;
        } else if (this.form.deviceName === '索尼') {
          basePrice += 100;
        } else if (this.form.deviceName === '戴尔') {
          basePrice += 100;
        } else if (this.form.deviceName === '任天堂') {
          basePrice += 150;
        } 
        if (this.form.problem === '设备磨损') {
          basePrice += 100;
        } else if (this.form.problem === '设备屏幕损毁（出现裂缝，黑屏等）') {
          basePrice += 500;
        } else if (this.form.problem === '设备系统出现损坏') {
          basePrice += 200;
        } else if (this.form.problem === '设备镜头损坏') {
          basePrice += 300;
        } else if (this.form.problem === '设备音响出现问题（没有声音，声音刺耳等问题）') {
          basePrice += 200;
        } else if (this.form.problem === '设备无法开机问题') {
          basePrice += 50;
        } else if (this.form.problem === '设备出现卡顿，死机问题') {
          basePrice += 60;
        } 

        return basePrice;
      },
      selectOption(option) {
        this.selectedOption = option;
        this.$emit('option-selected', option);
      },
      goback() {
        this.$router.push({ name: 'DetailsPage' });
      },
      getTypename(){
        this.productId = this.$route.params.productId;
      },
      fetchDeviceInfo() {
      axios.get(`http://110.42.220.245:8081/DeviceType/${this.productId}`)
        .then(response => {
          console.log("到了1")
          this.deviceInfo = response.data;
          console.log(this.deviceInfo)
          // 将图片也更新
          this.imageList = this.deviceInfo.DeviceType[0].Structure_Url.map((url, index) => ({
          id: index + 1,
          url: url
        }));
        this.product.srcList = this.deviceInfo.DeviceType[0].Structure_Url;
      })
        .catch(error => {
          console.error('请求错误:', error);
        });
      },
      async goToPricePage() {
        try {
          // 构造要传递给PricePage的数据
          this.form.expectedprice = this.calculatePrice();
          console.log('计算得到的价格:',  this.form.expectedprice);
          const dataToPass = {
            form: this.form,
            uploadedImages: this.uploadedImages,            
            productId:this.productId,
          };
          console.log("传递的数据", dataToPass);
          // 使用query参数传递数据，而不是params
          this.$router.push({
            name: 'recycleprice',
            query: {
              data: JSON.stringify(dataToPass),
            },
          
          });
          
        } catch (error) {
          console.error('Error navigating to PricePage:', error);
        }
      },
    },
    handleOptionSelected(option) {
        console.log('选中的存储容量:', option);
        // 在这里处理选中的存储容量
        this.form.storage_capacity = option;
    },
      
   
   
  };
  </script>
  
  <style>
  /* 样式按字母顺序重新排列 */
  
  .__services {
    display: flex;
    margin-bottom: 20px;
  }
  
  .btn-group {
    margin-top: 10px;
  }
  
  .centered-container {
    display: flex;
    align-items: center; /* 垂直居中容器内的内容 */
  }
  
  .centered-steps {
    width: 50%;
  }
  
  .container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  
  .gray-icon {
    color: #888;
    font-size: 18px;
    margin-right: 5px;
  }
  
  .gray-text {
    color: #888;
    font-size: 12px;
    margin-right: 20px;
    margin-bottom: 0px;
  }
  
  .group-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .h1 {
    font-size: 24px;
    font-weight: bold;
  }
  
  .h2 {
    font-size: 18px;
  }
  
  .input {
    width: 300px;
  }
  
  .left-panel {
    flex: 1;
    margin-top: 100px;
    margin-right: 20px;
  }

  .options-container {
  display: flex;
  align-items: center;
  }
  
  .order-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px; /* 调整底部间距 */
    margin-right: 20px; /* 调整右侧间距 */
    font-size: 15px; /* 调整按钮字体大小 */
    padding: 20px 40px; /* 增加按钮内边距 */
  }
  
  .product-form {
    position: relative;
    margin-top: 0px;
    margin-left: 20px;
  }
  
  .product-info {
    padding: 20px;
    margin-left: 50px;
    margin-bottom: 0%;
  }
  
  .product-recycle {
    display: flex;
    justify-content: center; /* 水平居中整个 product-recycle 区域 */
    align-items: flex-start; /* 顶部对齐项目 */
  }
  
  .right-panel {
    text-align: left; /* 设置整个 right-panel 的文本内容为左对齐 */
    margin-left: 20px;
  }
  
  .right-panel h1,
  .right-panel h2,
  .right-panel p {
    text-align: left; /* 设置 h1、h2、p 元素的文本内容为左对齐 */
  }
  
  .storage-group {
    margin-bottom: 20px;
  }
  
  </style>
  
  